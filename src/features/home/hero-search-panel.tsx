"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BRAND_OPTIONS,
  CATEGORY_OPTIONS,
  PRICE_OPTIONS,
} from "@/constants/filters";

const searchSchema = z.object({
  brand: z.string().optional(),
  category: z.string().optional(),
  price: z.string().optional(),
});

type SearchValues = z.infer<typeof searchSchema>;

const fieldTriggerClasses =
  "w-full border-white/15 bg-white/5 text-white data-placeholder:text-white/50 hover:bg-white/10 focus-visible:ring-white/30 [&_svg]:text-white/60";

function SearchField({
  label,
  placeholder,
  options,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  options: readonly string[];
  value: string | undefined;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium tracking-wide text-white/70 uppercase">
        {label}
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={fieldTriggerClasses}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function HeroSearchPanel() {
  const { control, handleSubmit } = useForm<SearchValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: { brand: "", category: "", price: "" },
  });

  const onSubmit = (values: SearchValues) => {
    const filters = [values.brand, values.category, values.price].filter(
      Boolean,
    );

    toast.success(
      filters.length ? "Showing matching bikes" : "Showing all bikes",
      {
        description: filters.length ? filters.join(" · ") : undefined,
      },
    );
  };

  return (
    <GlassCard className="w-full max-w-4xl border-white/15 bg-white/8 p-4 sm:p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end lg:gap-3"
      >
        <Controller
          control={control}
          name="brand"
          render={({ field }) => (
            <SearchField
              label="Brand"
              placeholder="Any brand"
              options={BRAND_OPTIONS}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <SearchField
              label="Category"
              placeholder="Any category"
              options={CATEGORY_OPTIONS}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="price"
          render={({ field }) => (
            <SearchField
              label="Price"
              placeholder="Any price"
              options={PRICE_OPTIONS}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Button type="submit" size="lg" className="gap-2 lg:mb-px">
          <Search className="size-4" />
          Search
        </Button>
      </form>
    </GlassCard>
  );
}
