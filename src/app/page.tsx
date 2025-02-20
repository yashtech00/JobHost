"use client";

import Appbar from "@/components/Appbar";

import { HeroSection } from "@/components/Landingpage/HeroSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col ">
      <Appbar />
     <HeroSection/>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center text-sm text-gray-600">
            © 2025 JobBoard. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
