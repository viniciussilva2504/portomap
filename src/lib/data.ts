import {
  MOCK_ART,
  MOCK_COLLECTIONS,
  MOCK_ROUTES,
  MOCK_TOUR_DATES,
  MOCK_TOURS,
  SITE_SETTINGS,
} from "@/lib/mock-data";
import type { ArtPiece, Collection, GuidedTour, TourDate, WalkingRoute } from "@/types";

export function getSiteSettings() {
  return SITE_SETTINGS;
}

// ========================
// WALKING ROUTES
// ========================

export async function getRoutes(): Promise<WalkingRoute[]> {
  return [...MOCK_ROUTES].sort((a, b) => a.order - b.order);
}

export async function getFeaturedRoutes(): Promise<WalkingRoute[]> {
  const routes = await getRoutes();
  return routes.filter((r) => r.featured);
}

export async function getRouteBySlug(slug: string): Promise<WalkingRoute | null> {
  return MOCK_ROUTES.find((r) => r.slug === slug) ?? null;
}

export async function getAllRouteSlugs(): Promise<string[]> {
  return MOCK_ROUTES.map((r) => r.slug);
}

// ========================
// ART GALLERY
// ========================

export async function getCollections(): Promise<Collection[]> {
  return [...MOCK_COLLECTIONS].sort((a, b) => a.order - b.order);
}

export async function getArtPieces(collectionSlug?: string): Promise<ArtPiece[]> {
  const pieces = collectionSlug
    ? MOCK_ART.filter((p) => p.collection_slug === collectionSlug)
    : MOCK_ART;
  return [...pieces].sort((a, b) => a.order - b.order);
}

export async function getFeaturedArt(): Promise<ArtPiece[]> {
  const pieces = await getArtPieces();
  return pieces.filter((p) => p.featured);
}

export async function getArtPieceBySlug(slug: string): Promise<ArtPiece | null> {
  return MOCK_ART.find((p) => p.slug === slug) ?? null;
}

export async function getAllArtSlugs(): Promise<string[]> {
  return MOCK_ART.map((p) => p.slug);
}

// ========================
// GUIDED TOURS
// ========================

export async function getTours(): Promise<GuidedTour[]> {
  return [...MOCK_TOURS].sort((a, b) => a.order - b.order);
}

export async function getTourBySlug(slug: string): Promise<GuidedTour | null> {
  return MOCK_TOURS.find((t) => t.slug === slug) ?? null;
}

export async function getAllTourSlugs(): Promise<string[]> {
  return MOCK_TOURS.map((t) => t.slug);
}

export async function getUpcomingDates(tourSlug?: string): Promise<(TourDate & { tour_name: string })[]> {
  const today = new Date().toISOString().split("T")[0];
  const dates = MOCK_TOUR_DATES.filter((d) => d.date >= today && (!tourSlug || d.tour_slug === tourSlug));
  return dates
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
    .map((d) => ({
      ...d,
      tour_name: MOCK_TOURS.find((t) => t.slug === d.tour_slug)?.name ?? "",
    }));
}
