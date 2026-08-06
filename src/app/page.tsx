import { BikeSoundPreview } from "@/features/home/bike-sound-preview";
import { BrandShowcase } from "@/features/home/brand-showcase";
import { DealerLocator } from "@/features/home/dealer-locator";
import { FeaturedBikes } from "@/features/home/featured-bikes";
import { GalleryPreview } from "@/features/home/gallery-preview";
import { Hero } from "@/features/home/hero";
import { LiveStock } from "@/features/home/live-stock";
import { QuickActions } from "@/features/home/quick-actions";
import { TopBikes } from "@/features/home/top-bikes";
import { TrustBadges } from "@/features/home/trust-badges";
import { UpcomingLaunches } from "@/features/home/upcoming-launches";
import { VideoReviewsPreview } from "@/features/home/video-reviews-preview";
import { VirtualShowroom } from "@/features/home/virtual-showroom";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandShowcase />
      <FeaturedBikes />
      <QuickActions />

      <section className="max-w-8xl py-section-sm mx-auto grid grid-cols-1 gap-4 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <UpcomingLaunches />
        <GalleryPreview />
        <VideoReviewsPreview />
        <BikeSoundPreview />
      </section>

      <section className="max-w-8xl py-section-sm mx-auto grid grid-cols-1 gap-4 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <VirtualShowroom />
        <LiveStock />
        <DealerLocator />
        <TopBikes />
      </section>

      <TrustBadges />
    </>
  );
}
