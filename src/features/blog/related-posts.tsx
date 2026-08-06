import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { BlogCard } from "@/features/blog/blog-card";
import type { BlogPost } from "@/types";

export function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold">Related articles</h2>
      <ScrollReveal className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </ScrollReveal>
    </div>
  );
}
