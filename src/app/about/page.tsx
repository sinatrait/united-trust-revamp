import type { Metadata } from "next";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about The United Educational & Social Welfare Trust, its mission, and its vision for a more compassionate and inclusive society.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <About />
      </main>
      <Footer />
    </>
  );
}
