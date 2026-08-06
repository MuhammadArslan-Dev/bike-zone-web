import { Mail } from "lucide-react";

import { GlassCard } from "@/components/ui/glass-card";
import { NewsletterForm } from "@/components/layout/newsletter-form";

export function BlogNewsletter() {
  return (
    <GlassCard className="flex flex-col items-center gap-4 p-8 text-center sm:p-12">
      <span className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full">
        <Mail className="size-6" />
      </span>
      <div>
        <h2 className="font-heading text-2xl font-bold">Never miss a story.</h2>
        <p className="text-muted-foreground mt-2 max-w-md">
          Get new riding tips, maintenance guides, and launch news delivered
          straight to your inbox.
        </p>
      </div>
      <div className="w-full max-w-sm">
        <NewsletterForm />
      </div>
    </GlassCard>
  );
}
