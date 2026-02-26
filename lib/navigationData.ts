export type Category = keyof typeof navigationData;

export const navigationData = {
  WOMAN: {
    basePath: "/woman",
    image: "/category-img1.jpg",
    links: [
      { title: "VIEW ALL", href: "/search?category=woman" },
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
      { title: "VIEW ALL", href: "/search?category=man" },
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
      { title: "VIEW ALL", href: "/search?category=kids" },
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
      { title: "VIEW ALL", href: "/search?category=home" },
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
      { title: "VIEW ALL", href: "/search?category=fragrance" },
      { title: "NEW ARRIVALS", href: "new-arrivals" },
      { title: "BEST SELLERS", href: "best-sellers" },
      { title: "FOR HER", href: "for-her" },
      { title: "FOR HIM", href: "for-him" },
      { title: "UNISEX", href: "unisex" },
      { title: "GIFT SETS", href: "gift-sets" },
    ],
  },
} as const;

export const sortOptions = [
  { label: "Recommended", value: "" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A-Z", value: "name-asc" },
];

export const accountLinks = [
  {
    title: "My Purchases",
    href: "/account/purchases",
    icon: "PiShoppingBagLight",
  },
  { title: "My Details", href: "/account/details", icon: "PiUserLight" },
  { title: "Settings", href: "/account/settings", icon: "PiGearLight" },
  { title: "Help", href: "/account/help", icon: "PiQuestionLight" },
];
