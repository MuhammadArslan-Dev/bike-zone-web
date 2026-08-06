import type { Metadata } from "next";

import { BLOG_POSTS } from "@/constants/blog";
import { BlogListing } from "@/features/blog/blog-listing";
import { sortByNewest } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Riding tips, maintenance guides, buying advice, gear reviews, and news from the BikeZone team.",
};

export default function Blog() {
  return <BlogListing posts={sortByNewest(BLOG_POSTS)} />;
}
