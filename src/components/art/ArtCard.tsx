import Link from "next/link";
import type { ArtPiece } from "@/types";
import { MEDIUM_LABELS } from "@/types";

export function ArtCard({ piece }: { piece: ArtPiece }) {
  return (
    <article className="flex flex-col rounded-2xl bg-surface border border-border overflow-hidden">
      <div className="aspect-[3/4] flex items-center justify-center bg-surface-elevated text-4xl">
        ✏️
      </div>
      <div className="flex flex-col flex-1 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue">
          {MEDIUM_LABELS[piece.medium]}
        </p>
        <h3 className="mt-1 text-sm font-bold text-foreground">{piece.title}</h3>
        <div className="mt-3 flex gap-2">
          <Link
            href={`/art/${piece.slug}`}
            className="inline-flex items-center rounded-full border border-border px-4 py-1.5 text-xs font-semibold text-foreground hover:bg-surface-elevated transition-colors"
          >
            View
          </Link>
          <a
            href={piece.etsy_listing_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-yellow px-4 py-1.5 text-xs font-semibold text-foreground hover:bg-yellow-dark transition-colors"
          >
            Buy ↗
          </a>
        </div>
      </div>
    </article>
  );
}
