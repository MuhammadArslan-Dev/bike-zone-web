import {
  Bike,
  Compass,
  DollarSign,
  Gauge,
  MapPin,
  Timer,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import type { ComponentType } from "react";

export type QuizOption = {
  value: string;
  label: string;
  description?: string;
  icon: ComponentType<{ className?: string }>;
};

export type QuizStepId = "experience" | "usage" | "budget" | "style";

export type QuizStep = {
  id: QuizStepId;
  question: string;
  subtitle: string;
  options: QuizOption[];
};

export const QUIZ_STEPS: QuizStep[] = [
  {
    id: "experience",
    question: "What's your riding experience?",
    subtitle: "This helps us match the right power and handling for you.",
    options: [
      {
        value: "beginner",
        label: "Beginner",
        description: "New to riding",
        icon: Users,
      },
      {
        value: "intermediate",
        label: "Intermediate",
        description: "A few years in the saddle",
        icon: Gauge,
      },
      {
        value: "expert",
        label: "Expert",
        description: "Seasoned rider",
        icon: Trophy,
      },
    ],
  },
  {
    id: "usage",
    question: "How will you mostly ride?",
    subtitle: "Your riding style shapes the ideal category.",
    options: [
      {
        value: "commute",
        label: "Daily Commute",
        description: "City streets, every day",
        icon: MapPin,
      },
      {
        value: "weekend",
        label: "Weekend Rides",
        description: "Fun trips with friends",
        icon: Compass,
      },
      {
        value: "touring",
        label: "Long-distance Touring",
        description: "Comfort over the miles",
        icon: Timer,
      },
      {
        value: "track",
        label: "Performance & Track",
        description: "Speed is the priority",
        icon: Zap,
      },
    ],
  },
  {
    id: "budget",
    question: "What's your budget?",
    subtitle: "We'll match bikes within your range.",
    options: [
      { value: "under-2000", label: "Under $2,000", icon: DollarSign },
      { value: "2000-5000", label: "$2,000 – $5,000", icon: DollarSign },
      { value: "5000-10000", label: "$5,000 – $10,000", icon: DollarSign },
      { value: "10000-plus", label: "$10,000+", icon: DollarSign },
    ],
  },
  {
    id: "style",
    question: "Pick your preferred style.",
    subtitle: "The look and feel that suits you best.",
    options: [
      {
        value: "Commuter",
        label: "Commuter",
        description: "Efficient & practical",
        icon: MapPin,
      },
      {
        value: "Naked",
        label: "Naked",
        description: "Bold & versatile",
        icon: Bike,
      },
      {
        value: "Cruiser",
        label: "Cruiser",
        description: "Relaxed & powerful",
        icon: Compass,
      },
      {
        value: "Superbike",
        label: "Superbike",
        description: "Pure performance",
        icon: Zap,
      },
      {
        value: "Scooter",
        label: "Scooter",
        description: "Light & nimble",
        icon: Gauge,
      },
    ],
  },
];

export type QuizAnswers = Partial<Record<QuizStepId, string>>;
