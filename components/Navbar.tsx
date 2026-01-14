"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-transparent",
        scrolled
          ? "backdrop-blur-md bg-background/80 border-border shadow-sm py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 text-primary flex items-center justify-center">
              <i className="ri-cup-line text-3xl"></i>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-primary">
              Modern Cafe
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {["Menu", "About", "Locations", "Shop"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button className="hidden md:flex rounded-full shadow-lg font-bold">
              Order Online
            </Button>
            <button className="md:hidden p-2 text-muted-foreground">
              <i className="ri-menu-line text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
