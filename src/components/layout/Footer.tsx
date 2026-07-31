import Link from "next/link";
import { SITE_SETTINGS } from "@/lib/mock-data";

export function Footer() {
  return (
    <footer className="bg-foreground text-white/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <p className="text-lg font-bold text-white">
              The <span className="text-red">Porto</span> <span className="text-blue">Map</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/60 max-w-xs">
              Hand-drawn maps, self-guided walks and intimate guided tours of Porto
              — all created by one artist who lives and breathes this city.
            </p>
            <div className="flex gap-4 mt-4">
              {SITE_SETTINGS.instagram_url && (
                <a
                  href={SITE_SETTINGS.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-xs font-semibold text-white/60 hover:text-yellow hover:border-yellow transition-colors"
                >
                  IG
                </a>
              )}
              {SITE_SETTINGS.etsy_shop_url && (
                <a
                  href={SITE_SETTINGS.etsy_shop_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Etsy Shop"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-xs font-semibold text-white/60 hover:text-yellow hover:border-yellow transition-colors"
                >
                  E
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Explore
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/routes", label: "Walking Routes" },
                { href: "/art", label: "Art Gallery" },
                { href: "/tours", label: "Guided Tours" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-yellow transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Info
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-white/60 hover:text-yellow transition-colors">
                  About Sharon
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-white/60 hover:text-yellow transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href={SITE_SETTINGS.etsy_shop_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-yellow transition-colors"
                >
                  Shop on Etsy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Find Us
            </h3>
            <ul className="space-y-2">
              <li className="text-sm text-white/60">Porto, Portugal</li>
              <li>
                <Link href="/contact" className="text-sm text-white/60 hover:text-yellow transition-colors">
                  Send a message
                </Link>
              </li>
              <li>
                <Link href="/tours" className="text-sm text-white/60 hover:text-yellow transition-colors">
                  Book a tour
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between gap-2 text-xs text-white/40">
          <p>© {new Date().getFullYear()} The Porto Map · Sharon Jemima. All rights reserved.</p>
          <p>Hand-drawn with love in Porto ♥</p>
        </div>
      </div>
    </footer>
  );
}
