import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { RouteCard } from "@/components/routes/RouteCard";
import { ArtCard } from "@/components/art/ArtCard";
import { getFeaturedArt, getFeaturedRoutes, getSiteSettings, getUpcomingDates } from "@/lib/data";

export default async function Home() {
  const [featuredRoutes, featuredArt, upcomingDates] = await Promise.all([
    getFeaturedRoutes(),
    getFeaturedArt(),
    getUpcomingDates(),
  ]);
  const site = getSiteSettings();

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-background pt-72 sm:pt-80 pb-0 min-h-[800px] flex items-start">
        <Image
          src="/images/hero-photo.webp"
          alt="View of Porto Cathedral over the rooftops of the historic centre"
          fill
          priority
          className="object-cover opacity-55"
          style={{ objectPosition: "50% 5%" }}
        />
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 85% 70% at 50% 40%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.4) 45%, rgba(255,255,255,0.05) 100%), linear-gradient(to bottom, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.05) 60%, rgba(255,255,255,0.85) 100%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center w-full">
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-muted-light border-b border-border/60 pb-3 mb-3">
            Porto · Portugal · Est. by Sharon Jemima
          </span>

          <div className="flex flex-col items-center -space-y-2 sm:-space-y-3">
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">The</span>
            <div className="relative mb-16 sm:mb-20">
              <span className="block -mt-3 sm:-mt-5 text-[clamp(3.5rem,11vw,8.5rem)] font-black leading-[0.85] tracking-tight text-red">
                Porto
              </span>
              <span
                className="absolute right-0 bottom-0 text-[clamp(1.75rem,5vw,3.5rem)] font-extrabold tracking-tight text-blue"
                style={{ transform: "translateY(60px)" }}
              >
                Map
              </span>
            </div>
          </div>

          <p className="mt-4 text-sm sm:text-base uppercase tracking-[0.18em] text-muted">
            drawn by hand · walked with soul
          </p>

          <p className="mt-6 text-sm leading-snug text-foreground/80 max-w-sm bg-background/70 rounded-lg px-3 py-0.5 backdrop-blur-sm">
            Discover a secret Porto with us.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/routes"
              className="inline-flex items-center justify-center rounded-full bg-blue px-8 py-3.5 text-base font-semibold text-white hover:bg-blue-dark transition-colors"
            >
              Explore Walking Routes
              <ChevronRight className="ml-1 h-5 w-5" />
            </Link>
            <Link
              href="/tours"
              className="inline-flex items-center justify-center rounded-full border-2 border-foreground/25 bg-background/80 px-8 py-3.5 text-base font-semibold text-foreground backdrop-blur-sm hover:bg-surface-elevated transition-colors"
            >
              Book a Guided Tour
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FEATURED WALKING ROUTES ===== */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue">
              Digital Download
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-foreground">
              Self-Guided Walking Routes
            </h2>
            <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
              Sharon&apos;s illustrated route scripts turn Porto&apos;s streets into a
              story. Download, print and walk at your own pace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRoutes.map((route) => (
              <RouteCard key={route.id} route={route} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/routes"
              className="inline-flex items-center gap-2 rounded-full border border-blue px-8 py-3 text-sm font-semibold text-blue hover:bg-blue hover:text-white transition-colors"
            >
              View All Walking Routes
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== ART GALLERY PREVIEW ===== */}
      <section className="py-20 bg-surface border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue">
              Original Artwork
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-foreground">
              Porto, <em className="not-italic text-red">drawn from life</em>
            </h2>
            <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
              Ink illustrations of the city&apos;s most iconic corners — Ribeira,
              Clérigos, São Bento — each one a piece you can own.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredArt.map((piece) => (
              <ArtCard key={piece.id} piece={piece} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/art"
              className="inline-flex items-center gap-2 rounded-full border border-blue px-8 py-3 text-sm font-semibold text-blue hover:bg-blue hover:text-white transition-colors"
            >
              Explore the Full Gallery
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== GUIDED TOURS + UPCOMING DATES ===== */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue">With Sharon</p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-foreground">Guided Tours</h2>
              <p className="mt-4 text-lg text-muted leading-relaxed">
                Small, intimate groups. No generic scripts. Sharon walks you through
                the Porto she actually knows — the hidden courtyards, the tiled
                staircases, the café she sketched last Tuesday.
              </p>
              <Link
                href="/tours"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-blue px-8 py-3.5 text-base font-semibold text-white hover:bg-blue-dark transition-colors"
              >
                See All Tours
              </Link>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue mb-4">
                Upcoming Dates
              </p>
              {upcomingDates.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {upcomingDates.map((date) => (
                    <div
                      key={date.id}
                      className="flex items-center gap-4 rounded-xl bg-surface border border-border p-4"
                    >
                      <div className="flex flex-col items-center justify-center rounded-lg bg-surface-elevated w-14 h-14 shrink-0">
                        <span className="text-lg font-bold text-foreground">
                          {new Date(date.date).getDate()}
                        </span>
                        <span className="text-xs uppercase text-muted">
                          {new Date(date.date).toLocaleDateString("en-US", { month: "short" })}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">{date.tour_name}</p>
                        <p className="text-xs text-muted">
                          {date.time} · {date.spots_remaining} spot{date.spots_remaining === 1 ? "" : "s"}{" "}
                          left
                        </p>
                      </div>
                      <span
                        className={`text-xs font-semibold rounded-full px-3 py-1 ${
                          date.status === "available"
                            ? "bg-yellow/20 text-yellow-dark"
                            : "bg-border text-muted"
                        }`}
                      >
                        {date.status === "available" ? "Available" : "Full"}
                      </span>
                    </div>
                  ))}
                  <Link href="/tours" className="mt-2 text-sm font-semibold text-blue hover:text-blue-dark">
                    View Full Schedule →
                  </Link>
                </div>
              ) : (
                <div className="rounded-xl bg-surface border border-border p-6 text-center">
                  <p className="text-sm text-muted mb-3">New dates coming soon.</p>
                  <Link href="/contact" className="text-sm font-semibold text-blue hover:text-blue-dark">
                    Get Notified
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT SHARON ===== */}
      <section className="py-20 bg-surface border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-square max-w-md mx-auto lg:mx-0 rounded-2xl bg-surface-elevated flex items-center justify-center text-7xl">
              🎨
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue">The Artist</p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-foreground">Sharon Jemima</h2>
              <p className="mt-6 text-muted leading-relaxed">
                Sharon is a British artist who moved to Porto and never left. She
                spends her days wandering the city&apos;s layered streets with a
                sketchbook, capturing what tourists miss and locals take for
                granted.
              </p>
              <p className="mt-4 text-muted leading-relaxed">
                Her walking route scripts combine hand-drawn maps with personal
                notes, hidden-gem tips and the kind of local knowledge you can&apos;t
                Google. Every line is drawn from life.
              </p>
              <div className="mt-8 flex items-center gap-8">
                <div>
                  <p className="text-2xl font-bold text-foreground">10+</p>
                  <p className="text-xs text-muted">Walking Routes</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">500+</p>
                  <p className="text-xs text-muted">Illustrations</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">8</p>
                  <p className="text-xs text-muted">Max per tour</p>
                </div>
              </div>
              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-blue hover:text-blue-dark transition-colors"
              >
                Read Sharon&apos;s Story
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ETSY CTA BAND ===== */}
      <section className="py-20 bg-gradient-to-br from-red via-red-dark to-blue-dark">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Can&apos;t decide? Browse everything on Etsy.
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
            Sharon&apos;s full shop — prints, route scripts, and more — is on Etsy.
            Secure checkout, worldwide shipping on prints.
          </p>
          <div className="mt-8">
            <a
              href={site.etsy_shop_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-yellow px-8 py-3.5 text-base font-semibold text-foreground hover:bg-yellow-dark transition-colors"
            >
              Visit the Etsy Shop ↗
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
