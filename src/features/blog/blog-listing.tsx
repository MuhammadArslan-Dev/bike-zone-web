"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { FadeIn } from "@/components/motion/fade-in";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Chip } from "@/components/ui/chip";
import { Input } from "@/components/ui/input";
import { Eyebrow } from "@/components/ui/typography";
import { BLOG_CATEGORIES } from "@/constants/blog";
import { BlogCard } from "@/features/blog/blog-card";
import { BlogNewsletter } from "@/features/blog/blog-newsletter";
import { categoryToSlug } from "@/lib/blog";
import type { BlogCategory, BlogPost } from "@/types";

export function BlogListing({
  posts,
  activeCategory,
  eyebrow = "The BikeZone Journal",
  title = "Stories for the ride ahead.",
  description = "Riding tips, maintenance guides, buying advice, gear reviews, and news from the BikeZone team.",
}: {
  posts: BlogPost[];
  activeCategory?: BlogCategory;
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return posts;
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(needle) ||
        post.excerpt.toLowerCase().includes(needle) ||
        post.tags.some((tag) => tag.toLowerCase().includes(needle)),
    );
  }, [posts, query]);

  return (
    <div className="max-w-8xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <FadeIn inView={false}>
        <div className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="font-heading mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="text-muted-foreground mt-2">{description}</p>
        </div>

        <div className="relative mt-8 max-w-md">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            type="search"
            placeholder="Search articles..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-11 pl-10"
            aria-label="Search blog articles"
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Chip selected={!activeCategory} asChild>
            <Link href="/blog">All Posts</Link>
          </Chip>
          {BLOG_CATEGORIES.map((category) => (
            <Chip key={category} selected={activeCategory === category} asChild>
              <Link href={`/blog/category/${categoryToSlug(category)}`}>
                {category}
              </Link>
            </Chip>
          ))}
        </div>
      </FadeIn>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground mt-16 text-center">
          No articles match &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <ScrollReveal
          key={query}
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </ScrollReveal>
      )}

      <div className="mt-16">
        <BlogNewsletter />
      </div>
    </div>
  );
}
