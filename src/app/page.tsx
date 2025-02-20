"use client";

import Appbar from "@/components/Appbar";
import { Footer } from "@/components/Landingpage/Footer";
import { HeroSection } from "@/components/Landingpage/HeroSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col ">
      <Appbar />
      <HeroSection />
      <Footer />
    </div>
  );
}
