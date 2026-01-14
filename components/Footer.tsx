"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="w-full bg-card border-t border-border mt-12">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 text-primary">
              <i className="ri-cup-line text-3xl"></i>
              <span className="text-xl font-extrabold tracking-tight">
                Modern Cafe
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Crafting exceptional coffee experiences for the modern lifestyle.
              Visit us today.
            </p>
            <div className="flex gap-4">
              {[
                { icon: "ri-instagram-line", label: "IG" },
                { icon: "ri-twitter-x-line", label: "TW" },
                { icon: "ri-facebook-fill", label: "FB" },
              ].map((social) => (
                <Link
                  key={social.label}
                  href="#"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors"
                >
                  <i className={`${social.icon} text-lg`}></i>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg text-primary">Explore</h4>
            {["Our Menu", "About Us", "Locations", "Careers"].map((link) => (
              <Link
                key={link}
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {link}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg text-primary">Visit Us</h4>
            <p className="text-muted-foreground">
              123 Coffee Lane
              <br />
              San Francisco, CA 94103
            </p>
            <p className="text-muted-foreground mt-2">
              Mon - Fri: 7am - 7pm
              <br />
              Sat - Sun: 8am - 6pm
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg text-primary">Stay Updated</h4>
            <p className="text-muted-foreground text-sm">
              Join our newsletter for exclusive offers and brewing tips.
            </p>
            <form className="flex flex-col gap-3">
              <Input
                className="bg-background text-foreground"
                placeholder="Your email address"
                type="email"
              />
              <Button className="w-full font-bold">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 Modern Cafe. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary text-sm"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
