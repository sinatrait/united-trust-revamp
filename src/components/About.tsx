"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HeartHandshake, Target } from "lucide-react";

const cards = [
  {
    title: "Our Vision",
    description:
      "At United Trust, we envision a world where every individual has access to essential resources, education, and healthcare, irrespective of their socio-economic background. We aim to foster a society that thrives on kindness, equality, and inclusivity.",
    Icon: Target,
    className: "bg-[#eef5f8]",
    iconClassName: "bg-white text-[#315f7d]",
  },
  {
    title: "Our Mission",
    description:
      "Our mission is to spearhead transformative initiatives that address critical social issues and provide sustainable solutions. Through our diverse range of projects, we aim to foster development, nurture talent, and spread love and hope to those in need.",
    Icon: HeartHandshake,
    className: "bg-[#eef5f8]",
    iconClassName: "bg-white text-[#315f7d]",
  },
];

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  const groupVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.16,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 22,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.55,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section
      aria-labelledby="about-title"
      className="bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#b87537]">
            Who we are
          </p>
          <h1
            id="about-title"
            className="mt-4 text-4xl font-semibold tracking-[-0.055em] text-[#173a5e] sm:text-5xl"
          >
            About Us
          </h1>
          <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg sm:leading-9">
            The United Educational &amp; Social Welfare Trust is an ISO 9001:2015 certified
            organization dedicated to creating a positive impact on society through various
            charitable and social activities. Founded on the principles of compassion,
            empathy, and a strong commitment to serve the community, we strive to uplift lives
            and build a better tomorrow for all.
          </p>
        </div>

        <motion.div
          variants={groupVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6"
        >
          {cards.map(({ title, description, Icon, className, iconClassName }) => (
            <motion.article
              key={title}
              variants={cardVariants}
              className={`rounded-2xl border border-slate-200/70 p-7 shadow-[0_16px_45px_-34px_rgba(23,58,94,0.3)] sm:p-9 ${className}`}
            >
              <span
                className={`grid size-12 place-items-center rounded-xl ${iconClassName}`}
                aria-hidden="true"
              >
                <Icon size={23} strokeWidth={1.8} />
              </span>
              <h3 className="mt-6 text-2xl font-semibold tracking-[-0.04em] text-[#173a5e]">
                {title}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                {description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
