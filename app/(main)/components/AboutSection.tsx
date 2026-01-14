"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.from(".about-content", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });

      gsap.from(".about-image", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });
    },
    { scope: container }
  );

  return (
    <section 
      ref={container}
      className="about-section w-full max-w-[1200px] px-4 md:px-8 py-16 md:py-24"
    >
      <div className="bg-card rounded-3xl p-6 md:p-12 shadow-md border border-border">
        <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="about-content flex-1 space-y-8">
            <div>
              <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-2 block">
                Our Philosophy
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-primary leading-tight mb-6">
                Warm & Inviting,
                <br />
                Like a Good Cup.
              </h2>
              <p className="text-lg text-muted-foreground leading-loose">
                More than just coffee. A space to breathe, connect, and create.
                We believe in the power of a quiet corner and a warm mug. Our
                beans are ethically sourced, roasted in small batches, and brewed
                with precision to ensure every cup tells a story.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 py-4">
              <div className="flex flex-col gap-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                  <i className="ri-plant-line text-2xl"></i>
                </div>
                <h4 className="font-bold text-lg">Ethically Sourced</h4>
                <p className="text-sm text-muted-foreground">
                  Direct trade with farmers ensuring fair wages.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                  <i className="ri-group-line text-2xl"></i>
                </div>
                <h4 className="font-bold text-lg">Community Focus</h4>
                <p className="text-sm text-muted-foreground">
                  A welcoming space for everyone in the city.
                </p>
              </div>
            </div>
            <Button className="rounded-full h-12 px-8 text-base font-bold shadow-lg">
              Read Our Story
            </Button>
          </div>

          {/* Image Content */}
          <div className="about-image flex-1 w-full">
            <div className="relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCgVCnM6BoXX51TzHSKnMXLc3A7GDT1jdra5ltzYLiQ_YiH0fVKwfsYIpNGoXyK0nRU0dS6ZfJQWtB4g-Iqd7y3Lis9RdQPUISJ9ZHLYHwXFBHRvYPCw5lGwNIk_tHWI53cHEzp_5s-TG7xMYOgHWwjf2cjEtNU-l9ESIA2On_rZoW6J5118E3djczjEVjD09uYdkrDDZCfVS48QhQ0xpxWp9OBfj2hcfbK080F_u2pwLAKDTWLvF2p2hRtZ6nST7ZnVQKPpfAcWbI')",
                }}
              ></div>
              {/* Floating badge */}
              <div className="absolute bottom-6 right-6 bg-card/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-border max-w-[200px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex -space-x-2">
                    {[
                      "https://lh3.googleusercontent.com/aida-public/AB6AXuCkPhwj-0YaOyzbxXi6UVxLLvZ0ytnhqJtEgK9bpRhRUAbwMa4ChzgRT_SkIvUq2LkZLvR5CucicG4wvzHCY0giAQxpd2DDpjRnrVrGMCtNxq7TVwJTPbJqc9VYYoN_s3IGPI-lAVajFITE7p-gOtJlC9A0LDRuLUprf6f8rd4F1oBOeIokgqEfIkEsu5zlicotd0rJKq3fFs8E1GAtno0N6NipW_WTLl9bOf2ixu0LUgkd16g5GZ1_Tk8_rHnQoISNeHwtVPMxPyw",
                      "https://lh3.googleusercontent.com/aida-public/AB6AXuBLjBH6XKGQsz5DMcHm265edl1-S2hJwbD0sdSl36TbTz0jlJCal-YKABwEOWkIkh0FkRkHfe49ndGHlQSQEqPNOWTYM6VKjnT4olu7otX15QuBRWbNgdjjcRFNFX0fJ5qfI2_RjpUfW7ujTCSpEJOuDoi7xQSZLnTHJpbqg0ahQTuqr530l8b6Gdx6yLseUjjNB2bqWKMDMMq8fBy0fcWXKRcTwQ9Jv3Ndpmg5EDPT2hM2_gKhnfVhtQZ0MaD_NmQhXRj74W6-DZA",
                      "https://lh3.googleusercontent.com/aida-public/AB6AXuCILw6BqY5qj4M49FqOvuHWO0ip28KRH8yUuwbfJ37z5Vn5aHFy6gpPpOBf9KSpsArj19_XnM9ge4Mp8NOJV803GUirfVU_HBESxAS6QO5A17QxhOSaQVoswUAtXR_HgvIQBPAUAIgLfeSKu4ZhZ5IOCsJQnnzd_1ri4stK6tTsXDvOloaVdOg5E497nOO2x4Ei4Sz7ZG_qXLE6WzbTLM1Q7j6Wx8i5CMuVEQSd9IO5ox3gCalxbAZ0Bk38sbnmhUW9U02-ddBvwnQ",
                    ].map((url, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white bg-gray-300 bg-cover"
                        style={{ backgroundImage: `url('${url}')` }}
                      ></div>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-muted-foreground">
                    Join 2k+ locals
                  </span>
                </div>
                <p className="text-xs font-medium text-muted-foreground">
                  "Best quiet spot in town."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
