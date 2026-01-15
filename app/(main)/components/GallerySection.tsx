"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1507133750069-bef72f3707a9?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800",
];

export default function GallerySection() {
  const container = useRef<HTMLElement>(null);
  const scrollContainer = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scrollEl = scrollContainer.current;
      if (!scrollEl) return;

      // Function to calculate width dynamically
      const getScrollAmount = () => {
        let scrollWidth = scrollEl.scrollWidth;
        let viewWidth = window.innerWidth;
        return -(scrollWidth - viewWidth); // Negative value for left translation
      };

      const tween = gsap.to(scrollEl, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${scrollEl.scrollWidth}`, // Dynamic end point based on content width
          invalidateOnRefresh: true, // Recalculate on resize
          anticipatePin: 1,
        },
      });
      
      return () => {
        tween.kill();
      };
    },
    { scope: container, dependencies: [] } // Removing dependencies to avoid re-running mid-scroll
  );

  return (
    <section ref={container} className="relative h-screen bg-black text-white overflow-hidden flex flex-col justify-center">
      <div className="absolute top-10 left-8 z-10 pointer-events-none">
        <h2 className="text-4xl font-bold uppercase tracking-tighter mix-blend-difference">Moments @ Flores</h2>
      </div>

      <div 
        ref={scrollContainer} 
        className="flex gap-4 px-8 items-center h-[70vh] w-fit min-w-[100vw]"
      >
        <div className="flex-shrink-0 w-[80vw] md:w-[30vw] h-full flex flex-col justify-center pr-12 pl-4">
             <p className="text-xl md:text-3xl text-gray-400 font-light leading-snug">
                Join our community. <br/>
                Tag us <span className="text-white font-bold">#FloresPikulan</span> to be featured.
             </p>
             <Button variant="outline" className="mt-8 border-white text-black hover:bg-neutral-800 hover:text-white rounded-full w-fit px-8 py-6 text-lg">
                Follow Instagram
             </Button>
        </div>

        {GALLERY_IMAGES.map((src, idx) => (
          <div
            key={idx}
            className="relative flex-shrink-0 w-[70vw] md:w-[25vw] h-full overflow-hidden rounded-lg group bg-neutral-900"
          >
            <Image
              src={src}
              alt={`Gallery ${idx}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
              sizes="(max-width: 768px) 70vw, 25vw"
            />
            
            {/* Hover Caption */}
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-10">
                <p className="text-white font-medium text-lg">Daily Brew</p>
                <div className="text-xs text-gray-300">@florescaffe</div>
            </div>
          </div>
        ))}

        <div className="flex-shrink-0 w-[80vw] md:w-[40vw] h-full flex items-center justify-center bg-neutral-900 rounded-lg border border-neutral-800">
            <h3 className="text-3xl md:text-5xl font-bold text-center text-neutral-500">See More <br/> on Socials</h3>
        </div>
      </div>
    </section>
  );
}
