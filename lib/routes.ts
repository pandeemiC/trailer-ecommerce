// src/lib/routes.ts

export const ROUTES = {
  HOME: "/",

  WOMAN: {
    newArrivals: "/woman-new-arrivals",
    bestSellers: "/woman-best-sellers",
    jackets: "/woman-jackets",
    dresses: "/woman-dresses",
    tops: "/woman-tops",
    bottoms: "/woman-bottoms",
  },

  MAN: {
    newArrivals: "/man-new-arrivals",
    bestSellers: "/man-best-sellers",
    jackets: "/man-jackets",
    linen: "/man-linen",
    tops: "/man-tops",
    bottoms: "/man-bottoms",
  },

  KIDS: {
    newArrivals: "/kids-new-arrivals",
    bestSellers: "/kids-best-sellers",
    girl: "/kids-g",
    boy: "/kids-b",
  },

  HOME_CATEGORY: {
    newArrivals: "/home-new-arrivals",
    bestSellers: "/home-best-sellers",
    bedding: "/home-bedding",
    decor: "/home-decor",
    furniture: "/home-furniture",
    kitchen: "/home-kitchen",
  },

  FRAGRANCE: {
    newArrivals: "/fragrance-new-arrivals",
    bestSellers: "/fragrance-best-sellers",
    forHer: "/fragrance-for-her",
    forHim: "/fragrance-for-him",
    unisex: "/fragrance-unisex",
    giftSets: "/fragrance-gift-sets",
  },
} as const;

export type RouteCategory = keyof typeof ROUTES;
