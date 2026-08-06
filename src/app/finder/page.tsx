import type { Metadata } from "next";

import { QuizWizard } from "@/features/finder/quiz-wizard";

export const metadata: Metadata = {
  title: "Bike Finder Quiz",
  description:
    "Answer a few quick questions and we'll match you with the perfect motorcycle from our collection.",
};

export default function FinderPage() {
  return <QuizWizard />;
}
