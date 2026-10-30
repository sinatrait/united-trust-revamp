import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, HandHeart, HeartPulse, UsersRound } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore the education, community health, social welfare, and youth initiatives of The United Educational & Social Welfare Trust.",
};

const services = [
  {
    title: "Education & Learning",
    description:
      "We support access to learning and educational opportunities that help individuals build skills and work toward a brighter future.",
    Icon: BookOpen,
    iconClassName: "bg-[#eef5f8] text-[#315f7d]",
  },
  {
    title: "Community Health",
    description:
      "Health-focused initiatives, including community medical camps, help bring awareness and essential support closer to local communities.",
    Icon: HeartPulse,
    iconClassName: "bg-[#fbf3e9] text-[#b87537]",
  },
  {
    title: "Social Welfare",
    description:
      "Our charitable and social activities are guided by compassion, inclusion, and a commitment to responding to community needs.",
    Icon: HandHeart,
    iconClassName: "bg-[#eef4ee] text-[#4e806b]",
  },
  {
    title: "Youth & Opportunity",
    description:
      "We create opportunities to celebrate young people, encourage their ideas, and help communities invest in the next generation.",
    Icon: UsersRound,
    iconClassName: "bg-[#f1eff8] text-[#66578f]",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-[#f5f8fb] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#b87537]">
              Personalized support for your journey
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.055em] text-[#173a5e] sm:text-5xl">
              Our Services
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              We bring people and communities together through initiatives focused on
              education, wellbeing, opportunity, and social care.
            </p>
          </div>
        </section>

        <section
          aria-label="Our areas of work"
          className="bg-white px-5 py-14 sm:px-8 sm:py-20 lg:px-12"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
              {services.map(({ title, description, Icon, iconClassName }) => (
                <article
                  key={title}
                  className="rounded-2xl border border-slate-200/80 bg-white p-7 transition-colors hover:border-[#cbd9e2] sm:p-8"
                >
                  <span
                    aria-hidden="true"
                    className={`grid size-12 place-items-center rounded-xl ${iconClassName}`}
                  >
                    <Icon size={23} strokeWidth={1.8} />
                  </span>
                  <h2 className="mt-6 text-2xl font-semibold tracking-[-0.04em] text-[#173a5e]">
                    {title}
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                    {description}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-12 flex flex-col gap-5 rounded-2xl bg-[#f5f8fb] p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
              <div>
                <h2 className="text-xl font-semibold tracking-[-0.035em] text-[#173a5e]">
                  Interested in working with us?
                </h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Get in touch to learn more about our work or explore ways to get involved.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#173a5e] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#244d73] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d99149]"
              >
                Contact us
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
