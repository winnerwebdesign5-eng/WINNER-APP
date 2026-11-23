import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
  type Unsubscribe,
} from 'firebase/firestore';
import { ADMIN_EMAIL, db, handleFirestoreError, OperationType } from '../lib/firebase';
import {
  PROJECT_LIMITS,
  type AdminPortfolioProject,
  type PortfolioProjectInput,
} from '../types/portfolioProject';

const PROJECTS_COLLECTION = 'projects';

function extractMillis(value: unknown): number {
  if (value instanceof Timestamp) return value.toMillis();
  if (
    value &&
    typeof value === 'object' &&
    'toMillis' in value &&
    typeof (value as { toMillis?: unknown }).toMillis === 'function'
  ) {
    return (value as { toMillis: () => number }).toMillis();
  }
  return Date.now();
}

function mapDocToProject(
  id: string,
  data: Record<string, unknown>
): AdminPortfolioProject {
  return {
    id,
    projectName: typeof data.projectName === 'string' ? data.projectName : '',
    title: typeof data.title === 'string' ? data.title : '',
    category: typeof data.category === 'string' ? data.category : '',
    liveUrl: typeof data.liveUrl === 'string' ? data.liveUrl : '',
    description: typeof data.description === 'string' ? data.description : '',
    challenge: typeof data.challenge === 'string' ? data.challenge : '',
    approach: typeof data.approach === 'string' ? data.approach : '',
    thumbnailUrl: typeof data.thumbnailUrl === 'string' ? data.thumbnailUrl : '',
    published: Boolean(data.published),
    ownerId: typeof data.ownerId === 'string' ? data.ownerId : '',
    createdAtMs: extractMillis(data.createdAt),
    updatedAtMs: extractMillis(data.updatedAt),
  };
}

export function normalizeUrlInput(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function validateProjectInput(
  input: PortfolioProjectInput
): Partial<Record<keyof PortfolioProjectInput, string>> {
  const errors: Partial<Record<keyof PortfolioProjectInput, string>> = {};
  const projectName = input.projectName.trim();
  const title = input.title.trim();
  const category = input.category.trim();
  const liveUrl = normalizeUrlInput(input.liveUrl);
  const description = input.description.trim();
  const challenge = input.challenge.trim();
  const approach = input.approach.trim();
  const thumbnailUrl = input.thumbnailUrl.trim();

  if (
    projectName.length < PROJECT_LIMITS.projectNameMin ||
    projectName.length > PROJECT_LIMITS.projectNameMax
  ) {
    errors.projectName = `Project name must be between ${PROJECT_LIMITS.projectNameMin} and ${PROJECT_LIMITS.projectNameMax} characters.`;
  }

  if (title.length < PROJECT_LIMITS.titleMin || title.length > PROJECT_LIMITS.titleMax) {
    errors.title = `Project title must be between ${PROJECT_LIMITS.titleMin} and ${PROJECT_LIMITS.titleMax} characters.`;
  }

  if (
    category.length < PROJECT_LIMITS.categoryMin ||
    category.length > PROJECT_LIMITS.categoryMax
  ) {
    errors.category = `Category must be between ${PROJECT_LIMITS.categoryMin} and ${PROJECT_LIMITS.categoryMax} characters.`;
  }

  if (
    liveUrl.length < PROJECT_LIMITS.liveUrlMin ||
    liveUrl.length > PROJECT_LIMITS.liveUrlMax ||
    !PROJECT_LIMITS.liveUrlPattern.test(liveUrl)
  ) {
    errors.liveUrl = 'Please enter a valid live website link starting with https:// or http://.';
  } else {
    try {
      new URL(liveUrl);
    } catch {
      errors.liveUrl = 'Please enter a valid website URL.';
    }
  }

  if (
    description.length < PROJECT_LIMITS.descriptionMin ||
    description.length > PROJECT_LIMITS.descriptionMax
  ) {
    errors.description = `Description must be between ${PROJECT_LIMITS.descriptionMin} and ${PROJECT_LIMITS.descriptionMax} characters.`;
  }

  if (
    challenge.length < PROJECT_LIMITS.challengeMin ||
    challenge.length > PROJECT_LIMITS.challengeMax
  ) {
    errors.challenge = `Challenge faced must be between ${PROJECT_LIMITS.challengeMin} and ${PROJECT_LIMITS.challengeMax} characters.`;
  }

  if (
    approach.length < PROJECT_LIMITS.approachMin ||
    approach.length > PROJECT_LIMITS.approachMax
  ) {
    errors.approach = `My approach must be between ${PROJECT_LIMITS.approachMin} and ${PROJECT_LIMITS.approachMax} characters.`;
  }

  const isValidThumbnail =
    thumbnailUrl.length >= PROJECT_LIMITS.thumbnailMin &&
    thumbnailUrl.length <= PROJECT_LIMITS.thumbnailMax &&
    (/^https?:\/\/.+/.test(thumbnailUrl) ||
      /^\/.+/.test(thumbnailUrl) ||
      /^data:image\/(png|jpeg|webp);base64,.+/.test(thumbnailUrl));

  if (!isValidThumbnail) {
    errors.thumbnailUrl =
      'Please upload a project thumbnail image or provide a valid image URL (max ~200KB compressed).';
  }

  return errors;
}

export async function compressThumbnailFile(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error('Please choose a valid PNG, JPG, or WebP image file.');
  }

  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') resolve(reader.result);
      else reject(new Error('Could not read the selected image file.'));
    };
    reader.onerror = () => reject(new Error('Could not read the selected image file.'));
    reader.readAsDataURL(file);
  });

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Selected file could not be decoded as an image.'));
    image.src = dataUrl;
  });

  const maxWidth = 1200;
  const maxHeight = 750;
  const ratio = Math.min(1, maxWidth / img.width, maxHeight / img.height);
  const targetWidth = Math.max(1, Math.round(img.width * ratio));
  const targetHeight = Math.max(1, Math.round(img.height * ratio));

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Image compression canvas is unavailable in this browser.');
  }

  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

  const formats: Array<'image/webp' | 'image/jpeg'> = ['image/webp', 'image/jpeg'];
  const qualities = [0.82, 0.72, 0.6, 0.48, 0.36];

  for (const format of formats) {
    for (const quality of qualities) {
      const candidate = canvas.toDataURL(format, quality);
      if (
        /^data:image\/(png|jpeg|webp);base64,/.test(candidate) &&
        candidate.length <= 210000
      ) {
        return candidate;
      }
    }
  }

  throw new Error(
    'Image is still too large after compression. Please choose a smaller screenshot or paste an image URL.'
  );
}

export async function checkAdminRoleDocument(uid: string): Promise<boolean> {
  const path = `admins/${uid}`;
  try {
    const snapshot = await getDoc(doc(db, 'admins', uid));
    return snapshot.exists() && snapshot.data()?.role === 'admin';
  } catch (error) {
    // Expected permission-denied for non-admins when reading admins/{uid}; return false cleanly
    if (error instanceof Error && error.message.toLowerCase().includes('permission')) {
      return false;
    }
    handleFirestoreError(error, OperationType.GET, path);
  }
}

export function subscribeToPublishedProjects(
  onData: (projects: AdminPortfolioProject[]) => void,
  onError?: (err: Error) => void
): Unsubscribe {
  const q = query(
    collection(db, PROJECTS_COLLECTION),
    where('published', '==', true)
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const items = snapshot.docs
        .map((docSnap) => mapDocToProject(docSnap.id, docSnap.data()))
        .sort((a, b) => b.createdAtMs - a.createdAtMs);
      onData(items);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, PROJECTS_COLLECTION);
      } catch (wrapped) {
        onError?.(wrapped instanceof Error ? wrapped : new Error(String(wrapped)));
      }
    }
  );
}

export function subscribeToAdminProjects(
  uid: string,
  email: string | null | undefined,
  onData: (projects: AdminPortfolioProject[]) => void,
  onError?: (err: Error) => void
): Unsubscribe {
  const isBootstrappedOwner = email === ADMIN_EMAIL;
  const q = isBootstrappedOwner
    ? query(collection(db, PROJECTS_COLLECTION))
    : query(collection(db, PROJECTS_COLLECTION), where('ownerId', '==', uid));

  return onSnapshot(
    q,
    (snapshot) => {
      const items = snapshot.docs
        .map((docSnap) => mapDocToProject(docSnap.id, docSnap.data()))
        .sort((a, b) => b.updatedAtMs - a.updatedAtMs);
      onData(items);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, PROJECTS_COLLECTION);
      } catch (wrapped) {
        onError?.(wrapped instanceof Error ? wrapped : new Error(String(wrapped)));
      }
    }
  );
}

function generateProjectId(projectName: string): string {
  const slug = projectName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);
  const suffix = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  return slug ? `${slug}-${suffix}` : `proj-${suffix}`;
}

export async function createPortfolioProject(
  rawInput: PortfolioProjectInput,
  ownerId: string
): Promise<string> {
  const sanitized: PortfolioProjectInput = {
    projectName: rawInput.projectName.trim().slice(0, PROJECT_LIMITS.projectNameMax),
    title: rawInput.title.trim().slice(0, PROJECT_LIMITS.titleMax),
    category: rawInput.category.trim().slice(0, PROJECT_LIMITS.categoryMax),
    liveUrl: normalizeUrlInput(rawInput.liveUrl).slice(0, PROJECT_LIMITS.liveUrlMax),
    description: rawInput.description.trim().slice(0, PROJECT_LIMITS.descriptionMax),
    challenge: rawInput.challenge.trim().slice(0, PROJECT_LIMITS.challengeMax),
    approach: rawInput.approach.trim().slice(0, PROJECT_LIMITS.approachMax),
    thumbnailUrl: rawInput.thumbnailUrl.trim(),
    published: Boolean(rawInput.published),
  };

  const errors = validateProjectInput(sanitized);
  const firstError = Object.values(errors)[0];
  if (firstError) {
    throw new Error(firstError);
  }

  const projectId = generateProjectId(sanitized.projectName);
  const path = `${PROJECTS_COLLECTION}/${projectId}`;

  try {
    await setDoc(doc(db, PROJECTS_COLLECTION, projectId), {
      ...sanitized,
      ownerId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return projectId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function updatePortfolioProject(
  projectId: string,
  rawInput: PortfolioProjectInput
): Promise<void> {
  const sanitized: PortfolioProjectInput = {
    projectName: rawInput.projectName.trim().slice(0, PROJECT_LIMITS.projectNameMax),
    title: rawInput.title.trim().slice(0, PROJECT_LIMITS.titleMax),
    category: rawInput.category.trim().slice(0, PROJECT_LIMITS.categoryMax),
    liveUrl: normalizeUrlInput(rawInput.liveUrl).slice(0, PROJECT_LIMITS.liveUrlMax),
    description: rawInput.description.trim().slice(0, PROJECT_LIMITS.descriptionMax),
    challenge: rawInput.challenge.trim().slice(0, PROJECT_LIMITS.challengeMax),
    approach: rawInput.approach.trim().slice(0, PROJECT_LIMITS.approachMax),
    thumbnailUrl: rawInput.thumbnailUrl.trim(),
    published: Boolean(rawInput.published),
  };

  const errors = validateProjectInput(sanitized);
  const firstError = Object.values(errors)[0];
  if (firstError) {
    throw new Error(firstError);
  }

  const path = `${PROJECTS_COLLECTION}/${projectId}`;

  try {
    await updateDoc(doc(db, PROJECTS_COLLECTION, projectId), {
      ...sanitized,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deletePortfolioProject(projectId: string): Promise<void> {
  const path = `${PROJECTS_COLLECTION}/${projectId}`;
  try {
    await deleteDoc(doc(db, PROJECTS_COLLECTION, projectId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}
