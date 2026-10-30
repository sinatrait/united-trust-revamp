import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact The United Educational & Social Welfare Trust to learn about its work and ways to get involved.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-[#f5f8fb] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#b87537]">
              We would love to hear from you
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.055em] text-[#173a5e] sm:text-5xl">
              Let&apos;s make a difference together.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Reach out with a question about our work, a partnership idea, or an interest in
              supporting the communities we serve.
            </p>
          </div>
        </section>

        <section
          aria-label="Contact information"
          className="bg-white px-5 py-14 sm:px-8 sm:py-20 lg:px-12"
        >
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#b87537]">
                Get in touch
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[#173a5e]">
                Start a conversation
              </h2>
              <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">
                Contact us by email and tell us how we can help. For updates from our community
                initiatives, visit the Activities page.
              </p>
              <a
                href="mailto:unitedtrustind@gmail.com"
                className="mt-7 inline-flex min-h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-[#173a5e] transition-colors hover:border-[#cbd9e2] hover:bg-[#f8fafc] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d99149] sm:text-base"
              >
                <span className="grid size-10 place-items-center rounded-full bg-[#eef5f8] text-[#315f7d]">
                  <Mail aria-hidden="true" size={19} />
                </span>
                unitedtrustind@gmail.com
              </a>
            </div>

            <aside className="rounded-2xl bg-[#f5f8fb] p-7 sm:p-9">
              <h2 className="text-xl font-semibold tracking-[-0.035em] text-[#173a5e]">
                Be part of the change
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                Whether you want to learn more, share an idea, or support an initiative, we
                welcome conversations rooted in care and community.
              </p>
              <Link
                href="/gallery"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#244f70] transition-colors hover:text-[#a65e28] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d99149]"
              >
                Explore our activities
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
