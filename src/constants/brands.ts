import type { Brand } from "@/types";

const IMG = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=1200&auto=format&fit=crop`;

export const BRANDS: Brand[] = [
  {
    name: "Honda",
    slug: "honda",
    image: IMG("photo-1588627541420-fce3f661b779"),
  },
  {
    name: "Yamaha",
    slug: "yamaha",
    image: IMG("photo-1481575184241-4754ea78a1bf"),
  },
  {
    name: "Suzuki",
    slug: "suzuki",
    image: IMG("photo-1518057014654-ba829c396280"),
  },
  {
    name: "Road Prince",
    slug: "road-prince",
    image: IMG("photo-1578552135865-25123ccd1fd4"),
  },
  {
    name: "Benelli",
    slug: "benelli",
    image: IMG("photo-1603039997315-6dcb72ec1204"),
  },
  {
    name: "Kawasaki",
    slug: "kawasaki",
    image: IMG("photo-1606927131353-c0ad17d60b56"),
  },
  {
    name: "United",
    slug: "united",
    image: IMG("photo-1634015190736-3cecd58f89fe"),
  },
  {
    name: "Hi Speed",
    slug: "hi-speed",
    image: IMG("photo-1727784658332-d5adfdf4d3bc"),
  },
];
