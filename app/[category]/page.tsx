import React from "react";
import { getCategories } from "@/lib/queries";

export async function Page() {
  const categories = await getCategories();
  console.log(categories);
  return <div>Page</div>;
}

export default Page;
