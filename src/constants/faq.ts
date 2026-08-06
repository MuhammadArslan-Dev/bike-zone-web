export type FaqCategory =
  | "Buying & Test Rides"
  | "Financing & EMI"
  | "Service & Warranty"
  | "Delivery & Ownership";

export type FaqItem = {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
};

export const FAQ_CATEGORIES: FaqCategory[] = [
  "Buying & Test Rides",
  "Financing & EMI",
  "Service & Warranty",
  "Delivery & Ownership",
];

export const FAQS: FaqItem[] = [
  {
    id: "test-ride-required",
    category: "Buying & Test Rides",
    question: "Can I test ride a bike before buying?",
    answer:
      'Yes — use the "Book Test Ride" tile on our homepage or the button on any bike\'s Quick View to schedule one at your nearest branch. No obligation to buy.',
  },
  {
    id: "bike-finder-quiz",
    category: "Buying & Test Rides",
    question: "How does the Bike Finder Quiz work?",
    answer:
      "Answer four quick questions about your riding style, budget, experience, and intended use — we match you against our current lineup and rank the best fits.",
  },
  {
    id: "compare-bikes",
    category: "Buying & Test Rides",
    question: "Can I compare multiple bikes side-by-side?",
    answer:
      "Yes — tap the compare icon on up to 3 bike cards and a comparison bar will appear letting you view full specs side-by-side on our Compare page.",
  },
  {
    id: "trade-ins",
    category: "Buying & Test Rides",
    question: "Do you offer trade-ins?",
    answer:
      "Bring your current bike to any branch for a free valuation. Trade-in value can be applied directly toward your down payment on a new bike.",
  },
  {
    id: "financing-how",
    category: "Financing & EMI",
    question: "How does BikeZone's financing work?",
    answer:
      "We partner with a panel of lenders on our Financing page. Estimate your monthly payment with the EMI Calculator, then apply for pre-qualification with your preferred lender.",
  },
  {
    id: "emi-vs-apply",
    category: "Financing & EMI",
    question:
      "What's the difference between the EMI calculator and applying for financing?",
    answer:
      "The EMI calculator gives an instant, informal estimate of your monthly payment. Applying for pre-qualification is a real (soft-check) application that gets you an actual rate from one of our lending partners.",
  },
  {
    id: "credit-score",
    category: "Financing & EMI",
    question: "Will applying affect my credit score?",
    answer:
      "No — pre-qualification is a soft credit check only and never affects your credit score. A hard check only happens if you proceed to finalize a loan.",
  },
  {
    id: "early-payoff",
    category: "Financing & EMI",
    question: "Can I pay off my loan early?",
    answer:
      "Yes, every lender on our panel allows early payoff with no prepayment penalty. Contact your lender directly or ask our finance team for help.",
  },
  {
    id: "routine-service",
    category: "Service & Warranty",
    question: "What's included in a routine service?",
    answer:
      "It depends on the package — our Essential, Complete, and Premium maintenance packages each cover progressively more, from an oil change up to a full suspension and alignment check. See the Service Center page for details.",
  },
  {
    id: "book-service",
    category: "Service & Warranty",
    question: "How do I book a service appointment?",
    answer:
      'Head to the Service Center page, pick the "Book Service" tab, choose your bike, service type, branch, and preferred date — you\'ll get a confirmation instantly.',
  },
  {
    id: "warranty-coverage",
    category: "Service & Warranty",
    question: "What does my warranty cover?",
    answer:
      "Every new bike includes a 2-year powertrain warranty, 1-year electrical and paint/finish warranty, and a year of complimentary roadside assistance. Full details are on the Service Center's Warranty tab.",
  },
  {
    id: "non-bikezone-service",
    category: "Service & Warranty",
    question: "Can I service my bike somewhere other than BikeZone?",
    answer:
      "Routine maintenance elsewhere won't void your warranty as long as genuine or equivalent parts are used and records are kept. Warranty repairs themselves must be done at a BikeZone branch.",
  },
  {
    id: "delivery-time",
    category: "Delivery & Ownership",
    question: "How long does delivery take after purchase?",
    answer:
      "Most in-stock bikes are ready for pickup within 2-3 business days. Check the Live Stock tile on our homepage for real-time availability before you buy.",
  },
  {
    id: "accessories-delivery",
    category: "Delivery & Ownership",
    question: "Do you deliver accessories separately from bikes?",
    answer:
      "Yes — enquire about any item in our Accessories Store and our team will confirm stock and arrange pickup or delivery independently of any bike purchase.",
  },
  {
    id: "register-warranty",
    category: "Delivery & Ownership",
    question: "How do I register my bike's warranty?",
    answer:
      'Visit the Service Center page\'s Warranty tab and click "Register Your Bike" — it takes less than a minute and activates your coverage immediately.',
  },
  {
    id: "post-delivery-issue",
    category: "Delivery & Ownership",
    question: "What if I have an issue after delivery?",
    answer:
      "Contact your branch directly or book a service appointment and flag it as a warranty repair — our team will prioritize it and make it right.",
  },
];
