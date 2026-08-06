export type GalleryAspect = "portrait" | "square" | "tall" | "landscape";

export type GalleryPhoto = {
  id: string;
  image: string;
  caption: string;
  customerName: string;
  bikeModel: string;
  aspect: GalleryAspect;
};

export type VideoReview = {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
  image: string;
};

const IMG = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=1200&auto=format&fit=crop`;

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "gallery-1",
    image: IMG("photo-1526956378276-b120acd89f17"),
    caption: "Picking up the new ride in style.",
    customerName: "Ahmed R.",
    bikeModel: "Kawasaki Ninja 300",
    aspect: "tall",
  },
  {
    id: "gallery-2",
    image: IMG("photo-1581089927612-11fa03ef5e99"),
    caption: "First ride, first sunset.",
    customerName: "Bilal K.",
    bikeModel: "Yamaha YBR125",
    aspect: "square",
  },
  {
    id: "gallery-3",
    image: IMG("photo-1651137726925-d9df5c4e5c0a"),
    caption: "Straight off the showroom floor.",
    customerName: "Hamza S.",
    bikeModel: "Honda CB150F",
    aspect: "landscape",
  },
  {
    id: "gallery-4",
    image: IMG("photo-1616786541567-7e855a02b5a7"),
    caption: "Weekend adventures start here.",
    customerName: "Usman T.",
    bikeModel: "Benelli TNT150i",
    aspect: "portrait",
  },
  {
    id: "gallery-5",
    image: IMG("photo-1623343559257-1f3aef3a77e5"),
    caption: "Chasing the horizon on delivery day.",
    customerName: "Fahad M.",
    bikeModel: "Road Prince Robinson",
    aspect: "tall",
  },
  {
    id: "gallery-6",
    image: IMG("photo-1606154090622-0ae4d34bb49f"),
    caption: "Suited up and ready to roll.",
    customerName: "Zain A.",
    bikeModel: "Suzuki GS150",
    aspect: "square",
  },
  {
    id: "gallery-7",
    image: IMG("photo-1752750944238-9cdd39da396c"),
    caption: "Celebrating the ride of a lifetime.",
    customerName: "Ayesha N.",
    bikeModel: "Kawasaki Ninja 300",
    aspect: "portrait",
  },
  {
    id: "gallery-8",
    image: IMG("photo-1430761607340-22c30fb58f61"),
    caption: "Two wheels, better together.",
    customerName: "Omar & Hina",
    bikeModel: "Road Prince Robinson",
    aspect: "landscape",
  },
];

export const VIDEO_REVIEWS: VideoReview[] = [
  {
    id: "review-1",
    name: "Sana M.",
    location: "Lahore",
    quote:
      "The whole delivery experience felt premium from start to finish. My Ninja 300 was spotless and the team walked me through everything.",
    rating: 5,
    image: IMG("photo-1562337404-3044c84ac061"),
  },
  {
    id: "review-2",
    name: "Danish I.",
    location: "Karachi",
    quote:
      "Honest pricing, no pressure, and they actually knew the bikes inside out. Picked up my CB150F the same week.",
    rating: 5,
    image: IMG("photo-1665213276152-e0395055c40a"),
  },
  {
    id: "review-3",
    name: "Farah Q.",
    location: "Islamabad",
    quote:
      "First-time buyer here — the team made the whole EMI process painless and clear. Couldn't be happier with my GS150.",
    rating: 4,
    image: IMG("photo-1653963042368-f33692c438ee"),
  },
  {
    id: "review-4",
    name: "Imran H.",
    location: "Faisalabad",
    quote:
      "Bought my second bike from BikeZone this year. Consistent quality and after-sales support that actually responds.",
    rating: 5,
    image: IMG("photo-1733231291455-3c4de1c24e20"),
  },
];
