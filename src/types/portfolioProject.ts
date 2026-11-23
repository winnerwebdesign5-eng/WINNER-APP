export interface AdminPortfolioProject {
  id: string;
  projectName: string;
  title: string;
  category: string;
  liveUrl: string;
  description: string;
  challenge: string;
  approach: string;
  thumbnailUrl: string;
  published: boolean;
  ownerId: string;
  createdAtMs: number;
  updatedAtMs: number;
}

export interface PortfolioProjectInput {
  projectName: string;
  title: string;
  category: string;
  liveUrl: string;
  description: string;
  challenge: string;
  approach: string;
  thumbnailUrl: string;
  published: boolean;
}

/**
 * Validation boundaries synchronized with firebase-blueprint.json & firestore.rules.
 */
export const PROJECT_LIMITS = {
  projectNameMin: 2,
  projectNameMax: 100,
  titleMin: 2,
  titleMax: 140,
  categoryMin: 2,
  categoryMax: 80,
  liveUrlMin: 8,
  liveUrlMax: 500,
  liveUrlPattern: /^https?:\/\/.+/,
  descriptionMin: 10,
  descriptionMax: 1500,
  challengeMin: 10,
  challengeMax: 2000,
  approachMin: 10,
  approachMax: 2000,
  thumbnailMin: 1,
  thumbnailMax: 220000,
} as const;

export const PROJECT_CATEGORY_PRESETS = [
  'Website Design & Development',
  'E-commerce Website',
  'AI Automation & Workflows',
  'Web Application',
  'Brand Identity & Web',
  'Landing Page Design',
] as const;
