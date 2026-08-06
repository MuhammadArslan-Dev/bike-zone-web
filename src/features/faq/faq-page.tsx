"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { FadeIn } from "@/components/motion/fade-in";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Eyebrow } from "@/components/ui/typography";
import { FAQ_CATEGORIES, FAQS } from "@/constants/faq";

export function FaqPage() {
  const [query, setQuery] = useState("");

  const grouped = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filtered = needle
      ? FAQS.filter(
          (faq) =>
            faq.question.toLowerCase().includes(needle) ||
            faq.answer.toLowerCase().includes(needle),
        )
      : FAQS;

    return FAQ_CATEGORIES.map((category) => ({
      category,
      items: filtered.filter((faq) => faq.category === category),
    })).filter((group) => group.items.length > 0);
  }, [query]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <FadeIn inView={false}>
        <div className="max-w-2xl">
          <Eyebrow>Support</Eyebrow>
          <h1 className="font-heading mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently asked questions.
          </h1>
          <p className="text-muted-foreground mt-2">
            Can&apos;t find what you&apos;re looking for? Reach out through our
            Contact page.
          </p>
        </div>

        <div className="relative mt-8">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            type="search"
            placeholder="Search questions..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-11 pl-10"
            aria-label="Search FAQs"
          />
        </div>
      </FadeIn>

      <div className="mt-10 flex flex-col gap-10">
        {grouped.length === 0 ? (
          <p className="text-muted-foreground text-center">
            No questions match &ldquo;{query}&rdquo;.
          </p>
        ) : (
          grouped.map((group) => (
            <FadeIn key={group.category}>
              <h2 className="font-heading text-xl font-bold">
                {group.category}
              </h2>
              <Accordion type="single" collapsible className="mt-3">
                {group.items.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </FadeIn>
          ))
        )}
      </div>
    </div>
  );
}
