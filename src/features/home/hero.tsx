"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Display, Eyebrow, Lead } from "@/components/ui/typography";
import { HeroSearchPanel } from "@/features/home/hero-search-panel";
import { HeroStats } from "@/features/home/hero-stats";
import { useMouseParallax } from "@/hooks/use-mouse-parallax";

// Photo by Riccardo Farinazzo — Unsplash License (unsplash.com/photos/Xw3AcJril5U)
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1683455425959-8f5bf1e8fbfb?q=80&w=2400&auto=format&fit=crop";

export function Hero() {
  const parallax = useMouseParallax(24);

  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-black">
      <motion.div
        className="absolute inset-0"
        style={{ x: parallax.x, y: parallax.y }}
      >
        <motion.div
          className="absolute inset-[-5%]"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, ease: "easeOut" }}
        >
          <Image
            src={HERO_IMAGE}
            alt="Close-up of a Ducati Panigale superbike in dramatic low light"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Dark cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
      <div className="bg-radial-glow absolute inset-0 opacity-40" />

      <div className="max-w-8xl relative mx-auto flex w-full flex-col items-center gap-5 px-4 py-20 text-center sm:px-6 lg:gap-6 lg:py-24">
        <FadeIn inView={false}>
          <Eyebrow className="text-white/80">
            Est. 2008 · Premium Motorcycle Dealership
          </Eyebrow>
        </FadeIn>

        <FadeIn inView={false} delay={0.1}>
          <Display className="max-w-4xl text-4xl text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            Engineered for those who ride without compromise.
          </Display>
        </FadeIn>

        <FadeIn inView={false} delay={0.2}>
          <Lead className="max-w-xl text-white/70">
            An exclusive collection of premium and luxury motorcycles,
            handpicked for collectors and riders who demand nothing less than
            perfection.
          </Lead>
        </FadeIn>

        <FadeIn inView={false} delay={0.3}>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild className="gap-2">
              <Link href="/collection">
                Explore Bikes <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="gap-2 border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white dark:border-white/30 dark:bg-transparent dark:hover:bg-white/10"
            >
              <Link href="/contact">
                <CalendarCheck className="size-4" /> Book Test Ride
              </Link>
            </Button>
          </div>
        </FadeIn>

        <FadeIn
          inView={false}
          delay={0.4}
          className="flex w-full justify-center"
        >
          <HeroSearchPanel />
        </FadeIn>

        <FadeIn inView={false} delay={0.5}>
          <HeroStats />
        </FadeIn>
      </div>
    </section>
  );
}
