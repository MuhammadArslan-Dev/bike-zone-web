"use client";

import {
  Bell,
  Bike,
  Download,
  Gauge,
  Heart,
  Home,
  Loader2,
  ShieldCheck,
  Star,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { ScrollReveal } from "@/components/motion/scroll-reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Chip } from "@/components/ui/chip";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Caption,
  Display,
  Eyebrow,
  GradientText,
  Lead,
  Muted,
} from "@/components/ui/typography";
import { cn } from "@/lib/utils";

function Section({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-border/60 py-section-sm border-t first:border-t-0 first:pt-0">
      <div className="mb-8 max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="font-heading mt-2 text-3xl font-bold tracking-tight">
          {title}
        </h2>
        {description && <Muted className="mt-2">{description}</Muted>}
      </div>
      {children}
    </section>
  );
}

function Swatch({ label, className }: { label: string; className: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className={cn("h-16 w-full rounded-lg", className)} />
      <Caption>{label}</Caption>
    </div>
  );
}

export function DesignSystemShowcase() {
  const [modalOpen, setModalOpen] = useState(false);
  const [chips, setChips] = useState([
    "Superbike",
    "Cruiser",
    "Adventure",
    "Café Racer",
  ]);
  const [selectedChip, setSelectedChip] = useState("Superbike");

  return (
    <div className="max-w-8xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-16 max-w-2xl">
        <Eyebrow>Internal reference</Eyebrow>
        <Display className="mt-2 text-4xl sm:text-5xl lg:text-6xl">
          Design System
        </Display>
        <Lead className="mt-4">
          Every primitive, token, and motion pattern that BikeZone&apos;s pages
          are built from — in both light and dark.
        </Lead>
      </div>

      {/* Typography */}
      <Section
        eyebrow="01"
        title="Typography"
        description="Unbounded for display and headings, Inter for body copy."
      >
        <div className="flex flex-col gap-6">
          <Eyebrow>Eyebrow label</Eyebrow>
          <Display>The ride of a lifetime.</Display>
          <h2 className="text-3xl font-bold">Heading two</h2>
          <h3 className="text-2xl font-semibold">Heading three</h3>
          <h4 className="text-xl font-semibold">Heading four</h4>
          <Lead>
            Lead paragraph — used for intros beneath a section heading, set in
            Inter at a relaxed line height.
          </Lead>
          <p className="max-w-xl leading-relaxed">
            Body copy is set in Inter for maximum legibility across every screen
            size, with a comfortable measure for long-form reading.
          </p>
          <Muted>Muted text for secondary detail and metadata.</Muted>
          <Caption>Caption / eyebrow-style micro label</Caption>
          <GradientText className="text-3xl">Gradient heading</GradientText>
        </div>
      </Section>

      {/* Buttons */}
      <Section eyebrow="02" title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" aria-label="Favorite">
            <Heart />
          </Button>
          <Button disabled>
            <Loader2 className="animate-spin" />
            Loading
          </Button>
        </div>
      </Section>

      {/* Cards */}
      <Section eyebrow="03" title="Cards">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle>Panigale V4</CardTitle>
              <CardDescription>Superbike · 2026</CardDescription>
              <CardAction>
                <Badge>New</Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                214 hp, 998cc V4 engine with race-derived aerodynamics.
              </p>
            </CardContent>
            <CardFooter className="justify-between">
              <span className="font-heading font-semibold">$28,500</span>
              <Button size="sm" variant="outline">
                Details
              </Button>
            </CardFooter>
          </Card>

          <Card size="sm">
            <CardHeader>
              <CardTitle>Compact card</CardTitle>
              <CardDescription>Tighter internal spacing</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Uses the <code>size=&quot;sm&quot;</code> variant for denser
                layouts like sidebars or comparison tables.
              </p>
            </CardContent>
          </Card>

          <GlassCard>
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-primary size-5" />
              <span className="font-heading font-semibold">Glassmorphism</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Frosted, translucent surface — designed to sit on top of hero
              imagery or gradient backgrounds.
            </p>
          </GlassCard>
        </div>
      </Section>

      {/* Inputs */}
      <Section eyebrow="04" title="Inputs">
        <div className="grid max-w-3xl gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="ds-name">Full name</Label>
            <Input id="ds-name" placeholder="John Doe" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="ds-model">Preferred model</Label>
            <Select defaultValue="panigale">
              <SelectTrigger id="ds-model" className="w-full">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="panigale">Panigale V4</SelectItem>
                <SelectItem value="diavel">Diavel V4</SelectItem>
                <SelectItem value="monster">Monster</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="ds-message">Message</Label>
            <Textarea
              id="ds-message"
              placeholder="Tell us what you're looking for…"
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="ds-newsletter" defaultChecked />
            <Label htmlFor="ds-newsletter">Subscribe to newsletter</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="ds-test-ride" />
            <Label htmlFor="ds-test-ride">Notify me for test rides</Label>
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label>Financing preference</Label>
            <RadioGroup defaultValue="lease" className="flex gap-6">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="cash" id="ds-cash" />
                <Label htmlFor="ds-cash">Cash</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="lease" id="ds-lease" />
                <Label htmlFor="ds-lease">Lease</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="finance" id="ds-finance" />
                <Label htmlFor="ds-finance">Finance</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </Section>

      {/* Badges */}
      <Section eyebrow="05" title="Badges">
        <div className="flex flex-wrap gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Sold out</Badge>
          <Badge className="gap-1">
            <Star className="size-3" /> Featured
          </Badge>
        </div>
      </Section>

      {/* Chips */}
      <Section
        eyebrow="06"
        title="Chips"
        description="Interactive filter chips with selection state and optional removal."
      >
        <div className="flex flex-wrap gap-3">
          {chips.map((chip) => (
            <Chip
              key={chip}
              selected={selectedChip === chip}
              onClick={() => setSelectedChip(chip)}
              onRemove={() => setChips((c) => c.filter((x) => x !== chip))}
            >
              {chip}
            </Chip>
          ))}
        </div>
      </Section>

      {/* Modals & Dialogs */}
      <Section
        eyebrow="07"
        title="Modals & Dialogs"
        description="Modal is a preset confirm/alert pattern; Dialog is for fully custom content."
      >
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setModalOpen(true)}>Open modal</Button>
          <Modal
            open={modalOpen}
            onOpenChange={setModalOpen}
            title="Confirm test ride booking"
            description="We'll reserve a Panigale V4 for Saturday at 10:00 AM."
            confirmLabel="Confirm booking"
            onConfirm={() => toast.success("Test ride confirmed")}
          />

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Vehicle specifications</DialogTitle>
                <DialogDescription>
                  Panigale V4 — full technical breakdown.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <span className="text-muted-foreground">Engine</span>
                <span>1103cc V4</span>
                <span className="text-muted-foreground">Power</span>
                <span>214 hp</span>
                <span className="text-muted-foreground">Weight</span>
                <span>198 kg</span>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </Section>

      {/* Tooltips */}
      <Section eyebrow="08" title="Tooltips">
        <div className="flex flex-wrap gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Notifications">
                <Bell />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Notifications</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Performance">
                <Gauge />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Top speed: 274 km/h</TooltipContent>
          </Tooltip>
        </div>
      </Section>

      {/* Breadcrumb */}
      <Section eyebrow="09" title="Breadcrumb">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="flex items-center gap-1">
                <Home className="size-3.5" /> Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/collection">Collection</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Panigale V4</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Section>

      {/* Tabs */}
      <Section eyebrow="10" title="Tabs">
        <Tabs defaultValue="overview" className="max-w-xl">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="specs">Specs</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="text-muted-foreground pt-4">
            The most powerful production Ducati ever built, engineered for the
            track and refined for the road.
          </TabsContent>
          <TabsContent value="specs" className="text-muted-foreground pt-4">
            1103cc V4 · 214 hp · 198 kg · 274 km/h top speed.
          </TabsContent>
          <TabsContent value="reviews" className="text-muted-foreground pt-4">
            &quot;Unrivalled precision and presence.&quot; — Rider Monthly
          </TabsContent>
        </Tabs>
      </Section>

      {/* Accordion */}
      <Section eyebrow="11" title="Accordion">
        <Accordion type="single" collapsible className="max-w-xl">
          <AccordionItem value="financing">
            <AccordionTrigger>Do you offer financing?</AccordionTrigger>
            <AccordionContent>
              Yes — cash, lease, and finance plans are available on every model
              in our collection.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="warranty">
            <AccordionTrigger>What warranty is included?</AccordionTrigger>
            <AccordionContent>
              Every new motorcycle ships with a 2-year manufacturer warranty,
              extendable up to 4 years.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="trade-in">
            <AccordionTrigger>Can I trade in my current bike?</AccordionTrigger>
            <AccordionContent>
              Absolutely — our team appraises trade-ins on-site during your test
              ride appointment.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Section>

      {/* Toast */}
      <Section eyebrow="12" title="Toast">
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => toast.success("Booking confirmed")}>
            Success
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.info("Your quote was saved")}
          >
            Info
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.warning("Financing offer expires soon")}
          >
            Warning
          </Button>
          <Button
            variant="destructive"
            onClick={() => toast.error("Unable to reserve this model")}
          >
            Error
          </Button>
        </div>
      </Section>

      {/* Loading & Skeleton */}
      <Section eyebrow="13" title="Loading & Skeleton">
        <div className="flex flex-wrap items-center gap-8">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
          <Spinner label="Fetching inventory…" />
        </div>
        <div className="mt-6 flex max-w-sm flex-col gap-3">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </Section>

      {/* Animations */}
      <Section
        eyebrow="14"
        title="Animations"
        description="Scroll down to trigger the reveal — powered by GSAP ScrollTrigger."
      >
        <ScrollReveal className="grid gap-4 sm:grid-cols-3">
          {["Precision", "Power", "Prestige"].map((word) => (
            <Card key={word}>
              <CardContent className="py-6 text-center">
                <Bike className="text-primary mx-auto mb-2 size-6" />
                <p className="font-heading font-semibold">{word}</p>
              </CardContent>
            </Card>
          ))}
        </ScrollReveal>
      </Section>

      {/* Spacing */}
      <Section
        eyebrow="15"
        title="Spacing system"
        description="Base 4px scale plus semantic section spacing tokens."
      >
        <div className="flex flex-wrap items-end gap-6">
          {[1, 2, 4, 6, 8, 12, 16, 24].map((step) => (
            <div key={step} className="flex flex-col items-center gap-2">
              <div
                className="bg-primary rounded"
                style={{ width: step * 4, height: step * 4 }}
              />
              <Caption>{step * 4}px</Caption>
            </div>
          ))}
        </div>
      </Section>

      {/* Shadows */}
      <Section eyebrow="16" title="Shadows">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <div className="bg-card shadow-elevation-1 rounded-lg p-6 text-center text-sm">
            elevation-1
          </div>
          <div className="bg-card shadow-elevation-2 rounded-lg p-6 text-center text-sm">
            elevation-2
          </div>
          <div className="bg-card shadow-elevation-3 rounded-lg p-6 text-center text-sm">
            elevation-3
          </div>
          <div className="bg-card shadow-elevation-4 rounded-lg p-6 text-center text-sm">
            elevation-4
          </div>
          <div className="bg-card shadow-glow-primary rounded-lg p-6 text-center text-sm">
            glow-primary
          </div>
          <div className="bg-card shadow-glow-accent rounded-lg p-6 text-center text-sm">
            glow-accent
          </div>
        </div>
      </Section>

      {/* Hover effects */}
      <Section eyebrow="17" title="Hover effects">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="bg-card hover-lift rounded-lg p-6 text-center text-sm">
            hover-lift
          </div>
          <div className="bg-card hover-glow rounded-lg p-6 text-center text-sm">
            hover-glow
          </div>
          <div className="flex items-center justify-center p-6 text-sm">
            <span className="link-underline cursor-pointer">
              link-underline
            </span>
          </div>
        </div>
      </Section>

      {/* Gradients */}
      <Section eyebrow="18" title="Premium gradients">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Swatch label="bg-gradient-primary" className="bg-gradient-primary" />
          <Swatch label="bg-gradient-dusk" className="bg-gradient-dusk" />
          <Swatch label="bg-gradient-noir" className="bg-gradient-noir" />
          <Swatch
            label="bg-radial-glow"
            className="bg-radial-glow border-border border"
          />
        </div>
      </Section>

      {/* Theme */}
      <Section
        eyebrow="19"
        title="Dark & light theme"
        description="Toggle the theme switch in the navbar — every token above adapts automatically."
      >
        <div className="flex items-center gap-3">
          <Download className="text-muted-foreground size-4" />
          <Muted>
            Colors, shadows, and gradients are all driven by CSS variables in
            <code className="mx-1">globals.css</code>, so no component needs
            per-theme overrides.
          </Muted>
        </div>
      </Section>
    </div>
  );
}
