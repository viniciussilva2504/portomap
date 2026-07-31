"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SITE_SETTINGS } from "@/lib/mock-data";

const NAV_LINKS = [
  { href: "/routes", label: "Walking Routes" },
  { href: "/art", label: "Art Gallery" },
  { href: "/tours", label: "Guided Tours" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-foreground"
          aria-label="The Porto Map — Home"
        >
          The <span className="text-red">Porto</span> <span className="text-blue">Map</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground hover:text-red transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href={SITE_SETTINGS.etsy_shop_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-yellow px-5 py-2 text-sm font-semibold text-foreground hover:bg-yellow-dark transition-colors"
          >
            Shop on Etsy ↗
          </a>
        </div>

        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav
          className="lg:hidden border-t border-border bg-background px-4 py-4 flex flex-col gap-4"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={SITE_SETTINGS.etsy_shop_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-yellow px-5 py-2 text-sm font-semibold text-foreground"
          >
            Shop on Etsy ↗
          </a>
        </nav>
      )}
    </header>
  );
}
