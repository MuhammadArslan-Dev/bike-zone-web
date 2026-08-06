import { Check } from "lucide-react";

export function FeaturesList({ features }: { features: string[] }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {features.map((feature) => (
        <li key={feature} className="flex items-start gap-2.5 text-sm">
          <Check className="text-primary mt-0.5 size-4 shrink-0" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}
