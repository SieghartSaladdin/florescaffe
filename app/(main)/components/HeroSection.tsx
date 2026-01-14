"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function HeroSection() {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.from(".hero-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="w-full max-w-[1200px] px-4 md:px-8 py-12 md:py-20"
    >
      <div className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-xl group">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBy5psd0VFyDI_uUL4TVF0BFdnXbnAAXFPr6HNIVlWee7jzNyNY_8B5iS7pKD6bi1i61Yi77DZbvkHk1N81MEga0HNNbSyiNVg9uCAO8Z6tdsK-pRiN4OUkVhBmMfc2R_llVU-nf9sWHtWiAmAE2yZO-lx7Vy0i6ivLfGaLXtd-ZX-NvxZHA628JwC5JMa_k-62oVHAhzuPdSz4X8IhMrSIzawq4JMK6M4Fy26-opGpkheVUAr7b0h1H9_vMP7ZEiHp7Z2j93pda1w')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 lg:p-16 flex flex-col items-start gap-4 md:gap-6 z-10">
          <div className="hero-text inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-300"></span> Now
            Open
          </div>
          <h1 className="hero-text text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] max-w-3xl">
            Brewing Moments <br className="hidden md:block" /> of Calm.
          </h1>
          <p className="hero-text text-white/90 text-lg md:text-xl font-medium max-w-xl leading-relaxed">
            Artisan coffee and pastries in the heart of the city. Experience the
            perfect blend of tradition and modern comfort.
          </p>
          <div className="hero-text flex gap-4 pt-2">
            <Button
              size="lg"
              className="rounded-full bg-white text-primary hover:bg-stone-100 hover:text-primary font-bold shadow-lg transition-all duration-300"
            >
              View Menu
              <i className="ri-arrow-right-line ml-2"></i>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
