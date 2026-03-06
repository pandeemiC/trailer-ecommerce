"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { createCheckoutSession } from "@/lib/checkout/actions";
import useCartStore from "@/store/useCartStore";
import Image from "next/image";
import Link from "next/link";
import Select from "react-select";
import countryList from "country-list";
import { SHIPPING_OPTIONS } from "@/lib/navigationData";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import trailerLogo from "@/public/icons/trailer-logo-light.png";

export default function CheckoutPage() {
  const supabase = createClient();
  const { items, totalPrice } = useCartStore();
  // progression
  const [step, setStep] = useState(1);
  // personal
  const [authMode, setAuthMode] = useState<"sigin" | "guest" | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);
  const [authError, setAuthError] = useState("");
  // shipping
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [shippingMethod, setShippingMethod] = useState("standard");
  // gen
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setEmail(user.email ?? "");
        // prefill
        const meta = user.user_metadata;
        setFirstName(meta?.first_name ?? "");
        setLastName(meta?.last_name ?? "");
        const addy = meta?.address ?? {};
        setStreet(addy.street ?? "");
        setCity(addy.city ?? "");
        setState(addy.state ?? "");
        setZip(addy.zip ?? "");
        setCountry(addy.country ?? "");
        setStep(2);
      }
    };
    checkUser();
  }, [supabase]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setAuthError(error.message);
    } else {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const meta = user.user_metadata;
        setFirstName(meta?.first_name ?? "");
        setLastName(meta?.last_name ?? "");
        const addy = meta?.address ?? {};
        setStreet(addy.street ?? "");
        setCity(addy.city ?? "");
        setState(addy.state ?? "");
        setZip(addy.zip ?? "");
        setCountry(addy.country ?? "");
      }
      setStep(2);
    }
  };

  const handleOAuth = async (provider: "google" | "github") => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const selected = SHIPPING_OPTIONS.find((s) => s.id === shippingMethod)!;
      const url = await createCheckoutSession(
        items.map((item) => ({
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image,
        })),
        { method: selected.name, cost: selected.cost },
      );
      if (url) window.location.href = url;
    } catch (err) {
      console.error("Checkout failed: ", err);
    } finally {
      setLoading(false);
    }
  };

  const getFlagEmoji = (code: string) =>
    code
      .toUpperCase()
      .split("")
      .map((c) => String.fromCodePoint(127397 + c.charCodeAt(0)))
      .join("");

  const countryOptions = countryList.getData().map((c) => ({
    value: c.code,
    label: `${getFlagEmoji(c.code)} ${c.name}`,
  }));

  const selectedShipping = SHIPPING_OPTIONS.find(
    (s) => s.id === shippingMethod,
  )!;
  const shippingCost = selectedShipping.cost;
  const total = totalPrice() + shippingCost;

  if (!mounted) return null;

  return (
    <main className="min-h-screen relative">
      <div className="fixed inset-0 flex items-center justify-center mt-50 pointer-events-none z-0">
        <Image
          src={trailerLogo}
          alt=""
          width={800}
          height={600}
          className="opacity-[0.03]"
        />
      </div>

      <div className="relative z-10 border-b border-black/10 py-6 flex justify-center">
        <Link href="/">
          <Image src={trailerLogo} alt="Trailer" width={180} height={120} />
        </Link>
      </div>

      {/* progression */}
      <div className="relative z-10 max-w-xl mx-auto pt-8 pb-4 px-4">
        <div className="flex items-center justify-between">
          {["Personal", "Shipping", "Summary", "Payment"].map((label, i) => (
            <div
              key={label}
              className="flex items-center flex-1 last:flex-none"
            >
              <button
                onClick={() => {
                  if (i + 1 < step) setStep(i + 1);
                }}
                className="flex flex-col items-center gap-1.5"
              >
                <div
                  className={`w-3 h-3 rounded-full border-2 transition-colors ${
                    i + 1 <= step
                      ? "bg-black border-black"
                      : "bg-white border-black/20"
                  }`}
                />
                <span
                  className={`text-[9px] tracking-[0.2em] uppercase ${
                    i + 1 <= step ? "text-black" : "text-black/30"
                  }`}
                >
                  {label}
                </span>
              </button>
              {i < 3 && (
                <div
                  className={`flex-1 h-[1px] mx-3 mt-[-14px] ${
                    i + 1 < step ? "bg-black" : "bg-black/15"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
