"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MenuSection() {
  const container = useRef(null);

  useGSAP(
    () => {
      // Animate from invisible to visible
      // Set initial state via GSAP to ensure they start hidden ONLY if JS runs
      gsap.set(".menu-card", {
        y: 100,
        opacity: 0
      });

      gsap.to(".menu-card", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });
    },
    { scope: container }
  );

  return (
    <section 
      ref={container}
      className="menu-section w-full max-w-[1200px] px-4 md:px-8 py-16 md:py-24"
    >
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Our Favorites
          </h2>
          <p className="text-muted-foreground max-w-md text-lg">
            Curated selections from our master baristas and pastry chefs, made
            fresh daily.
          </p>
        </div>
        <Link
          href="#"
          className="group flex items-center gap-2 text-primary font-bold text-sm hover:underline"
        >
          See Full Menu
          <i className="ri-arrow-right-line transition-transform group-hover:translate-x-1 text-lg"></i>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1 */}
        <Card className="menu-card border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden bg-card opacity-0">
          <div className="relative w-full aspect-[4/5] overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-110"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCncd-psv4Df-xhO1BQbqs4pWupfSaLnxtImgK72wikpDtbwuh6k3I8SkiDp8IFXnKx73URNCswNbU1MM3xRyTeOwBUrtDmKI4QoQe-DY0FWrS8_pveqEmQuiKIuLl-lKhMhGoBrGTLpqDm6X4fS3Nircz0KqAOC3k5Uv5U45zFQUvo6lWFYApAMauSOjJ_OzYOhrsveoYHDZpVH3gTfLAKPU6hKZgS9o2kQA3aWU6D70qozp-bU-kwD_yQ9lU-wWEmzX1Kv31fb4w')",
              }}
            ></div>
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold hover:text-primary transition-colors">
                Honey Lavender Latte
              </h3>
              <span className="text-lg font-bold text-primary">$5.50</span>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Fragrant and soothing espresso milk beverage sweetened with local
              honey and lavender syrup.
            </p>
            <Button
              variant="outline"
              className="w-full font-bold border-primary/20 text-primary hover:bg-primary hover:text-white"
            >
              Add to Order
            </Button>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className="menu-card border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden bg-card opacity-0">
          <div className="relative w-full aspect-[4/5] overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-110"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCMDsjhz8jmFt8gLV-1P4gdaoUIVuRxHGBnqBcjrBneMhhp9w_wQllZL0YysbMjdIx6YXsWMGg8acho0GODROvYmaQX6TUo7K-N4bttHAnL1LhySp5vbYmly4cVE7o23MwM7jWPoaEkCfIsN7usyunIcl1I7xDOoQWhIICOKHoq4EoSdRcGSjNYrFvUse_yzM5LiJ1v0u1cdEnejI0-pplVrTmT_P3wr47bFstM7Z_DbKnSfcFBF8Py757qLbNXz1lXoPwpjnQxsQY')",
              }}
            ></div>
            <Badge className="absolute top-3 right-3 bg-primary text-white hover:bg-primary">
              Bestseller
            </Badge>
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold hover:text-primary transition-colors">
                Almond Croissant
              </h3>
              <span className="text-lg font-bold text-primary">$4.50</span>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Buttery, flaky pastry filled with rich almond paste and topped
              with sliced almonds.
            </p>
            <Button
              variant="outline"
              className="w-full font-bold border-primary/20 text-primary hover:bg-primary hover:text-white"
            >
              Add to Order
            </Button>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card className="menu-card border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden bg-card opacity-0">
          <div className="relative w-full aspect-[4/5] overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-110"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAAQ5WfiMwhm86n95UyI2MbpA42JXNMkG1ToqXfR25sqeGPRQniFblpKbxS1us8BEjIumEk1Z729auTf26TT-qD9Si2oyK52q2QYC3tqw_qNwzIvQ8j0eIQh5A22ic3GCDt9Z62KokcBPjBwx3B-BI50KLXuBx_h1oXLVVf0AP-FVeM3DaZfcAt7aj_-c6OCAYzVj-8fZskFInLAgbqeatCz67I3MHOqK4NBxv_siyBbLIrDhDOPqn4z1mSn52s4C3QoCdD03EkQac')",
              }}
            ></div>
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold hover:text-primary transition-colors">
                Cold Brew Reserve
              </h3>
              <span className="text-lg font-bold text-primary">$5.00</span>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Smooth 24-hour steep single origin beans, served over ice for a
              refreshing kick.
            </p>
            <Button
              variant="outline"
              className="w-full font-bold border-primary/20 text-primary hover:bg-primary hover:text-white"
            >
              Add to Order
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
