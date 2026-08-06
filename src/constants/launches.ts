export type UpcomingLaunch = {
  id: string;
  name: string;
  brand: string;
  category: string;
  teaser: string;
  image: string;
  launchDate: string;
  expectedPrice: number;
};

const IMG = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=1600&auto=format&fit=crop`;

export const UPCOMING_LAUNCHES: UpcomingLaunch[] = [
  {
    id: "kawasaki-zx4rr",
    name: "ZX-4RR",
    brand: "Kawasaki",
    category: "Superbike",
    teaser:
      "A four-cylinder screamer built for the track, arriving at our showroom floor.",
    image: IMG("photo-1709913472012-a0c243ca6cc9"),
    launchDate: "2026-08-20T09:00:00",
    expectedPrice: 9800,
  },
  {
    id: "benelli-502c",
    name: "502C",
    brand: "Benelli",
    category: "Cruiser",
    teaser:
      "Italian styling meets effortless cruising comfort — reserve your test ride today.",
    image: IMG("photo-1570976796738-314c43fff509"),
    launchDate: "2026-09-10T09:00:00",
    expectedPrice: 5300,
  },
  {
    id: "road-prince-r150",
    name: "R150",
    brand: "Road Prince",
    category: "Naked",
    teaser:
      "The next chapter in everyday performance — sharper, lighter, faster.",
    image: IMG("photo-1761583780716-1553f9a70951"),
    launchDate: "2026-10-05T09:00:00",
    expectedPrice: 2000,
  },
];
