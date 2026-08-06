"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { QUIZ_STEPS, type QuizAnswers } from "@/constants/quiz";
import { QuizOptionCard } from "@/features/finder/quiz-option-card";
import { QuizResults } from "@/features/finder/quiz-results";
import { cn } from "@/lib/utils";

export function QuizWizard() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const isResults = stepIndex >= QUIZ_STEPS.length;
  const currentStep = QUIZ_STEPS[stepIndex];

  function handleSelect(value: string) {
    if (!currentStep) return;
    setAnswers((prev) => ({ ...prev, [currentStep.id]: value }));
    window.setTimeout(() => {
      setStepIndex((index) => index + 1);
    }, 300);
  }

  function handleBack() {
    setStepIndex((index) => Math.max(0, index - 1));
  }

  function handleRestart() {
    setAnswers({});
    setStepIndex(0);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      {!isResults && (
        <div className="mb-10 flex items-center gap-2">
          {QUIZ_STEPS.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors duration-300",
                index <= stepIndex ? "bg-primary" : "bg-muted",
              )}
            />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {isResults ? (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <QuizResults answers={answers} onRestart={handleRestart} />
          </motion.div>
        ) : (
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {stepIndex > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="mb-4 gap-1.5"
              >
                <ArrowLeft className="size-4" /> Back
              </Button>
            )}
            <p className="text-primary text-sm font-semibold tracking-wide uppercase">
              Step {stepIndex + 1} of {QUIZ_STEPS.length}
            </p>
            <h1 className="font-heading mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              {currentStep.question}
            </h1>
            <p className="text-muted-foreground mt-2">{currentStep.subtitle}</p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {currentStep.options.map((option) => (
                <QuizOptionCard
                  key={option.value}
                  icon={option.icon}
                  label={option.label}
                  description={option.description}
                  selected={answers[currentStep.id] === option.value}
                  onClick={() => handleSelect(option.value)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
