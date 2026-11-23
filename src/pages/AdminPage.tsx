import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, type User } from 'firebase/auth';
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Edit3,
  ExternalLink,
  Eye,
  EyeOff,
  FolderPlus,
  ImagePlus,
  Loader2,
  Lock,
  LogOut,
  ShieldAlert,
  Trash2,
} from 'lucide-react';
import { ADMIN_EMAIL, auth, googleProvider } from '../lib/firebase';
import {
  checkAdminRoleDocument,
  compressThumbnailFile,
  createPortfolioProject,
  deletePortfolioProject,
  normalizeUrlInput,
  subscribeToAdminProjects,
  updatePortfolioProject,
  validateProjectInput,
} from '../services/portfolioProjectsService';
import {
  PROJECT_CATEGORY_PRESETS,
  type AdminPortfolioProject,
  type PortfolioProjectInput,
} from '../types/portfolioProject';

interface AdminPageProps {
  onNavigatePortfolio: () => void;
}

const INITIAL_FORM: PortfolioProjectInput = {
  projectName: '',
  title: '',
  category: PROJECT_CATEGORY_PRESETS[0],
  liveUrl: '',
  description: '',
  challenge: '',
  approach: '',
  thumbnailUrl: '',
  published: true,
};

function extractDomain(url: string): string {
  try {
    return new URL(normalizeUrlInput(url)).hostname;
  } catch {
    return url || 'project-preview.com';
  }
}

export function AdminPage({ onNavigatePortfolio }: AdminPageProps) {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [projects, setProjects] = useState<AdminPortfolioProject[]>([]);
  const [projectsError, setProjectsError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<PortfolioProjectInput>(INITIAL_FORM);
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof PortfolioProjectInput, string>>
  >({});
  const [thumbnailBusy, setThumbnailBusy] = useState(false);
  const [thumbnailError, setThumbnailError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);
  const [saveErrorMessage, setSaveErrorMessage] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      setAuthError(null);

      if (!nextUser) {
        setIsAdmin(false);
        setAuthReady(true);
        return;
      }

      const isBootstrapped =
        nextUser.emailVerified &&
        nextUser.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

      if (isBootstrapped) {
        setIsAdmin(true);
        setAuthReady(true);
        return;
      }

      const hasAdminRole = nextUser.emailVerified
        ? await checkAdminRoleDocument(nextUser.uid)
        : false;
      setIsAdmin(hasAdminRole);
      setAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!authReady || !user || !isAdmin) {
      setProjects([]);
      return;
    }

    const unsubscribe = subscribeToAdminProjects(
      user.uid,
      user.email,
      (items) => {
        setProjects(items);
        setProjectsError(null);
      },
      (err) => {
        setProjectsError(err.message);
      }
    );

    return () => unsubscribe();
  }, [authReady, user, isAdmin]);

  const handleGoogleSignIn = async () => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : 'Unable to sign in with Google.';
      setAuthError(msg);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setEditingId(null);
    setForm(INITIAL_FORM);
    setSaveSuccessMessage(null);
    setSaveErrorMessage(null);
  };

  const handleThumbnailFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setThumbnailBusy(true);
    setThumbnailError(null);
    try {
      const compressedDataUrl = await compressThumbnailFile(file);
      setForm((prev) => ({ ...prev, thumbnailUrl: compressedDataUrl }));
      setFormErrors((prev) => ({ ...prev, thumbnailUrl: undefined }));
    } catch (error) {
      setThumbnailError(
        error instanceof Error ? error.message : 'Could not process thumbnail image.'
      );
    } finally {
      setThumbnailBusy(false);
      event.target.value = '';
    }
  };

  const handleEditProject = (project: AdminPortfolioProject) => {
    setEditingId(project.id);
    setForm({
      projectName: project.projectName,
      title: project.title,
      category: project.category,
      liveUrl: project.liveUrl,
      description: project.description,
      challenge: project.challenge,
      approach: project.approach,
      thumbnailUrl: project.thumbnailUrl,
      published: project.published,
    });
    setFormErrors({});
    setSaveSuccessMessage(null);
    setSaveErrorMessage(null);
    setThumbnailError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(INITIAL_FORM);
    setFormErrors({});
    setSaveSuccessMessage(null);
    setSaveErrorMessage(null);
    setThumbnailError(null);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!user || !isAdmin || saving) return;

    const normalized: PortfolioProjectInput = {
      ...form,
      liveUrl: normalizeUrlInput(form.liveUrl),
    };

    const validationErrors = validateProjectInput(normalized);
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      setSaveErrorMessage('Please fix the highlighted fields before saving.');
      setSaveSuccessMessage(null);
      return;
    }

    setFormErrors({});
    setSaveErrorMessage(null);
    setSaveSuccessMessage(null);
    setSaving(true);

    try {
      if (editingId) {
        await updatePortfolioProject(editingId, normalized);
        setSaveSuccessMessage(
          `"${normalized.projectName}" has been updated and synced to your Portfolio.`
        );
        setEditingId(null);
      } else {
        await createPortfolioProject(normalized, user.uid);
        setSaveSuccessMessage(
          `"${normalized.projectName}" has been published and added to your Portfolio.`
        );
      }
      setForm(INITIAL_FORM);
    } catch (error) {
      setSaveErrorMessage(
        error instanceof Error
          ? error.message
          : 'Could not save the project right now. Please try again.'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublished = async (project: AdminPortfolioProject) => {
    try {
      await updatePortfolioProject(project.id, {
        projectName: project.projectName,
        title: project.title,
        category: project.category,
        liveUrl: project.liveUrl,
        description: project.description,
        challenge: project.challenge,
        approach: project.approach,
        thumbnailUrl: project.thumbnailUrl,
        published: !project.published,
      });
    } catch (error) {
      setProjectsError(
        error instanceof Error ? error.message : 'Unable to update visibility.'
      );
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    setDeletingId(projectId);
    try {
      await deletePortfolioProject(projectId);
      if (editingId === projectId) {
        handleCancelEdit();
      }
      setConfirmDeleteId(null);
    } catch (error) {
      setProjectsError(
        error instanceof Error ? error.message : 'Unable to delete project.'
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (!authReady) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#0A0A0A] px-6 py-24">
        <div className="flex flex-col items-center gap-3 text-center">
          <Loader2 className="h-6 w-6 animate-spin text-white/80" strokeWidth={1.75} />
          <p className="text-xs font-medium tracking-[0.18em] text-[#A3A3A3] uppercase">
            Verifying Admin Session
          </p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="bg-[#0A0A0A] px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-lg rounded-sm border border-white/[0.1] bg-[#151515] p-8 sm:p-10">
          <span
            aria-hidden="true"
            className="mb-8 block h-[2px] w-full"
            style={{
              backgroundImage: 'linear-gradient(90deg, #FF2E93, #8B3DFF, #2F6BFF)',
            }}
          />
          <p className="text-xs font-semibold tracking-[0.2em] text-[#A3A3A3] uppercase">
            Winner Designs · Owner Access
          </p>
          <h1 className="font-display mt-3 text-3xl font-semibold tracking-[-0.025em] text-white">
            Portfolio Admin Dashboard
          </h1>
          <p className="mt-4 text-sm leading-[1.7] text-[#A3A3A3] sm:text-base">
            Sign in with your authorized Google account ({ADMIN_EMAIL}) to upload new projects, manage thumbnails, edit case studies, and publish directly to your Portfolio page.
          </p>

          {authError && (
            <div
              role="alert"
              className="mt-6 flex items-start gap-3 rounded-sm border border-[#FF4B4B]/40 bg-[#FF4B4B]/10 p-4 text-xs text-white/90"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#FF4B4B]" />
              <span>{authError}</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={authLoading}
            className="mt-8 inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-sm bg-white px-6 py-3 text-xs font-semibold tracking-[0.08em] text-[#0A0A0A] uppercase transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {authLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" strokeWidth={1.75} />
                <span>Sign In with Google</span>
              </>
            )}
          </button>
        </div>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="bg-[#0A0A0A] px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-lg rounded-sm border border-[#FF4B4B]/30 bg-[#151515] p-8 sm:p-10">
          <div className="flex h-11 w-11 items-center justify-center rounded-sm border border-[#FF4B4B]/30 bg-[#FF4B4B]/10 text-[#FF4B4B]">
            <ShieldAlert className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <h1 className="font-display mt-5 text-2xl font-semibold text-white">
            Admin Access Required
          </h1>
          <p className="mt-3 text-sm leading-[1.7] text-[#A3A3A3]">
            Signed in as <span className="text-white">{user.email}</span>. Only the authorized Winner Designs admin account can manage portfolio projects.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-sm bg-white px-5 py-2.5 text-xs font-semibold tracking-[0.08em] text-[#0A0A0A] uppercase"
            >
              <LogOut className="h-3.5 w-3.5" strokeWidth={1.75} />
              <span>Sign Out</span>
            </button>
            <button
              type="button"
              onClick={onNavigatePortfolio}
              className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-sm border border-white/15 px-5 py-2.5 text-xs font-semibold tracking-[0.08em] text-white uppercase hover:border-white/35"
            >
              <span>View Portfolio</span>
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </main>
    );
  }

  const publishedCount = projects.filter((p) => p.published).length;
  const draftCount = projects.length - publishedCount;
  const previewDomain = extractDomain(form.liveUrl);

  return (
    <main className="bg-[#0A0A0A] pb-24 pt-12 lg:pb-32 lg:pt-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Top Dashboard Bar */}
        <div className="flex flex-col justify-between gap-6 border-b border-white/[0.08] pb-8 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-[#A3A3A3] uppercase">
              Winner Designs · Admin Dashboard
            </p>
            <h1 className="font-display mt-3 text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-white">
              Portfolio Project Manager
            </h1>
            <p className="mt-2 text-sm text-[#A3A3A3]">
              Signed in as <span className="text-white">{user.email}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onNavigatePortfolio}
              className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-sm border border-white/15 bg-white/[0.03] px-5 py-2.5 text-xs font-semibold tracking-[0.08em] text-white uppercase transition-colors hover:border-white/35"
            >
              <span>View Portfolio Page</span>
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </button>

            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-sm border border-white/10 bg-[#151515] px-4 py-2.5 text-xs font-semibold tracking-[0.08em] text-[#A3A3A3] uppercase transition-colors hover:border-white/25 hover:text-white"
            >
              <LogOut className="h-3.5 w-3.5" strokeWidth={1.75} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Summary Metrics Strip */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-sm border border-white/[0.08] bg-[#111111] p-5">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-[#A3A3A3] uppercase">
              Published Live
            </p>
            <p className="font-display mt-2 text-3xl font-semibold text-white tabular-nums">
              {publishedCount}
            </p>
          </div>
          <div className="rounded-sm border border-white/[0.08] bg-[#111111] p-5">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-[#A3A3A3] uppercase">
              Hidden Drafts
            </p>
            <p className="font-display mt-2 text-3xl font-semibold text-white tabular-nums">
              {draftCount}
            </p>
          </div>
          <div className="rounded-sm border border-white/[0.08] bg-[#111111] p-5">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-[#A3A3A3] uppercase">
              Total Projects
            </p>
            <p className="font-display mt-2 text-3xl font-semibold text-white tabular-nums">
              {projects.length}
            </p>
          </div>
        </div>

        {/* Main 2-Column Workspace */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* LEFT: Add / Edit Project Form */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-sm border border-white/[0.1] bg-[#151515] p-6 sm:p-8">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, #FF2E93, #FF9A1F, #8B3DFF, #2F6BFF)',
                }}
              />

              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-sm border border-white/15 bg-[#111111] text-white">
                    <FolderPlus className="h-4 w-4" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-white sm:text-2xl">
                      {editingId ? 'Edit Portfolio Project' : 'Upload New Project'}
                    </h2>
                    <p className="text-xs text-[#A3A3A3]">
                      Published projects appear automatically on the public Portfolio page.
                    </p>
                  </div>
                </div>

                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="cursor-pointer rounded-sm border border-white/15 px-3 py-1.5 text-xs font-medium text-[#A3A3A3] hover:border-white/30 hover:text-white"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                {/* Project Name & Title */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="admin-project-name"
                      className="block text-xs font-semibold tracking-[0.12em] text-white/90 uppercase"
                    >
                      Project Name <span className="text-[#FF2E93]">*</span>
                    </label>
                    <input
                      id="admin-project-name"
                      type="text"
                      value={form.projectName}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, projectName: e.target.value }))
                      }
                      placeholder="e.g. Velora Studio"
                      className="mt-2 w-full rounded-sm border border-white/15 bg-[#111111] px-4 py-3 text-sm text-white placeholder-[#A3A3A3]/55 focus:border-[#2F6BFF] focus:outline-none"
                    />
                    {formErrors.projectName && (
                      <p className="mt-1.5 text-xs text-[#FF4B4B]">{formErrors.projectName}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="admin-project-title"
                      className="block text-xs font-semibold tracking-[0.12em] text-white/90 uppercase"
                    >
                      Project Title <span className="text-[#FF2E93]">*</span>
                    </label>
                    <input
                      id="admin-project-title"
                      type="text"
                      value={form.title}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, title: e.target.value }))
                      }
                      placeholder="e.g. Modern Wellness Booking Platform"
                      className="mt-2 w-full rounded-sm border border-white/15 bg-[#111111] px-4 py-3 text-sm text-white placeholder-[#A3A3A3]/55 focus:border-[#2F6BFF] focus:outline-none"
                    />
                    {formErrors.title && (
                      <p className="mt-1.5 text-xs text-[#FF4B4B]">{formErrors.title}</p>
                    )}
                  </div>
                </div>

                {/* Category & Live Link */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="admin-project-category"
                      className="block text-xs font-semibold tracking-[0.12em] text-white/90 uppercase"
                    >
                      Category <span className="text-[#FF2E93]">*</span>
                    </label>
                    <input
                      id="admin-project-category"
                      type="text"
                      list="admin-category-presets"
                      value={form.category}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, category: e.target.value }))
                      }
                      placeholder="Website Design & Development"
                      className="mt-2 w-full rounded-sm border border-white/15 bg-[#111111] px-4 py-3 text-sm text-white placeholder-[#A3A3A3]/55 focus:border-[#2F6BFF] focus:outline-none"
                    />
                    <datalist id="admin-category-presets">
                      {PROJECT_CATEGORY_PRESETS.map((preset) => (
                        <option key={preset} value={preset} />
                      ))}
                    </datalist>
                    {formErrors.category && (
                      <p className="mt-1.5 text-xs text-[#FF4B4B]">{formErrors.category}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="admin-live-link"
                      className="block text-xs font-semibold tracking-[0.12em] text-white/90 uppercase"
                    >
                      Live Website Link <span className="text-[#FF2E93]">*</span>
                    </label>
                    <input
                      id="admin-live-link"
                      type="url"
                      value={form.liveUrl}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, liveUrl: e.target.value }))
                      }
                      placeholder="https://example.com"
                      className="mt-2 w-full rounded-sm border border-white/15 bg-[#111111] px-4 py-3 text-sm text-white placeholder-[#A3A3A3]/55 focus:border-[#2F6BFF] focus:outline-none"
                    />
                    {formErrors.liveUrl && (
                      <p className="mt-1.5 text-xs text-[#FF4B4B]">{formErrors.liveUrl}</p>
                    )}
                  </div>
                </div>

                {/* Project Thumbnail Upload & URL */}
                <div className="rounded-sm border border-white/[0.08] bg-[#111111] p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold tracking-[0.12em] text-white/90 uppercase">
                        Project Thumbnail <span className="text-[#FF2E93]">*</span>
                      </p>
                      <p className="mt-1 text-xs text-[#A3A3A3]">
                        Upload a screenshot/image or paste an image URL to display as a live preview.
                      </p>
                    </div>

                    <label className="inline-flex min-h-[40px] cursor-pointer items-center gap-2 rounded-sm border border-white/20 bg-[#151515] px-4 py-2 text-xs font-semibold tracking-[0.06em] text-white uppercase transition-colors hover:border-white/40">
                      {thumbnailBusy ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          <span>Optimizing...</span>
                        </>
                      ) : (
                        <>
                          <ImagePlus className="h-3.5 w-3.5" strokeWidth={1.75} />
                          <span>Upload Thumbnail</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={handleThumbnailFile}
                        className="sr-only"
                      />
                    </label>
                  </div>

                  <div className="mt-3">
                    <input
                      id="admin-thumbnail-url"
                      type="text"
                      value={
                        form.thumbnailUrl.startsWith('data:image/')
                          ? ''
                          : form.thumbnailUrl
                      }
                      onChange={(e) => {
                        setThumbnailError(null);
                        setForm((prev) => ({ ...prev, thumbnailUrl: e.target.value }));
                      }}
                      placeholder={
                        form.thumbnailUrl.startsWith('data:image/')
                          ? 'Uploaded thumbnail image ready (paste a URL here to replace)'
                          : 'Or paste a thumbnail image URL (https://...)'
                      }
                      className="w-full rounded-sm border border-white/15 bg-[#0A0A0A] px-3.5 py-2.5 text-xs text-white placeholder-[#A3A3A3]/55 focus:border-[#2F6BFF] focus:outline-none"
                    />
                  </div>

                  {thumbnailError && (
                    <p className="mt-2 text-xs text-[#FF4B4B]">{thumbnailError}</p>
                  )}
                  {formErrors.thumbnailUrl && (
                    <p className="mt-2 text-xs text-[#FF4B4B]">{formErrors.thumbnailUrl}</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="admin-description"
                    className="block text-xs font-semibold tracking-[0.12em] text-white/90 uppercase"
                  >
                    Project Description <span className="text-[#FF2E93]">*</span>
                  </label>
                  <textarea
                    id="admin-description"
                    rows={3}
                    value={form.description}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, description: e.target.value }))
                    }
                    placeholder="Summarize what you designed and built, who it serves, and the key outcome."
                    className="mt-2 w-full resize-y rounded-sm border border-white/15 bg-[#111111] px-4 py-3 text-sm text-white placeholder-[#A3A3A3]/55 focus:border-[#2F6BFF] focus:outline-none"
                  />
                  {formErrors.description && (
                    <p className="mt-1.5 text-xs text-[#FF4B4B]">{formErrors.description}</p>
                  )}
                </div>

                {/* Challenge Faced & My Approach */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="admin-challenge"
                      className="block text-xs font-semibold tracking-[0.12em] text-white/90 uppercase"
                    >
                      Challenge Faced <span className="text-[#FF2E93]">*</span>
                    </label>
                    <textarea
                      id="admin-challenge"
                      rows={4}
                      value={form.challenge}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, challenge: e.target.value }))
                      }
                      placeholder="Describe the design, conversion, or technical challenge faced on this project."
                      className="mt-2 w-full resize-y rounded-sm border border-white/15 bg-[#111111] px-4 py-3 text-sm text-white placeholder-[#A3A3A3]/55 focus:border-[#2F6BFF] focus:outline-none"
                    />
                    {formErrors.challenge && (
                      <p className="mt-1.5 text-xs text-[#FF4B4B]">{formErrors.challenge}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="admin-approach"
                      className="block text-xs font-semibold tracking-[0.12em] text-white/90 uppercase"
                    >
                      My Approach <span className="text-[#FF2E93]">*</span>
                    </label>
                    <textarea
                      id="admin-approach"
                      rows={4}
                      value={form.approach}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, approach: e.target.value }))
                      }
                      placeholder="Explain your creative strategy, UX decisions, and implementation approach."
                      className="mt-2 w-full resize-y rounded-sm border border-white/15 bg-[#111111] px-4 py-3 text-sm text-white placeholder-[#A3A3A3]/55 focus:border-[#2F6BFF] focus:outline-none"
                    />
                    {formErrors.approach && (
                      <p className="mt-1.5 text-xs text-[#FF4B4B]">{formErrors.approach}</p>
                    )}
                  </div>
                </div>

                {/* Published Checkbox */}
                <label className="flex cursor-pointer items-center gap-3 rounded-sm border border-white/[0.08] bg-[#111111] px-4 py-3">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, published: e.target.checked }))
                    }
                    className="h-4 w-4 accent-[#14E3A8]"
                  />
                  <span className="text-sm text-white">
                    Publish immediately on the public Portfolio page
                  </span>
                </label>

                {saveErrorMessage && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 rounded-sm border border-[#FF4B4B]/40 bg-[#FF4B4B]/10 p-4 text-xs text-white/90"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#FF4B4B]" />
                    <span>{saveErrorMessage}</span>
                  </div>
                )}

                {saveSuccessMessage && (
                  <div
                    role="status"
                    className="flex flex-wrap items-center justify-between gap-3 rounded-sm border border-[#14E3A8]/40 bg-[#14E3A8]/10 p-4 text-xs text-white"
                  >
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#14E3A8]" />
                      <span>{saveSuccessMessage}</span>
                    </span>
                    <button
                      type="button"
                      onClick={onNavigatePortfolio}
                      className="cursor-pointer border-b border-white/50 pb-0.5 font-semibold uppercase hover:border-white"
                    >
                      View Portfolio →
                    </button>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={saving || thumbnailBusy}
                    className="inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-2 rounded-sm bg-white px-7 py-3 text-xs font-semibold tracking-[0.08em] text-[#0A0A0A] uppercase transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>{editingId ? 'Updating...' : 'Publishing...'}</span>
                      </>
                    ) : (
                      <span>{editingId ? 'Save Changes' : 'Save & Publish Project'}</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT: Live Preview & Saved Projects List */}
          <div className="space-y-8 lg:col-span-5">
            {/* Live Preview Card */}
            <div className="rounded-sm border border-white/[0.1] bg-[#111111] p-5 sm:p-6">
              <p className="text-xs font-semibold tracking-[0.18em] text-[#A3A3A3] uppercase">
                Public Card Live Preview
              </p>

              <div className="mt-4 overflow-hidden rounded-sm border border-white/[0.1] bg-[#151515]">
                <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#0A0A0A] px-3.5 py-2">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-white/15" />
                    <span className="h-2 w-2 rounded-full bg-white/15" />
                    <span className="h-2 w-2 rounded-full bg-white/15" />
                  </div>
                  <span className="truncate text-[11px] text-[#A3A3A3]">
                    {previewDomain}
                  </span>
                </div>

                <div className="relative aspect-[16/10] w-full bg-[#0A0A0A]">
                  {form.thumbnailUrl ? (
                    <img
                      src={form.thumbnailUrl}
                      alt="Project thumbnail preview"
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
                      <ImagePlus className="h-6 w-6 text-white/30" strokeWidth={1.5} />
                      <p className="mt-2 text-xs text-[#A3A3A3]">
                        Upload a thumbnail to see the live browser preview
                      </p>
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between text-[11px] font-semibold tracking-[0.14em] text-[#A3A3A3] uppercase">
                    <span>{form.projectName || 'Project Name'}</span>
                    <span>{form.category || 'Category'}</span>
                  </div>
                  <h3 className="font-display mt-2 text-lg font-semibold text-white">
                    {form.title || 'Your Project Title'}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#A3A3A3]">
                    {form.description ||
                      'Your project description will appear here with a See Project button for challenge & approach details.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Uploaded Projects List */}
            <div className="rounded-sm border border-white/[0.1] bg-[#111111] p-5 sm:p-6">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <h2 className="font-display text-lg font-semibold text-white">
                  Uploaded Projects ({projects.length})
                </h2>
              </div>

              {projectsError && (
                <div className="mt-4 rounded-sm border border-[#FF4B4B]/40 bg-[#FF4B4B]/10 p-3 text-xs text-white">
                  {projectsError}
                </div>
              )}

              {projects.length === 0 ? (
                <p className="mt-5 text-sm text-[#A3A3A3]">
                  No projects uploaded yet. Use the form on the left to add your first portfolio project.
                </p>
              ) : (
                <div className="mt-5 space-y-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="rounded-sm border border-white/[0.08] bg-[#151515] p-4"
                    >
                      <div className="flex items-start gap-3.5">
                        <img
                          src={project.thumbnailUrl}
                          alt={project.projectName}
                          className="h-16 w-24 shrink-0 rounded-sm border border-white/10 bg-[#0A0A0A] object-cover object-top"
                        />

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="truncate text-xs font-semibold tracking-[0.12em] text-white uppercase">
                              {project.projectName}
                            </p>
                            <span
                              className={`text-[10px] font-semibold tracking-[0.12em] uppercase ${
                                project.published ? 'text-[#14E3A8]' : 'text-[#FF9A1F]'
                              }`}
                            >
                              {project.published ? 'Published' : 'Draft'}
                            </span>
                          </div>
                          <p className="mt-1 truncate text-sm font-medium text-white/90">
                            {project.title}
                          </p>
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 inline-flex items-center gap-1 text-xs text-[#A3A3A3] hover:text-white"
                          >
                            <span className="truncate">{extractDomain(project.liveUrl)}</span>
                            <ExternalLink className="h-3 w-3 shrink-0" />
                          </a>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] pt-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleEditProject(project)}
                            className="inline-flex min-h-[34px] cursor-pointer items-center gap-1.5 rounded-sm border border-white/15 bg-[#111111] px-3 py-1 text-xs font-medium text-white hover:border-white/35"
                          >
                            <Edit3 className="h-3 w-3" />
                            <span>Edit</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleTogglePublished(project)}
                            className="inline-flex min-h-[34px] cursor-pointer items-center gap-1.5 rounded-sm border border-white/15 bg-[#111111] px-3 py-1 text-xs font-medium text-[#A3A3A3] hover:border-white/35 hover:text-white"
                          >
                            {project.published ? (
                              <>
                                <EyeOff className="h-3 w-3" />
                                <span>Hide</span>
                              </>
                            ) : (
                              <>
                                <Eye className="h-3 w-3" />
                                <span>Publish</span>
                              </>
                            )}
                          </button>
                        </div>

                        {confirmDeleteId === project.id ? (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              disabled={deletingId === project.id}
                              onClick={() => handleDeleteProject(project.id)}
                              className="cursor-pointer rounded-sm bg-[#FF4B4B] px-2.5 py-1 text-xs font-semibold text-white disabled:opacity-60"
                            >
                              {deletingId === project.id ? 'Deleting...' : 'Confirm'}
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteId(null)}
                              className="cursor-pointer text-xs text-[#A3A3A3] hover:text-white"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(project.id)}
                            aria-label={`Delete ${project.projectName}`}
                            className="inline-flex min-h-[34px] cursor-pointer items-center gap-1 rounded-sm border border-white/10 px-2.5 py-1 text-xs text-[#A3A3A3] hover:border-[#FF4B4B]/50 hover:text-[#FF4B4B]"
                          >
                            <Trash2 className="h-3 w-3" />
                            <span>Delete</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
