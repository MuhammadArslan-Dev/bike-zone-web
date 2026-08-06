import type { BlogCategory, BlogPost } from "@/types";

const IMG = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=1600&auto=format&fit=crop`;

const AVATAR = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=200&auto=format&fit=crop`;

const AUTHORS = {
  maya: {
    name: "Maya Chen",
    avatar: AVATAR("photo-1768244016593-8ca75b15bc92"),
  },
  jordan: {
    name: "Jordan Ellis",
    avatar: AVATAR("photo-1781935781399-9044dabd12db"),
  },
  sam: {
    name: "Sam Whitfield",
    avatar: AVATAR("photo-1758691030490-fe1cb6c972ce"),
  },
} as const;

export const BLOG_CATEGORIES: BlogCategory[] = [
  "Riding Tips",
  "Maintenance",
  "Buying Guides",
  "Gear & Reviews",
  "News",
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "essential-riding-tips",
    slug: "5-essential-riding-tips-for-new-motorcyclists",
    title: "5 Essential Riding Tips for New Motorcyclists",
    excerpt:
      "The habits that separate confident riders from nervous ones — and how to build them from day one.",
    content: [
      "Every experienced rider was a nervous beginner once. The difference between the riders who stick with it and the ones who quit after a scare usually comes down to a handful of habits built early, before bad habits have a chance to set in.",
      "Start with your eyes, not your hands. Where you look is where you go — target fixation is real, and it works both ways. Look through a turn toward your exit, not at the pothole or the car door you're worried about, and your bike will naturally track there.",
      "Cover your brakes in traffic. Keeping two fingers resting on the front brake lever whenever you're near intersections or slow-moving traffic shaves precious fractions of a second off your reaction time — often the difference between a close call and a real one.",
      "Practice slow-speed control in an empty parking lot before you ever need it in real traffic. U-turns, figure-eights, and stop-and-go balance at walking pace build the clutch and throttle feel that keeps you upright when a light turns red faster than expected.",
      "Finally, ride your own ride. It's tempting to keep pace with a faster friend or match traffic flow you're not ready for. The best riders we know at BikeZone all say the same thing: confidence comes from repetition at a pace that lets you actually think, not from forcing speed before the skills catch up.",
    ],
    category: "Riding Tips",
    coverImage: IMG("photo-1716741011671-db4d7c6a8293"),
    author: AUTHORS.jordan,
    publishedDate: "2026-01-12",
    readTimeMinutes: 5,
    tags: ["beginners", "safety", "riding skills"],
  },
  {
    id: "corner-like-a-pro",
    slug: "how-to-corner-like-a-pro-a-beginners-guide",
    title: "How to Corner Like a Pro: A Beginner's Guide",
    excerpt:
      "Cornering well is the single skill that unlocks the most confidence, the fastest. Here's how to build it safely.",
    content: [
      "Nothing separates a nervous rider from a confident one quite like a well-executed corner. It looks effortless when done right — smooth, unhurried, almost lazy — and that's exactly the feeling you're aiming for.",
      "The foundation is the same three-step sequence every time: slow, look, roll. Do your braking in a straight line before you tip in, turn your head and eyes toward the exit of the corner, then roll the throttle on smoothly and progressively once you're leaned over.",
      "Resist the urge to trail the brakes deep into the turn as a beginner. Get your speed sorted out before you commit to the lean — trying to scrub speed mid-corner is one of the most common ways new riders stand a bike up unexpectedly.",
      "Body position matters more than most new riders expect. Keep your inside arm relaxed, weight your outside footpeg slightly, and let your head lead your shoulders into the turn. A stiff, white-knuckled grip on the bars fights the bike's natural tendency to turn.",
      "Practice on a familiar, quiet road before pushing your pace anywhere unfamiliar. Cornering confidence is built in hundreds of unremarkable, well-executed turns — not in one dramatic one.",
    ],
    category: "Riding Tips",
    coverImage: IMG("photo-1761813163106-f9916da4ba43"),
    author: AUTHORS.jordan,
    publishedDate: "2026-02-03",
    readTimeMinutes: 6,
    tags: ["cornering", "technique", "riding skills"],
  },
  {
    id: "maintenance-checklist",
    slug: "the-ultimate-motorcycle-maintenance-checklist",
    title: "The Ultimate Motorcycle Maintenance Checklist",
    excerpt:
      "A print-it-out checklist covering everything worth checking between scheduled services.",
    content: [
      "Regular maintenance is the cheapest insurance policy your bike will ever have. Most of the checks below take less than fifteen minutes and need nothing more than the toolkit that came with your bike.",
      "Tires first: check pressure cold, before you've ridden, and inspect tread depth and wear pattern. Uneven wear on one side often points to a chain or suspension issue worth investigating further.",
      "Chain slack and lubrication next — a chain that's too tight wears out your sprockets fast, and one that's too loose can jump off entirely at the worst possible moment. Check your owner's manual for the correct slack measurement for your specific model.",
      "Brake fluid level and pad thickness, coolant level if your bike is liquid-cooled, and a visual check for any fluid leaks underneath the bike after it's been parked overnight — a fresh spot on the garage floor is always worth investigating immediately.",
      "Finally, lights, horn, and mirrors. It sounds basic, but a burnt-out brake light is one of the most common reasons riders get pulled over, and it's genuinely dangerous in traffic. Our Service Center can run through this entire checklist in one visit if you'd rather leave it to us.",
    ],
    category: "Maintenance",
    coverImage: IMG("photo-1636761358757-0a616eb9e17e"),
    author: AUTHORS.sam,
    publishedDate: "2026-01-25",
    readTimeMinutes: 7,
    tags: ["maintenance", "DIY", "checklist"],
  },
  {
    id: "chain-care-101",
    slug: "chain-care-101-cleaning-lubing-and-adjusting",
    title: "Chain Care 101: Cleaning, Lubing, and Adjusting",
    excerpt:
      "Your chain is the least glamorous part of your bike and the one most likely to leave you stranded if ignored.",
    content: [
      "A well-maintained chain can last well over 20,000 kilometers. A neglected one can strip its sprockets in a fraction of that — and unlike most maintenance, chain care genuinely rewards doing it more often rather than less.",
      "Clean before you lube, always. Spraying fresh lubricant onto a dirty, gritty chain just grinds an abrasive paste directly into your rollers. A dedicated chain cleaner and a soft brush, applied with the bike on a rear stand so the wheel spins freely, takes ten minutes.",
      "Lube while the chain is still slightly warm from riding, if possible — the lubricant penetrates the rollers and pins better than on a cold chain. Apply to the inside of the chain where it contacts the sprockets, not the outer plates, and let it sit for a few minutes before wiping off the excess.",
      "Checking slack is simple: with the bike on its side stand and in neutral, find the tightest point in the chain's rotation and measure how much you can move it up and down at the midpoint between the sprockets. Compare against your manual's spec — usually somewhere between 25 and 35mm.",
      "If you're ever unsure whether your chain has stretched beyond a safe adjustment range, our technicians can check it in minutes during any routine service visit — it's included in every one of our maintenance packages.",
    ],
    category: "Maintenance",
    coverImage: IMG("photo-1687203627800-da3fb4db92eb"),
    author: AUTHORS.sam,
    publishedDate: "2026-03-08",
    readTimeMinutes: 6,
    tags: ["chain", "maintenance", "DIY"],
  },
  {
    id: "naked-vs-sport-vs-cruiser",
    slug: "naked-vs-sport-vs-cruiser-which-bike-fits-you",
    title: "Naked vs. Sport vs. Cruiser: Which Bike Fits You?",
    excerpt:
      "The style you're drawn to and the style that fits how you'll actually ride aren't always the same bike.",
    content: [
      'Every new rider eventually stares at three very different silhouettes on a showroom floor and wonders which one is "the right one." The honest answer is that it depends far more on how you\'ll actually use the bike than which one looks best in photos.',
      "Naked bikes — upright, minimal bodywork, aggressive-looking but comfortable — are the great generalists. Good ergonomics for commuting and weekend rides alike, easy to maneuver at low speed, and forgiving for a rider still building confidence.",
      "Sport bikes trade comfort for outright capability. The aggressive, forward-leaning riding position that looks so good in photos puts real weight on your wrists in stop-and-go traffic. They reward experienced riders who spend real time on twisty roads or occasional track days, but they're a demanding daily commuter.",
      "Cruisers prioritize relaxed, low-seat, feet-forward comfort and low-end torque over outright cornering clearance or top speed. They're a superb choice for longer, more relaxed rides and for riders who value comfort and a lower center of gravity over outright performance.",
      "Our Bike Finder Quiz asks exactly these kinds of questions — riding style, intended use, experience level — and matches you against our current lineup in under a minute if you'd rather not guess.",
    ],
    category: "Buying Guides",
    coverImage: IMG("photo-1679012257130-a6e22db2394c"),
    author: AUTHORS.maya,
    publishedDate: "2026-02-18",
    readTimeMinutes: 6,
    tags: ["buying guide", "bike styles", "beginners"],
  },
  {
    id: "first-bike-buying-guide",
    slug: "first-bike-buying-guide-what-to-look-for",
    title: "First Bike Buying Guide: What to Look For",
    excerpt:
      "Engine size isn't the only number that matters — here's what actually predicts whether you'll love your first bike.",
    content: [
      "It's tempting to shop for a first bike by engine displacement alone, but cc figures tell you surprisingly little about how a bike will actually feel to live with day to day.",
      "Weight matters as much as power, especially at parking-lot speeds. A lighter bike with modest power is far easier to build confidence on than a heavy one that intimidates you every time you have to walk it backward out of a driveway.",
      "Seat height determines whether you can plant both feet flat at a stop — a small thing that makes an enormous difference to how secure you feel in traffic, particularly for shorter riders.",
      "Don't underestimate running costs either: insurance, tires, and maintenance intervals vary a lot between bike types, and a bike that's cheap to buy isn't always cheap to keep on the road. Our Finance page's EMI Calculator only covers the purchase — budget separately for the rest.",
      "Most importantly: test ride before you commit. Specs and reviews can only tell you so much about how a bike feels underneath you. Book a test ride at your nearest branch before signing anything.",
    ],
    category: "Buying Guides",
    coverImage: IMG("photo-1776629214408-475311a4e0d9"),
    author: AUTHORS.maya,
    publishedDate: "2026-04-05",
    readTimeMinutes: 5,
    tags: ["buying guide", "first bike", "beginners"],
  },
  {
    id: "best-helmets-2026",
    slug: "best-motorcycle-helmets-of-2026-our-top-picks",
    title: "Best Motorcycle Helmets of 2026: Our Top Picks",
    excerpt:
      "What actually matters when choosing a helmet — and where in our Accessories Store to find it.",
    content: [
      "A helmet is the one piece of gear where compromise genuinely isn't worth the savings. The good news is that safety certification is now standard across nearly every price bracket — what varies is comfort, noise, ventilation, and finish quality.",
      "Full-face helmets remain the safest overall category thanks to chin-bar protection, and modern ventilation systems have mostly solved the old complaint about them running hot in traffic. Our Apex Full-Face Helmet is a strong all-rounder for daily commuting.",
      "For longer highway stretches, look for helmets specifically designed around aerodynamics and noise reduction rather than pure weight savings — a helmet that buffets at highway speed will tire you out over a long ride far more than a slightly heavier, better-shaped one.",
      "Fit matters more than any spec sheet. The same helmet model can feel completely different across two riders with similarly-sized heads but different head shapes. Always try a helmet on in person before buying if you possibly can.",
      "Browse our full helmet lineup, along with jackets, gloves, and luggage, in the Accessories Store — every listing includes a quick enquiry option if you want to check current stock at your branch.",
    ],
    category: "Gear & Reviews",
    coverImage: IMG("photo-1590506995460-d0d9892b54da"),
    author: AUTHORS.maya,
    publishedDate: "2026-05-14",
    readTimeMinutes: 5,
    tags: ["gear", "helmets", "reviews"],
  },
  {
    id: "riding-gear-essentials",
    slug: "riding-gear-essentials-beyond-the-helmet",
    title: "Riding Gear Essentials: Beyond the Helmet",
    excerpt:
      "All the gear, all the time — here's a practical starting kit that doesn't break the bank.",
    content: [
      "\"All the gear, all the time\" gets repeated so often in riding circles that it's easy to tune out — but the logic behind it is simple: you don't get to choose which ride is the one where you go down.",
      "A proper riding jacket with CE-rated armor at the shoulders and elbows is the single biggest upgrade over street clothes. Textile jackets with removable thermal liners give you the most year-round versatility for a daily rider.",
      "Gloves are non-negotiable and often the most overlooked. Hands are instinctively the first thing riders put out in a fall, and even a low-speed slide without gloves can cause serious, permanent damage in seconds.",
      "Proper riding boots with ankle support matter more than they look like they would — ankles take an enormous amount of stress in even minor get-offs, and sneakers offer essentially zero protection.",
      "You don't need to buy everything at once. Start with a jacket and gloves, add boots next, and build the rest of your kit over your first season of riding — our Accessories Store carries all four categories if you want to build a full kit in one visit.",
    ],
    category: "Gear & Reviews",
    coverImage: IMG("photo-1605915034248-ba76b2f32c3c"),
    author: AUTHORS.jordan,
    publishedDate: "2026-06-02",
    readTimeMinutes: 5,
    tags: ["gear", "safety", "reviews"],
  },
  {
    id: "launches-this-year",
    slug: "5-motorcycles-launching-this-year-you-should-know-about",
    title: "5 Motorcycles Launching This Year You Should Know About",
    excerpt:
      "From track-focused four-cylinders to comfortable cruisers, here's what's landing on our showroom floor soon.",
    content: [
      "It's shaping up to be a genuinely exciting year for new metal, with new arrivals spanning nearly every category we carry. Here's what's worth waiting for if you're not in a rush to buy today.",
      "The Kawasaki ZX-4RR brings a genuine four-cylinder screamer back to the accessible sport bike segment — a rev-happy engine character that's been missing from this price bracket for years.",
      "Benelli's 502C leans hard into approachable cruiser comfort with genuine Italian styling, aimed squarely at riders who want a relaxed daily ride without sacrificing road presence.",
      "Road Prince's upcoming R150 promises to be the sharpest naked bike the brand has released yet — lighter, more powerful, and more refined than the model it replaces.",
      "You can track exact launch dates and reserve early notification for any of these on our homepage's Upcoming Launches section — we'll email you the moment any of them lands at your branch.",
    ],
    category: "News",
    coverImage: IMG("photo-1773940792913-94baf5fa0130"),
    author: AUTHORS.maya,
    publishedDate: "2026-06-20",
    readTimeMinutes: 4,
    tags: ["news", "new bikes", "launches"],
  },
  {
    id: "fourth-branch-expansion",
    slug: "bikezone-expands-to-a-fourth-branch",
    title: "BikeZone Expands to a Fourth Branch",
    excerpt:
      "Our newest location brings our full lineup, service center, and accessories store to a fourth corner of the metro.",
    content: [
      "We're excited to announce that BikeZone now operates four branches across the metro area, with our newest location open for showroom visits, test rides, and service appointments.",
      "The new branch carries our complete lineup and includes a full-service maintenance bay, meaning routine service, warranty repairs, and accessory fitting are now all available closer to more of our customers than ever.",
      "This expansion follows a year of strong demand across our existing branches — thank you to every rider who's trusted us with their first bike, their second, or their tenth.",
      'You can find hours, contact details, and directions for every branch, including the new one, on our Dealer Locator page — or just tap "Find Nearest" to have it picked for you automatically.',
    ],
    category: "News",
    coverImage: IMG("photo-1783449494695-afbde8611fdf"),
    author: AUTHORS.sam,
    publishedDate: "2026-07-08",
    readTimeMinutes: 3,
    tags: ["news", "company update"],
  },
];
