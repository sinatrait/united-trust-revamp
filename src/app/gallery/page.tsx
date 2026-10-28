import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import GalleryClient from "@/components/GalleryClient";

export const metadata: Metadata = {
  title: "Gallery | The United Trust",
  description: "Photos and videos from The United Educational & Social Welfare Trust.",
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main>
        <GalleryClient />
      </main>
      <Footer />
    </>
  );
}
