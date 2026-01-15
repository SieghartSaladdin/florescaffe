"use client";

import React from "react";
import CaffeSequence from "@/app/(main)/components/CaffeSequence";
import MenuSection from "@/app/(main)/components/MenuSection";
import AboutSection from "@/app/(main)/components/AboutSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <main className="w-full flex flex-col items-center">
        <CaffeSequence />
        <MenuSection />
        <AboutSection />
      </main>
    </div>
  );
}
