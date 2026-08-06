import type { VideoReview } from "@/constants/gallery";

const IMG = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=800&auto=format&fit=crop`;

export type Testimonial = VideoReview & {
  bikeModel: string;
  date: string;
  verified: boolean;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "review-1",
    name: "Sana M.",
    location: "Lahore",
    quote:
      "The whole delivery experience felt premium from start to finish. My Ninja 300 was spotless and the team walked me through everything.",
    rating: 5,
    image: IMG("photo-1562337404-3044c84ac061"),
    bikeModel: "Kawasaki Ninja 300",
    date: "2026-05-14",
    verified: true,
  },
  {
    id: "review-2",
    name: "Danish I.",
    location: "Karachi",
    quote:
      "Honest pricing, no pressure, and they actually knew the bikes inside out. Picked up my CB150F the same week.",
    rating: 5,
    image: IMG("photo-1665213276152-e0395055c40a"),
    bikeModel: "Honda CB150F",
    date: "2026-04-02",
    verified: true,
  },
  {
    id: "review-3",
    name: "Farah Q.",
    location: "Islamabad",
    quote:
      "First-time buyer here — the team made the whole EMI process painless and clear. Couldn't be happier with my GS150.",
    rating: 4,
    image: IMG("photo-1653963042368-f33692c438ee"),
    bikeModel: "Suzuki GS150",
    date: "2026-03-21",
    verified: true,
  },
  {
    id: "review-4",
    name: "Imran H.",
    location: "Faisalabad",
    quote:
      "Bought my second bike from BikeZone this year. Consistent quality and after-sales support that actually responds.",
    rating: 5,
    image: IMG("photo-1733231291455-3c4de1c24e20"),
    bikeModel: "Benelli TNT150i",
    date: "2026-02-09",
    verified: true,
  },
  {
    id: "review-5",
    name: "Walter B.",
    location: "Austin, TX",
    quote:
      "At my age I wasn't sure I'd be taken seriously as a first-time rider, but the team at the Downtown Showroom couldn't have been more patient. Love my Robinson.",
    rating: 5,
    image: IMG("photo-1758691030490-fe1cb6c972ce"),
    bikeModel: "Road Prince Robinson",
    date: "2026-06-01",
    verified: true,
  },
  {
    id: "review-6",
    name: "Diego M.",
    location: "Denver, CO",
    quote:
      "Test rode three different bikes before committing — nobody rushed me. Ended up with the YBR125 and I still grin every time I ride it.",
    rating: 5,
    image: IMG("photo-1781935781399-9044dabd12db"),
    bikeModel: "Yamaha YBR125",
    date: "2026-05-28",
    verified: true,
  },
  {
    id: "review-7",
    name: "Ava T.",
    location: "Seattle, WA",
    quote:
      "The financing team found me a better rate than my own bank. My CB150F was ready for pickup exactly when promised.",
    rating: 5,
    image: IMG("photo-1768244016593-8ca75b15bc92"),
    bikeModel: "Honda CB150F",
    date: "2026-04-19",
    verified: true,
  },
  {
    id: "review-8",
    name: "Naomi S.",
    location: "Phoenix, AZ",
    quote:
      "Great buying experience overall. Only wish the service center had a bit more weekend availability, but the bike itself has been flawless.",
    rating: 4,
    image: IMG("photo-1569925444984-9e2e5fc3d1fb"),
    bikeModel: "Suzuki GS150",
    date: "2026-03-05",
    verified: true,
  },
];
