import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BLOG_CATEGORIES } from "@/constants/blog";
import { BlogListing } from "@/features/blog/blog-listing";
import {
  categoryToSlug,
  getPostsByCategory,
  slugToCategory,
  sortByNewest,
} from "@/lib/blog";

type Props = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return BLOG_CATEGORIES.map((category) => ({
    category: categoryToSlug(category),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = slugToCategory(slug);

  if (!category) {
    return { title: "Category Not Found" };
  }

  return {
    title: `${category} — Blog`,
    description: `Articles about ${category.toLowerCase()} from the BikeZone team.`,
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const category = slugToCategory(slug);

  if (!category) {
    notFound();
  }

  const posts = sortByNewest(getPostsByCategory(category));

  return (
    <BlogListing
      posts={posts}
      activeCategory={category}
      eyebrow="The BikeZone Journal"
      title={category}
      description={`Every article we've published about ${category.toLowerCase()}.`}
    />
  );
}
