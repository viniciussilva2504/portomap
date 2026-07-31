import Link from "next/link";
import type { GuidedTour } from "@/types";

export function TourCard({ tour }: { tour: GuidedTour }) {
  return (
    <article className="flex flex-col rounded-2xl bg-surface border border-border overflow-hidden">
      <div className="aspect-[4/3] flex items-center justify-center bg-surface-elevated text-4xl">
        🚶
      </div>
      <div className="flex flex-col flex-1 p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue">
          Guided Tour · {tour.duration_hours}h
        </p>
        <h3 className="mt-1 text-lg font-bold text-foreground">{tour.name}</h3>
        <p className="mt-2 text-sm text-muted leading-relaxed flex-1">{tour.tagline}</p>
        <div className="mt-3 text-xs text-muted-light">
          Max {tour.max_participants} people · Meeting: {tour.meeting_point}
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-lg font-bold text-foreground">
            €{tour.price_per_person}{" "}
            <span className="text-xs font-normal text-muted">per person</span>
          </span>
          <Link
            href={`/tours/${tour.slug}`}
            className="inline-flex items-center rounded-full bg-blue px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-dark transition-colors"
          >
            Book Now
          </Link>
        </div>
      </div>
    </article>
  );
}
