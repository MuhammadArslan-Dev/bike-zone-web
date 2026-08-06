import { BLOG_CATEGORIES, BLOG_POSTS } from "@/constants/blog";
import type { BlogCategory, BlogPost } from "@/types";

export function categoryToSlug(category: BlogCategory): string {
  return category
    .toLowerCase()
    .replace(/\s*&\s*/g, "-")
    .replace(/\s+/g, "-");
}

export function slugToCategory(slug: string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find((category) => categoryToSlug(category) === slug);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return BLOG_POSTS.filter((post) => post.category === category);
}

export function sortByNewest(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(
    (a, b) =>
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime(),
  );
}

const RELATED_COUNT = 3;

export function getRelatedPosts(post: BlogPost): BlogPost[] {
  const others = BLOG_POSTS.filter((item) => item.id !== post.id);

  const scored = others.map((candidate) => {
    const sharedTags = candidate.tags.filter((tag) =>
      post.tags.includes(tag),
    ).length;
    const sameCategory = candidate.category === post.category ? 1 : 0;
    return { candidate, score: sharedTags * 2 + sameCategory };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, RELATED_COUNT)
    .map((item) => item.candidate);
}

export function searchPosts(query: string): BlogPost[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return sortByNewest(BLOG_POSTS);

  return sortByNewest(
    BLOG_POSTS.filter(
      (post) =>
        post.title.toLowerCase().includes(needle) ||
        post.excerpt.toLowerCase().includes(needle) ||
        post.tags.some((tag) => tag.toLowerCase().includes(needle)),
    ),
  );
}

export function formatReadTime(minutes: number): string {
  return `${minutes} min read`;
}
