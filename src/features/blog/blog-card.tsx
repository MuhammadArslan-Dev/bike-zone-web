import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { formatReadTime } from "@/lib/blog";
import type { BlogPost } from "@/types";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bg-card shadow-elevation-1 ring-foreground/10 hover:shadow-elevation-3 flex h-full flex-col overflow-hidden rounded-xl ring-1 transition-shadow"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <Badge className="absolute top-3 left-3">{post.category}</Badge>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-heading text-lg font-bold text-balance">
          {post.title}
        </h3>
        <p className="text-muted-foreground line-clamp-2 flex-1 text-sm">
          {post.excerpt}
        </p>

        <div className="border-border flex items-center gap-3 border-t pt-3">
          <div className="relative size-8 shrink-0 overflow-hidden rounded-full">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium">{post.author.name}</p>
            <p className="text-muted-foreground truncate text-xs">
              {new Date(post.publishedDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}{" "}
              · {formatReadTime(post.readTimeMinutes)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
