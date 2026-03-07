import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.error("Webhook signature verification failed: ", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ["data.price.product"],
    });
    const userEmail = session.metadata?.user_email;
    const shippingMethod = session.metadata?.shipping_method;
    if (!userEmail) {
      console.error("No user_email in session metadata");
      return NextResponse.json({ received: true });
    }
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_email: userEmail,
        stripe_session_id: session.id,
        total: session.amount_total,
        status: "Processing",
        shipping_method: shippingMethod,
      })
      .select("id")
      .single();

    if (orderError) {
      console.error("Failed to insert the order: ", orderError);
      return NextResponse.json({ received: true });
    }

    const orderItems = lineItems.data.map((item) => {
      const product = item.price?.product as Stripe.Product;

      return {
        order_id: order.id,
        product_name: item.description,
        product_image: product?.images?.[0] || "",
        price: item.amount_total,
        quantity: item.quantity,
      };
    });

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      console.error("Failed to insert order items: ", itemsError);
    }
  }
  return NextResponse.json({ received: true });
}
