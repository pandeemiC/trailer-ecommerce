"use server";

import { stripe } from "@/lib/stripe";

export async function createCheckoutSession(
  items: { name: string; price: number; quantity: number; image: string }[],
  shipping: { method: string; cost: number },
) {
  const origin = "http://localhost:3000";

  const line_items = items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
        images: [item.image],
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  if (shipping.cost > 0) {
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: `${shipping.method} Shipping`,
          images: [],
        },
        unit_amount: Math.round(shipping.cost * 100),
      },
      quantity: 1,
    });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items,
    success_url: `${origin}/checkout/success`,
    cancel_url: `${origin}/checkout`,
  });

  return session.url;
}
