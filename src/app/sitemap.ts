import type { MetadataRoute } from "next";

import { BLOG_CATEGORIES, BLOG_POSTS } from "@/constants/blog";
import { siteConfig } from "@/constants/site";
import { categoryToSlug } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const blogListing: MetadataRoute.Sitemap = [
    {
      url: `${siteConfig.url}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  const blogCategories: MetadataRoute.Sitemap = BLOG_CATEGORIES.map(
    (category) => ({
      url: `${siteConfig.url}/blog/category/${categoryToSlug(category)}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    }),
  );

  const blogArticles: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.publishedDate),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...blogListing,
    ...blogCategories,
    ...blogArticles,
  ];
}
