"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowRight, ArrowUpRight, BadgeCheck } from "lucide-react";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const reveal = {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: shouldReduceMotion ? 0 : 0.7, ease: "easeOut" as const },
  };

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-[#f5f8fb]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-64 -z-10 size-[620px] rounded-full bg-[radial-gradient(circle_at_center,rgba(207,226,237,0.72),rgba(207,226,237,0)_68%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-64 -left-48 -z-10 size-[540px] rounded-full bg-[radial-gradient(circle_at_center,rgba(244,221,192,0.48),rgba(244,221,192,0)_70%)]"
      />

      <div className="mx-auto grid min-h-[calc(100svh-76px)] w-full max-w-7xl items-center gap-10 px-5 py-10 sm:px-8 sm:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-12 lg:py-8">
        <div className="relative z-10 max-w-2xl">
          <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.05 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#dbe5ec] bg-white/80 px-3.5 py-2 text-xs font-semibold tracking-[0.08em] text-[#315b78] shadow-sm shadow-slate-900/[0.03]">
              <span className="size-1.5 rounded-full bg-[#d99149]" />
              THE UNITED EDUCATIONAL &amp; SOCIAL WELFARE TRUST
            </span>
          </motion.div>

          <motion.h1
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.14 }}
            id="hero-title"
            className="mt-5 text-[clamp(2.5rem,4.2vw,3.75rem)] font-semibold leading-[0.98] tracking-[-0.065em] text-[#173a5e] xl:text-[3.75rem]"
          >
            Empowering Minds.
            <span className="mt-1 block text-[#376887]">Transforming Communities.</span>
          </motion.h1>

          <motion.p
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.23 }}
            className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8"
          >
            Opening doors through education, care, and meaningful support — building brighter
            futures together.
          </motion.p>

          <motion.div
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.32 }}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <motion.div whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#d99149] px-6 py-3.5 text-sm font-semibold text-[#17324b] transition-colors hover:bg-[#e4a45e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#173a5e]"
              >
                Donate
                <ArrowUpRight aria-hidden="true" size={17} />
              </Link>
            </motion.div>
            <Link
              href="/services"
              className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-[#cbd7e0] bg-white/60 px-6 py-3.5 text-sm font-semibold text-[#173a5e] transition-colors hover:border-[#173a5e] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d99149]"
            >
              Explore our work
              <ArrowRight
                aria-hidden="true"
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>

          <motion.div
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.42 }}
            className="mt-8 grid max-w-xl grid-cols-2 gap-3"
          >
            <div className="flex min-h-20 items-center gap-3 rounded-2xl border border-white/80 bg-white/75 px-4 py-3 backdrop-blur-sm sm:px-5">
              <span className="text-3xl font-semibold tracking-[-0.06em] text-[#173a5e]">31+</span>
              <span className="text-xs font-medium leading-5 text-slate-600 sm:text-sm">
                Years of service
              </span>
            </div>
            <div className="flex min-h-20 items-center gap-3 rounded-2xl border border-white/80 bg-white/75 px-4 py-3 backdrop-blur-sm sm:px-5">
              <BadgeCheck aria-hidden="true" className="shrink-0 text-[#4e8a75]" size={25} />
              <span className="text-xs font-medium leading-5 text-slate-600 sm:text-sm">
                ISO 9001:2015
                <span className="block font-semibold text-[#173a5e]">certified</span>
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.85, delay: 0.2, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-[540px] lg:ml-auto"
        >
          <div className="relative overflow-hidden rounded-[1.6rem] border border-white/80 bg-white p-2 shadow-[0_24px_80px_-36px_rgba(23,58,94,0.38)]">
            <Image
              src="/UTHI-free-unsp.jpg"
              alt="Children learning together in a classroom"
              width={945}
              height={720}
              priority
              sizes="(max-width: 1023px) 100vw, 45vw"
              className="aspect-[4/3] w-full rounded-[1.15rem] object-cover"
            />
          </div>
          <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-white/70 bg-white/80 px-5 py-4 shadow-[0_16px_45px_-28px_rgba(23,58,94,0.45)] backdrop-blur-md sm:bottom-7 sm:left-7 sm:px-6 sm:py-5">
            <span className="grid size-10 place-items-center rounded-full bg-[#f8eee2] text-[#b46d2e]">
              <ArrowDownRight aria-hidden="true" size={20} />
            </span>
            <span className="text-xs font-medium leading-5 text-slate-600 sm:text-sm">
              A brighter future
              <span className="block font-semibold text-[#173a5e]">starts together</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
