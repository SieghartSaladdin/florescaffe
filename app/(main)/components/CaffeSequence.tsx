"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CaffeSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  // Config
  const frameCount = 32;
  const imagePath = "/caffe-sequence/ezgif-frame-";

  // 1. Load Images with Progress
  useEffect(() => {
    let active = true;
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      let loadedCount = 0;

      for (let i = 1; i <= frameCount; i++) {
        if (!active) return;
        
        const img = new Image();
        const filename = `${String(i).padStart(3, "0")}.jpg`;
        img.src = `${imagePath}${filename}`;

        await new Promise<void>((resolve) => {
          img.onload = () => {
            loadedImages[i - 1] = img;
            loadedCount++;
            setLoadingProgress(Math.round((loadedCount / frameCount) * 100));
            resolve();
          };
          img.onerror = () => {
            console.error(`Failed to load ${filename}`);
            loadedCount++; // Skip error
            resolve();
          };
        });
      }

      if (active) {
        setImages(loadedImages);
        setTimeout(() => setIsLoaded(true), 500); // Small buffer for smooth exit
      }
    };

    loadImages();

    return () => { active = false; };
  }, []);

  // 2. Animation & Rendering Logic
  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    // Use gsap.context for easy cleanup
    const ctx = gsap.context(() => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      
      if (!canvas || !context) return;

      // --- Rendering Logic ---
      const sequence = { frame: 0 };
      
      function render() {
        // Interpolasi: Hitung frame saat ini dan frame berikutnya
        const frameIndex = Math.floor(sequence.frame);
        const nextFrameIndex = Math.min(frameIndex + 1, images.length - 1);
        const progress = sequence.frame - frameIndex; // Nilai desimal (0.0 - 0.99)

        const imgCurrent = images[frameIndex];
        const imgNext = images[nextFrameIndex];
        
        if (!imgCurrent || !canvas || !context) return;

        // Bersihkan canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Helper function untuk menggambar mode "cover"
        const drawImageCover = (img: HTMLImageElement, alpha: number) => {
           context.globalAlpha = alpha;
           const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
           const w = img.width * scale;
           const h = img.height * scale;
           const x = (canvas.width - w) / 2;
           const y = (canvas.height - h) / 2;
           context.drawImage(img, x, y, w, h);
        };

        // 1. Gambar frame saat ini (Base)
        drawImageCover(imgCurrent, 1);

        // 2. Gambar frame selanjutnya dengan transparansi (Overlay)
        // Ini menciptakan efek "morphing" halus antar frame
        if (imgNext && nextFrameIndex !== frameIndex) {
            drawImageCover(imgNext, progress);
        }

        // Reset alpha agar drawing berikutnya tidak transparan
        context.globalAlpha = 1; 
      }

      // --- Resize Hander ---
      function onResize() {
        canvas!.width = window.innerWidth;
        canvas!.height = window.innerHeight;
        render();
      }
      window.addEventListener("resize", onResize);
      onResize(); // Initial call

      // --- Animations ---
      
      // 1. Master Timeline: Pins the scene
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=500%", // 5x viewport height scroll distance
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        }
      });

      // 2. Sequence Timeline: Controls the frames
      mainTl.to(sequence, {
        frame: frameCount - 1,
        ease: "none",
        duration: 1,
        onUpdate: render,
      }, 0);

      // 3. Text & Visual Elements
      // Grab elements
      const t1 = document.querySelector(".t-1");
      const t2 = document.querySelector(".t-2");
      const t3 = document.querySelector(".t-3");
      const overlay = document.querySelector(".vignette-overlay");
      const scrollHint = document.querySelector(".scroll-hint");

      // Initial States
      gsap.set([t1, t2, t3], { opacity: 0, scale: 0.9, y: 20 });
      gsap.to(scrollHint, { opacity: 0, scrollTrigger: { trigger: wrapperRef.current, start: "top top", end: "+=100", scrub: true } });
      
      // Text 1: Start (0% - 20%)
      mainTl.fromTo(t1, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" }, 
        0
      );
      mainTl.to(t1, { opacity: 0, y: -30, duration: 0.15 }, 0.2);

      // Text 2: Middle (35% - 55%)
      mainTl.fromTo(t2, 
        { opacity: 0, scale: 1.1 }, 
        { opacity: 1, scale: 1, duration: 0.15, ease: "sine.out" }, 
        0.35
      );
      mainTl.to(t2, { opacity: 0, scale: 0.9, duration: 0.15 }, 0.55);

      // Text 3: End (70% - 100%)
      mainTl.fromTo(t3, 
        { opacity: 0, filter: "blur(10px)" }, 
        { opacity: 1, filter: "blur(0px)", duration: 0.2 }, 
        0.7
      );
      
      // Overlay Darkening towards the end for text readability
      mainTl.to(overlay, { backgroundColor: "rgba(0,0,0,0.6)", duration: 0.3 }, 0.6);


      return () => {
        window.removeEventListener("resize", onResize);
      };
      
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded, images]);

  return (
    <div ref={containerRef} className="relative w-full bg-black">
      {/* Sticky Container - Height 100vh for Pinning */}
      <div ref={wrapperRef} className="relative w-full h-screen overflow-hidden">
        
        {/* Canvas Layer */}
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full object-cover z-0" />
        
        {/* Vignette & Texture Overlay */}
        <div className="vignette-overlay absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/80 transition-colors" />
        
        {/* Text Layer - Centered */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none p-4 w-full">
            {/* Text Phase 1 */}
            <div className="t-1 absolute text-center">
                <p className="text-white/80 text-lg md:text-xl tracking-[0.5em] uppercase font-light mb-4 text-shadow-sm">The Origin</p>
                <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter drop-shadow-2xl">
                    HAND PICKED
                </h2>
            </div>

            {/* Text Phase 2 */}
            <div className="t-2 absolute text-center">
                <h2 className="text-6xl md:text-9xl font-black text-[#e8c6a5] mix-blend-overlay tracking-tight opacity-80">
                    ROASTED
                </h2>
                <p className="text-white text-xl md:text-3xl font-serif italic mt-2 opacity-90 tracking-widest">
                    to absolute perfection
                </p>
            </div>

            {/* Text Phase 3 */}
            <div className="t-3 absolute text-center">
                <div className="border border-white/20 py-8 md:py-12 px-8 md:px-16 backdrop-blur-sm bg-white/5 rounded-sm shadow-2xl">
                    <h1 className="text-5xl md:text-8xl font-bold text-white mb-2 uppercase tracking-wide">
                        Flores
                    </h1>
                    <div className="w-16 h-1 bg-[#c08e55] mx-auto mb-4"></div>
                    <p className="text-[#c08e55] text-lg md:text-2xl font-light tracking-[0.3em] uppercase">
                        Authentic Caffe
                    </p>
                </div>
            </div>
        </div>

        {/* Scroll Indicator (Only visible if loaded and at start) */}
        <div className="scroll-hint absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 opacity-100 transition-opacity duration-500">
            <span className="text-white/60 text-xs tracking-widest uppercase">Scroll to Discover</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                <div className="w-1 h-2 bg-white/80 rounded-full animate-[bounce_2s_infinite]"></div>
            </div>
        </div>

      </div>

      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white">
          <div className="w-64 h-[2px] bg-gray-800 rounded-full overflow-hidden mb-6 relative">
             <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#c08e55] to-[#ffeebb] transition-all duration-300 ease-out shadow-[0_0_10px_#c08e55]" 
                style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="font-mono text-xs text-gray-500 tracking-[0.2em] animate-pulse">
              BREWING EXPERIENCE <span className="text-[#c08e55]">{loadingProgress}%</span>
          </p>
        </div>
      )}
    </div>
  );
}