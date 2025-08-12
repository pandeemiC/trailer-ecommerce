export type Category = keyof typeof navigationData;

export const navigationData = {
  WOMAN: {
    image: "/category-img1.jpg",
    links: [
      { title: "NEW ARRIVALS", href: "/woman-new-arrivals" },
      { title: "BEST SELLERS", href: "/woman-best-sellers" },
      { title: "JACKETS", href: "/woman-jackets" },
      { title: "DRESSES", href: "/woman-dresses" },
      { title: "TOPS", href: "/woman-tops" },
      { title: "BOTTOMS", href: "/woman-bottoms" },
    ],
  },
  MAN: {
    image: "/category-img2.jpg",
    links: [
      { title: "NEW ARRIVALS", href: "/man-new-arrivals" },
      { title: "BEST SELLERS", href: "/man-best-sellers" },
      { title: "JACKETS", href: "/man-jackets" },
      { title: "LINEN", href: "/man-linen" },
      { title: "TOPS", href: "/man-tops" },
      { title: "BOTTOMS", href: "/man-bottoms" },
    ],
  },
  KIDS: {
    image: "/category-img3.jpg",
    links: [
      { title: "NEW ARRIVALS", href: "/kids-new-arrivals" },
      { title: "BEST SELLERS", href: "/kids-best-sellers" },
      { title: "GIRL | 6-14 YEARS", href: "/kids-g" },
      { title: "BOY | 6-14 YEARS", href: "/kids-b" },
    ],
  },
  HOME: {
    image: "/category-img4.jpg",
    links: [
      { title: "NEW ARRIVALS", href: "/home-new-arrivals" },
      { title: "BEST SELLERS", href: "/home-best-sellers" },
      { title: "BEDDING", href: "/home-bedding" },
      { title: "DECOR", href: "/home-decor" },
      { title: "FURNITURE", href: "/home-furniture" },
      { title: "KITCHEN", href: "/home-kitchen" },
    ],
  },
  FRAGRANCE: {
    image: "/category-img5.jpg",
    links: [
      { title: "NEW ARRIVALS", href: "/fragrance-new-arrivals" },
      { title: "BEST SELLERS", href: "/fragrance-best-sellers" },
      { title: "FOR HER", href: "/fragrance-for-her" },
      { title: "FOR HIM", href: "/fragrance-for-him" },
      { title: "UNISEX", href: "/fragrance-unisex" },
      { title: "GIFT SETS", href: "/fragrance-gift-sets" },
    ],
  },
};
