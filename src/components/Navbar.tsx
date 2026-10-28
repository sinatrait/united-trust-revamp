"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Activities", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const updateActiveHash = () => setActiveHash(window.location.hash);
    updateActiveHash();
    window.addEventListener("hashchange", updateActiveHash);
    return () => window.removeEventListener("hashchange", updateActiveHash);
  }, []);

  function handleNavigationClick(href: string) {
    setActiveHash(new URL(href, window.location.href).hash);
    setMenuOpen(false);
  }

  function isActiveLink(label: string, href: string) {
    if (pathname === "/" && label === "Home") {
      return activeHash === "" || activeHash === "#home";
    }
    return pathname === href;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[76px] w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12"
      >
        <Link
          href="/#home"
          aria-label="The United Trust home"
          className="group flex items-center gap-3"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/United-trust-logo.svg"
            alt=""
            width={56}
            height={56}
            priority
            className="size-14 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-semibold tracking-[-0.035em] text-[#173a5e]">
              The United Trust
            </span>
            <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">
              Education · Welfare · Humanity
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            (() => {
              const active = isActiveLink(link.label, link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => handleNavigationClick(link.href)}
                  className={`group relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d99149] ${
                    active
                      ? "text-[#173a5e]"
                      : "text-slate-600 hover:text-[#173a5e]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-3 bottom-[-18px] h-[3px] rounded-full bg-[#d99149] transition-transform duration-200 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })()
          ))}
          <Link
            href="/contact"
            className="ml-3 inline-flex items-center rounded-full bg-[#173a5e] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#244d73] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d99149]"
          >
            Get involved
          </Link>
        </div>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-full border border-slate-200 text-[#173a5e] transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d99149] md:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" size={21} /> : <Menu aria-hidden="true" size={21} />}
        </button>
      </nav>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-slate-200/70 bg-white px-5 py-3 md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col">
            {navLinks.map((link) => (
              (() => {
                const active = isActiveLink(link.label, link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => handleNavigationClick(link.href)}
                    className={`rounded-lg px-3 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[#d99149] ${
                      active
                        ? "bg-[#eef5f8] text-[#173a5e]"
                        : "text-slate-700 hover:bg-slate-50 hover:text-[#173a5e]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })()
            ))}
            <Link
              href="/contact"
              className="mt-2 rounded-full bg-[#173a5e] px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#244d73]"
              onClick={() => setMenuOpen(false)}
            >
              Get involved
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
