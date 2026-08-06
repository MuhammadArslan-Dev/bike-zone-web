import type { QuizAnswers } from "@/constants/quiz";
import type { Motorcycle } from "@/types";

const BUDGET_RANGES: Record<string, [number, number]> = {
  "under-2000": [0, 2000],
  "2000-5000": [2000, 5000],
  "5000-10000": [5000, 10000],
  "10000-plus": [10000, Infinity],
};

const EXPERIENCE_CC_RANGES: Record<string, [number, number]> = {
  beginner: [0, 150],
  intermediate: [125, 250],
  expert: [200, Infinity],
};

const USAGE_CATEGORY_HINTS: Record<string, string[]> = {
  commute: ["Commuter", "Scooter"],
  weekend: ["Naked", "Cruiser"],
  touring: ["Cruiser", "Touring"],
  track: ["Superbike", "Naked"],
};

function scoreBike(bike: Motorcycle, answers: QuizAnswers): number {
  let score = 0;

  if (answers.style && bike.category === answers.style) {
    score += 4;
  }

  if (answers.budget) {
    const [min, max] = BUDGET_RANGES[answers.budget] ?? [0, Infinity];
    if (bike.price >= min && bike.price <= max) score += 3;
  }

  if (answers.experience) {
    const [min, max] = EXPERIENCE_CC_RANGES[answers.experience] ?? [
      0,
      Infinity,
    ];
    if (bike.cc >= min && bike.cc <= max) score += 2;
  }

  if (answers.usage) {
    const hints = USAGE_CATEGORY_HINTS[answers.usage] ?? [];
    if (hints.includes(bike.category)) score += 1;
  }

  return score;
}

export function getRecommendedBikes(
  bikes: Motorcycle[],
  answers: QuizAnswers,
  count = 3,
): Motorcycle[] {
  return [...bikes]
    .map((bike) => ({ bike, score: scoreBike(bike, answers) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(({ bike }) => bike);
}
