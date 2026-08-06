import Link from "next/link";

import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "@/components/icons/social";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { BRANDS } from "@/constants/brands";
import { navLinks, siteConfig, supportLinks } from "@/constants/site";

const socialLinks = [
  { label: "Instagram", href: siteConfig.links.instagram, icon: InstagramIcon },
  { label: "Facebook", href: siteConfig.links.facebook, icon: FacebookIcon },
  { label: "YouTube", href: siteConfig.links.youtube, icon: YoutubeIcon },
];

export function Footer() {
  return (
    <footer className="border-border/60 bg-background border-t">
      <div className="max-w-8xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link
              href="/"
              className="font-heading text-xl font-bold tracking-widest uppercase"
            >
              {siteConfig.name}
            </Link>
            <p className="text-muted-foreground mt-4 max-w-xs text-sm leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-muted-foreground hover:text-foreground hover:border-foreground/40 flex size-9 items-center justify-center rounded-full border transition-colors"
                >
                  <social.icon className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-foreground text-sm font-semibold tracking-wide">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-foreground text-sm font-semibold tracking-wide">
              Popular Brands
            </h3>
            <ul className="mt-4 space-y-3">
              {BRANDS.map((brand) => (
                <li key={brand.slug}>
                  <Link
                    href="/collection"
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {brand.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-foreground text-sm font-semibold tracking-wide">
              Support
            </h3>
            <ul className="mt-4 space-y-3">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-foreground text-sm font-semibold tracking-wide">
              Newsletter
            </h3>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
              Subscribe to get latest updates, offers and bike launches.
            </p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="border-border/60 text-muted-foreground mt-16 flex flex-col gap-4 border-t pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <p>Crafted for those who ride without compromise.</p>
        </div>
      </div>
    </footer>
  );
}
