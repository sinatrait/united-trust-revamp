import About from "@/components/About";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import OurMessage from "@/components/OurMessage";
import Volunteers from "@/components/Volunteers";
import WhatWeDo from "@/components/WhatWeDo";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhatWeDo />
        <OurMessage />
        <Volunteers />
      </main>
      <Footer />
    </>
  );
}
