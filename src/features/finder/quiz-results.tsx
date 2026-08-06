"use client";

import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/typography";
import { FEATURED_MOTORCYCLES } from "@/constants/motorcycles";
import type { QuizAnswers } from "@/constants/quiz";
import { BikeCard } from "@/features/home/bike-card";
import { getRecommendedBikes } from "@/lib/quiz-matcher";

export function QuizResults({
  answers,
  onRestart,
}: {
  answers: QuizAnswers;
  onRestart: () => void;
}) {
  const recommendations = getRecommendedBikes(FEATURED_MOTORCYCLES, answers, 3);

  return (
    <div>
      <Eyebrow>Your matches</Eyebrow>
      <h1 className="font-heading mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        Bikes picked for you.
      </h1>
      <p className="text-muted-foreground mt-2 max-w-xl">
        Based on your answers, here are the bikes from our collection that fit
        you best.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((bike, index) => (
          <BikeCard key={bike.id} bike={bike} priority={index === 0} />
        ))}
      </div>

      <Button variant="outline" onClick={onRestart} className="mt-10 gap-2">
        <RotateCcw className="size-4" /> Retake the quiz
      </Button>
    </div>
  );
}
