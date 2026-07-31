export type Difficulty = "easy" | "moderate" | "challenging";

export interface WalkingRoute {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  distance_km: number;
  duration_hours: number;
  difficulty: Difficulty;
  neighbourhood: string;
  cover_image_url: string;
  etsy_listing_url: string;
  price: number;
  featured: boolean;
  order: number;
}

export type ArtMedium = "ink" | "watercolour" | "mixed";

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  order: number;
}

export interface ArtPiece {
  id: string;
  collection_slug: string | null;
  title: string;
  slug: string;
  description: string;
  medium: ArtMedium;
  image_url: string;
  is_available: boolean;
  etsy_listing_url: string;
  featured: boolean;
  order: number;
}

export interface GuidedTour {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  duration_hours: number;
  max_participants: number;
  price_per_person: number;
  meeting_point: string;
  cover_image_url: string;
  highlights: string[];
  featured: boolean;
  order: number;
}

export type TourDateStatus = "available" | "full" | "cancelled";

export interface TourDate {
  id: string;
  tour_slug: string;
  date: string;
  time: string;
  spots_remaining: number;
  status: TourDateStatus;
}

export interface SiteSettings {
  tagline: string;
  hero_subtitle: string;
  etsy_shop_url: string;
  instagram_url: string;
  facebook_url: string;
}

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: "Easy",
  moderate: "Moderate",
  challenging: "Challenging",
};

export const MEDIUM_LABELS: Record<ArtMedium, string> = {
  ink: "Ink on Paper",
  watercolour: "Watercolour",
  mixed: "Mixed Media",
};
