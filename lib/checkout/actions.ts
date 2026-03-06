"use server";

import { stripe } from "@/lib/stripe";

export async function createCheckoutSession(
  items: { name: string; price: number; quantity: number; image: string }[],
) {
  const origin = "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })),
    success_url: `${origin}/checkout/success`,
    cancel_url: `${origin}/shopping-bag`,
  });

  return session.url;
}
