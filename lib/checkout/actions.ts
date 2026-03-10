"use server";

import { stripe } from "@/lib/stripe";

export async function createCheckoutSession(
  items: { name: string; price: number; quantity: number; image: string }[],
  shipping: { method: string; cost: number },
  email: string,
) {
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  const line_items = items.map((item) => {
    const imageUrl = item.image.startsWith("http")
      ? item.image
      : `${origin}${item.image}`;

    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [imageUrl],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    };
  });

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
    metadata: {
      user_email: email,
      shipping_method: shipping.method,
    },
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout`,
  });

  return session.url;
}
