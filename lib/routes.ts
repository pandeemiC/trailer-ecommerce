import { navigationData, type Category } from "@/lib/navigationData";

function toCamelCase(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
}

export const ROUTES = (Object.keys(navigationData) as Category[]).reduce(
  (acc, category) => {
    const { basePath, links } = navigationData[category];

    acc[category] = {};

    links.forEach((link) => {
      const key = toCamelCase(link.title);
      acc[category][key] = `${basePath}/${link.href}`;
    });
    return acc;
  },
  {} as Record<Category, Record<string, string>>,
);
