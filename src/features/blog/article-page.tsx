import { ArrowLeft, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { BlogNewsletter } from "@/features/blog/blog-newsletter";
import { RelatedPosts } from "@/features/blog/related-posts";
import { categoryToSlug, formatReadTime, getRelatedPosts } from "@/lib/blog";
import type { BlogPost } from "@/types";
import { siteConfig } from "@/constants/site";

export function ArticlePage({ post }: { post: BlogPost }) {
  const related = getRelatedPosts(post);
  const publishedLabel = new Date(post.publishedDate).toLocaleDateString(
    "en-US",
    { month: "long", day: "numeric", year: "numeric" },
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishedDate,
    author: { "@type": "Person", name: post.author.name },
    publisher: { "@type": "Organization", name: siteConfig.name },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/blog"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
      >
        <ArrowLeft className="size-4" />
        Back to Blog
      </Link>

      <div className="mt-6">
        <Link href={`/blog/category/${categoryToSlug(post.category)}`}>
          <Badge>{post.category}</Badge>
        </Link>
        <h1 className="font-heading mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          {post.title}
        </h1>

        <div className="mt-5 flex items-center gap-3">
          <div className="relative size-10 shrink-0 overflow-hidden rounded-full">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-medium">{post.author.name}</p>
            <p className="text-muted-foreground flex items-center gap-2 text-xs">
              {publishedLabel}
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="size-3.5" />
                {formatReadTime(post.readTimeMinutes)}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="relative mt-8 aspect-video overflow-hidden rounded-xl">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority
          sizes="(min-width: 1024px) 48rem, 90vw"
          className="object-cover"
        />
      </div>

      <div className="mt-8 flex flex-col gap-5">
        {post.content.map((paragraph, index) => (
          <p key={index} className="text-foreground/90 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="border-border mt-10 flex flex-wrap gap-2 border-t pt-6">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-16">
        <RelatedPosts posts={related} />
      </div>

      <div className="mt-16">
        <BlogNewsletter />
      </div>
    </div>
  );
}
