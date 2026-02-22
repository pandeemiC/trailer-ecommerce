export type Category = keyof typeof navigationData;

export const navigationData = {
  WOMAN: {
    basePath: "/woman",
    image: "/category-img1.jpg",
    links: [
      { title: "VIEW ALL", href: "view-all" },
      { title: "NEW ARRIVALS", href: "new-arrivals" },
      { title: "BEST SELLERS", href: "best-sellers" },
      { title: "JACKETS", href: "jackets" },
      { title: "DRESSES", href: "dresses" },
      { title: "TOPS", href: "tops" },
      { title: "BOTTOMS", href: "bottoms" },
    ],
  },
  MAN: {
    basePath: "/man",
    image: "/category-img2.jpg",
    links: [
      { title: "VIEW ALL", href: "view-all" },
      { title: "NEW ARRIVALS", href: "new-arrivals" },
      { title: "BEST SELLERS", href: "best-sellers" },
      { title: "JACKETS", href: "jackets" },
      { title: "LINEN", href: "linen" },
      { title: "TOPS", href: "tops" },
      { title: "BOTTOMS", href: "bottoms" },
    ],
  },
  KIDS: {
    basePath: "/kids",
    image: "/category-img3.jpg",
    links: [
      { title: "VIEW ALL", href: "view-all" },
      { title: "NEW ARRIVALS", href: "new-arrivals" },
      { title: "BEST SELLERS", href: "best-sellers" },
      { title: "GIRL | 6-14 YEARS", href: "girl" },
      { title: "BOY | 6-14 YEARS", href: "boy" },
    ],
  },
  HOME: {
    basePath: "/home",
    image: "/category-img4.jpg",
    links: [
      { title: "VIEW ALL", href: "view-all" },
      { title: "NEW ARRIVALS", href: "new-arrivals" },
      { title: "BEST SELLERS", href: "best-sellers" },
      { title: "BEDDING", href: "bedding" },
      { title: "DECOR", href: "decor" },
      { title: "FURNITURE", href: "furniture" },
      { title: "KITCHEN", href: "kitchen" },
    ],
  },
  FRAGRANCE: {
    basePath: "/fragrance",
    image: "/category-img5.jpg",
    links: [
      { title: "VIEW ALL", href: "view-all" },
      { title: "NEW ARRIVALS", href: "new-arrivals" },
      { title: "BEST SELLERS", href: "best-sellers" },
      { title: "FOR HER", href: "for-her" },
      { title: "FOR HIM", href: "for-him" },
      { title: "UNISEX", href: "unisex" },
      { title: "GIFT SETS", href: "gift-sets" },
    ],
  },
} as const;
