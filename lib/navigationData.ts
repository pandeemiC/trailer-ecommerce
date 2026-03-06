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

export const mockOrder = [
  {
    id: "ORD-2024-001847",
    date: "January 15, 2025",
    status: "Delivered",
    total: 289.97,
    items: [
      {
        name: "Wool Blend Overcoat",
        size: "M",
        color: "Black",
        quantity: 1,
        price: 189.99,
        image: "/orders/woolcoat.jpg",
      },
      {
        name: "Cashmere Scarf",
        size: "One Size",
        color: "Grey",
        quantity: 1,
        price: 49.99,
        image: "/orders/scarf.jpg",
      },
      {
        name: "Leather Belt",
        size: "85",
        color: "Brown",
        quantity: 1,
        price: 49.99,
        image: "/orders/belt.jpg",
      },
    ],
  },
  {
    id: "ORD-2024-002103",
    date: "February 2, 2025",
    status: "In Transit",
    total: 129.99,
    items: [
      {
        name: "Linen Blend Shirt",
        size: "L",
        color: "White",
        quantity: 2,
        price: 64.99,
        image: "/orders/linenshirt.jpg",
      },
    ],
  },
  {
    id: "ORD-2024-002250",
    date: "February 20, 2025",
    status: "Processing",
    total: 459.98,
    items: [
      {
        name: "Tailored Blazer",
        size: "M",
        color: "Navy",
        quantity: 1,
        price: 229.99,
        image: "/orders/blazer.jpg",
      },
      {
        name: "Pleated Trousers",
        size: "32",
        color: "Navy",
        quantity: 1,
        price: 229.99,
        image: "/orders/trousers.jpg",
      },
    ],
  },
];

export const faqData = [
  {
    category: "Orders & Purchases",
    questions: [
      {
        q: "How do I track my order?",
        a: "Once your order has shipped, you will receive a confirmation email with a tracking number. You can also check the status of your order in My Purchases.",
      },
      {
        q: "Can I cancel or modify my order?",
        a: "Orders can be cancelled or modified within 1 hour of placement. After this window, the order enters processing and cannot be changed. Please contact our support team for assistance.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept Visa, Mastercard, American Express, PayPal, and Apple Pay. All transactions are processed securely.",
      },
      {
        q: "I received the wrong item. What should I do?",
        a: "We apologize for the inconvenience. Please contact our support team within 48 hours of delivery with your order number and a photo of the item received. We will arrange a replacement or refund.",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    questions: [
      {
        q: "What are the shipping options?",
        a: "We offer Standard Shipping (5-7 business days), Express Shipping (2-3 business days), and Next Day Delivery for select locations. Shipping costs are calculated at checkout.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship to over 50 countries worldwide. International shipping times vary between 7-14 business days depending on your location. Import duties and taxes may apply.",
      },
      {
        q: "How much does shipping cost?",
        a: "Standard shipping is free on orders over $50. Express shipping starts at $12.95. Next day delivery is available for $19.95 in eligible areas.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    questions: [
      {
        q: "What is your return policy?",
        a: "Items can be returned within 30 days of delivery in their original condition with tags attached. Sale items are final sale and cannot be returned.",
      },
      {
        q: "How do I initiate a return?",
        a: "Go to My Purchases, select the order, and click 'Request Return'. You will receive a prepaid return label via email. Drop off the package at any authorized shipping location.",
      },
      {
        q: "When will I receive my refund?",
        a: "Refunds are processed within 5-7 business days after we receive and inspect the returned item. The refund will be credited to your original payment method.",
      },
      {
        q: "Can I exchange an item for a different size?",
        a: "Yes. Initiate a return for the original item and place a new order for the desired size. This ensures the fastest processing time.",
      },
    ],
  },
  {
    category: "Account & Security",
    questions: [
      {
        q: "How do I reset my password?",
        a: "Click 'Forgot your password?' on the login page and enter your email. You will receive a link to create a new password. You can also change your password in Settings.",
      },
      {
        q: "How do I update my personal information?",
        a: "Go to My Details to update your name, phone number, and shipping address. Email changes are not currently supported.",
      },
      {
        q: "Is my personal data secure?",
        a: "We take your privacy seriously. All data is encrypted in transit and at rest. We never share your personal information with third parties without your consent.",
      },
    ],
  },
];

export const adminLinks = [
  { title: "Dashboard", href: "/admin", icon: "PiChartBarLight" },
  { title: "Content", href: "/admin/content", icon: "PiLayoutLight" },
  { title: "Products", href: "/admin/products", icon: "PiPackageLight" },
  { title: "Categories", href: "/admin/categories", icon: "PiTagLight" },
];

export const SHIPPING_OPTIONS = [
  { id: "standard", name: "Standard Shipping", cost: 0, time: "7-10 Days" },
  { id: "express", name: "Express Shipping", cost: 9.99, time: "2-3 Days" },
  { id: "dhl", name: "DHL Shipping", cost: 24.99, time: "7-10 Days" },
];
