import Link from "next/link";
import type { WalkingRoute } from "@/types";
import { DIFFICULTY_LABELS } from "@/types";

export function RouteCard({ route }: { route: WalkingRoute }) {
  return (
    <article className="flex flex-col rounded-2xl bg-surface border border-border overflow-hidden">
      <div className="aspect-[4/3] flex items-center justify-center bg-surface-elevated text-4xl">
        🗺
      </div>
      <div className="flex flex-col flex-1 p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue">
          {route.neighbourhood}
        </p>
        <h3 className="mt-1 text-lg font-bold text-foreground">{route.title}</h3>
        <p className="mt-2 text-sm text-muted leading-relaxed flex-1">{route.subtitle}</p>
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-light">
          <span>{route.distance_km} km</span>
          <span>·</span>
          <span>{route.duration_hours}h</span>
          <span>·</span>
          <span>{DIFFICULTY_LABELS[route.difficulty]}</span>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-lg font-bold text-foreground">€{route.price}</span>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/routes/${route.slug}`}
              className="inline-flex items-center rounded-full border border-border px-4 py-1.5 text-xs font-semibold text-foreground hover:bg-surface-elevated transition-colors"
            >
              Details
            </Link>
            <a
              href={route.etsy_listing_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-yellow px-4 py-1.5 text-xs font-semibold text-foreground hover:bg-yellow-dark transition-colors"
            >
              Get on Etsy ↗
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
