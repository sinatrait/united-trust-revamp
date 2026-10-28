import Link from "next/link";
import { AtSign, Camera, CirclePlay, Mail } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/#home" },
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Activities", href: "/gallery" },
  { label: "What We Do", href: "/#services" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { label: "Facebook link coming soon", Icon: AtSign },
  { label: "Instagram link coming soon", Icon: Camera },
  { label: "YouTube link coming soon", Icon: CirclePlay },
  { label: "Email", href: "mailto:unitedtrustind@gmail.com", Icon: Mail },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#102d49] text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-12 lg:py-16">
        <div className="max-w-sm">
          <Link
            href="/#home"
            className="text-lg font-semibold tracking-[-0.035em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e6aa6c]"
          >
            The United Educational &amp; Social Welfare Trust
          </Link>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Empowering minds and transforming communities through education, care, and
            compassionate service.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#e6aa6c]">
            Quick links
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-slate-300 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e6aa6c]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#e6aa6c]">
            Stay connected
          </h2>
          <div className="mt-4 flex gap-2.5">
            {socialLinks.map(({ label, href, Icon }) => (
              href ? (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full border border-white/15 text-slate-200 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e6aa6c]"
                >
                  <Icon aria-hidden="true" size={17} strokeWidth={1.8} />
                </a>
              ) : (
                <span
                  key={label}
                  aria-label={label}
                  title={label}
                  className="grid size-10 place-items-center rounded-full border border-white/10 text-slate-500"
                >
                  <Icon aria-hidden="true" size={17} strokeWidth={1.8} />
                </span>
              )
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-slate-400 sm:px-8 sm:flex-row sm:items-center sm:justify-between lg:px-12">
          <p>© The United Educational &amp; Social Welfare Trust</p>
          <p>Serving communities with compassion and purpose.</p>
        </div>
      </div>
    </footer>
  );
}
