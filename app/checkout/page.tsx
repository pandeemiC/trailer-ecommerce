"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
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
  const [authMode, setAuthMode] = useState<"signin" | "guest" | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
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
        email,
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
      <div className="relative z-10 border-b border-black/10 dark:border-white/10 py-6 flex justify-center">
        <Link href="/">
          <Image
            src={trailerLogo}
            alt="Trailer"
            width={180}
            height={120}
            className="w-[180px] 2xl:w-[240px] min-[2560px]:w-[300px] min-[3840px]:w-[400px] h-auto"
          />
        </Link>
      </div>

      {/* progression */}
      <div className="relative z-10 max-w-xl 2xl:max-w-2xl min-[2560px]:max-w-3xl mx-auto pt-8 pb-4 px-4">
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
                  className={`w-3 h-3 2xl:w-4 2xl:h-4 min-[2560px]:w-5 min-[2560px]:h-5 rounded-full border-2 transition-colors ${
                    i + 1 <= step
                      ? "bg-black dark:bg-white border-black dark:border-white"
                      : "bg-white dark:bg-neutral-800 border-black/20 dark:border-white/20"
                  }`}
                />
                <span
                  className={`text-[9px] 2xl:text-[11px] min-[2560px]:text-[13px] tracking-[0.2em] uppercase ${
                    i + 1 <= step
                      ? "text-black dark:text-white"
                      : "text-black/30 dark:text-white/30"
                  }`}
                >
                  {label}
                </span>
              </button>
              {i < 3 && (
                <div
                  className={`flex-1 h-[1px] mx-3 mt-[-14px] ${
                    i + 1 < step
                      ? "bg-black dark:bg-white"
                      : "bg-black/15 dark:bg-white/15"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-6xl 2xl:max-w-7xl min-[2560px]:max-w-[1600px] min-[3840px]:max-w-[2400px] mx-auto px-4 sm:px-8 md:px-16 2xl:px-20 min-[2560px]:px-24 pt-8 pb-20 flex flex-col lg:flex-row gap-8 lg:gap-16 2xl:gap-24">
        <div className="flex-1">
          {step === 1 && (
            <div>
              <h2 className="text-[13px] 2xl:text-[15px] min-[2560px]:text-[18px] tracking-[0.2em] uppercase mb-8">
                Personal Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <button
                  onClick={() => setAuthMode("signin")}
                  className={`p-6 border text-left transition-colors ${
                    authMode === "signin"
                      ? "border-black dark:border-white"
                      : "border-black/15 dark:border-white/15 hover:border-black/30 dark:hover:border-white/30"
                  }`}
                >
                  <span className="text-[11px] tracking-[0.2em] uppercase font-light">
                    Sign In
                  </span>
                  <p className="text-[10px] text-black/40 dark:text-white/40 tracking-wider mt-1">
                    Use your existing account
                  </p>
                </button>

                <button
                  onClick={() => setAuthMode("guest")}
                  className={`p-6 border text-left transition-colors ${
                    authMode === "guest"
                      ? "border-black dark:border-white"
                      : "border-black/15 dark:border-white/15 hover:border-black/30 dark:hover:border-white/30"
                  }`}
                >
                  <span className="text-[11px] tracking-[0.2em] uppercase font-light">
                    Continue as Guest
                  </span>
                  <p className="text-[10px] text-black/40 dark:text-white/40 tracking-wider mt-1">
                    No account needed
                  </p>
                </button>
              </div>

              {/* signin */}
              {authMode === "signin" && (
                <div className="max-w-sm 2xl:max-w-md min-[2560px]:max-w-lg">
                  {authError && (
                    <p className="text-red-500 text-[11px] mb-4">{authError}</p>
                  )}
                  <form onSubmit={handleSignIn} className="flex flex-col gap-4">
                    <input
                      type="email"
                      placeholder="E-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="auth-input"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="auth-input"
                    />
                    <button type="submit" className="auth-btn">
                      Sign In
                    </button>
                  </form>

                  <div className="flex items-center gap-4 my-6">
                    <hr className="flex-1 border-gray-300 dark:border-neutral-700" />
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                      or
                    </span>
                    <hr className="flex-1 border-gray-300 dark:border-neutral-700" />
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => handleOAuth("google")}
                      className="flex items-center justify-center gap-3 w-full border border-black dark:border-white/30 py-3 2xl:py-4 min-[2560px]:py-5 text-[11px] 2xl:text-[13px] min-[2560px]:text-[15px] tracking-[0.2em] uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer"
                    >
                      <FcGoogle size={16} /> Continue with Google
                    </button>
                    <button
                      onClick={() => handleOAuth("github")}
                      className="flex items-center justify-center gap-3 w-full border border-black dark:border-white/30 py-3 2xl:py-4 min-[2560px]:py-5 text-[11px] 2xl:text-[13px] min-[2560px]:text-[15px] tracking-[0.2em] uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer"
                    >
                      <FaGithub size={16} /> Continue with Github
                    </button>
                  </div>
                </div>
              )}

              {/* guest */}
              {authMode === "guest" && (
                <div className="max-w-sm 2xl:max-w-md min-[2560px]:max-w-lg">
                  <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="auth-input"
                  />
                </div>
              )}

              {authMode && (
                <button
                  onClick={() => {
                    if (email) setStep(2);
                  }}
                  disabled={!email}
                  className="auth-btn max-w-sm mt-6 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              )}
            </div>
          )}

          {/* shipping */}
          {step === 2 && (
            <div>
              <h2 className="text-[13px] 2xl:text-[15px] min-[2560px]:text-[18px] tracking-[0.2em] uppercase mb-8">
                Shipping Details
              </h2>

              <div className="max-w-lg 2xl:max-w-xl min-[2560px]:max-w-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="auth-input"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="auth-input"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Street Address"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="auth-input mb-4"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="auth-input"
                  />
                  <input
                    type="text"
                    placeholder="State / Province"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="auth-input"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  <input
                    type="text"
                    placeholder="Zip / Postal Code"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    className="auth-input"
                  />
                  <Select
                    options={countryOptions}
                    value={
                      countryOptions.find((c) => c.value === country) || null
                    }
                    onChange={(option) => setCountry(option?.value || "")}
                    placeholder="Country"
                    isClearable
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderRadius: 0,
                        borderColor: "#e5e7eb",
                        boxShadow: "none",
                        minHeight: "42px",
                        fontSize: "12px",
                        letterSpacing: "0.05em",
                        "&:hover": { borderColor: "#000" },
                      }),
                      option: (base, s) => ({
                        ...base,
                        fontSize: "12px",
                        letterSpacing: "0.05em",
                        backgroundColor: s.isFocused ? "#f3f4f6" : "white",
                        color: "#000",
                      }),
                      placeholder: (base) => ({
                        ...base,
                        fontSize: "12px",
                        color: "#9ca3af",
                        letterSpacing: "0.05em",
                      }),
                    }}
                  />
                </div>

                {/* method */}
                <h3 className="text-[11px] tracking-[0.2em] uppercase mb-4">
                  Shipping Method
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                  {SHIPPING_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setShippingMethod(option.id)}
                      className={`p-5 border text-left transition-colors cursor-pointer ${
                        shippingMethod === option.id
                          ? "border-black dark:border-white"
                          : "border-black/15 dark:border-white/15 hover:border-black/30 dark:hover:border-white/30"
                      }`}
                    >
                      <span className="text-[10px] tracking-[0.2em] uppercase block">
                        {option.name}
                      </span>
                      <span className="text-[10px] text-black/40 dark:text-white/40 tracking-wider mt-1 block">
                        {option.cost === 0
                          ? "Free"
                          : `$${option.cost.toFixed(2)}`}{" "}
                        · {option.time}
                      </span>
                    </button>
                  ))}
                </div>

                <button onClick={() => setStep(3)} className="auth-btn">
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* summary */}
          {step === 3 && (
            <div>
              <h2 className="text-[13px] 2xl:text-[15px] min-[2560px]:text-[18px] tracking-[0.2em] uppercase mb-8">
                Order Summary
              </h2>

              <div className="max-w-lg 2xl:max-w-xl min-[2560px]:max-w-2xl space-y-6">
                {/* Personal */}
                <div className="flex justify-between items-start border-b border-black/10 dark:border-white/10 pb-4">
                  <div>
                    <h3 className="text-[10px] tracking-[0.2em] uppercase text-black/40 dark:text-white/40 mb-1">
                      Contact
                    </h3>
                    <p className="text-[12px] tracking-wider">{email}</p>
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="text-[10px] tracking-wider underline underline-offset-4 cursor-pointer"
                  >
                    Edit
                  </button>
                </div>

                <div className="flex justify-between items-start border-b border-black/10 dark:border-white/10 pb-4">
                  <div>
                    <h3 className="text-[10px] tracking-[0.2em] uppercase text-black/40 dark:text-white/40 mb-1">
                      Shipping Address
                    </h3>
                    <p className="text-[12px] tracking-wider">
                      {firstName} {lastName}
                    </p>
                    <p className="text-[12px] tracking-wider text-black/60 dark:text-white/60">
                      {street}
                    </p>
                    <p className="text-[12px] tracking-wider text-black/60 dark:text-white/60">
                      {city}, {state} {zip}
                    </p>
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="text-[10px] tracking-wider underline underline-offset-4 cursor-pointer"
                  >
                    Edit
                  </button>
                </div>

                <div className="flex justify-between items-start border-b border-black/10 dark:border-white/10 pb-4">
                  <div>
                    <h3 className="text-[10px] tracking-[0.2em] uppercase text-black/40 dark:text-white/40 mb-1">
                      Shipping Method
                    </h3>
                    <p className="text-[12px] tracking-wider">
                      {selectedShipping.name} —{" "}
                      {shippingCost === 0
                        ? "Free"
                        : `$${shippingCost.toFixed(2)}`}
                    </p>
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="text-[10px] tracking-wider underline underline-offset-4 cursor-pointer"
                  >
                    Edit
                  </button>
                </div>

                <div>
                  <h3 className="text-[10px] tracking-[0.2em] uppercase text-black/40 mb-3">
                    Items
                  </h3>
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 py-3 border-b border-black/5 dark:border-white/5"
                    >
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        width={60}
                        height={80}
                        className="object-cover"
                      />
                      <div className="flex-1 flex justify-between items-start">
                        <div>
                          <p className="text-[11px] tracking-wider uppercase">
                            {item.product.name}
                          </p>
                          <p className="text-[10px] text-black/40 dark:text-white/40 tracking-wider">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <span className="text-[11px] tracking-wider">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex justify-between">
                    <span className="text-[10px] tracking-wider text-black/50 dark:text-white/50 uppercase">
                      Subtotal
                    </span>
                    <span className="text-[11px] tracking-wider">
                      ${totalPrice().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[10px] tracking-wider text-black/50 dark:text-white/50 uppercase">
                      Shipping
                    </span>
                    <span className="text-[11px] tracking-wider">
                      {shippingCost === 0
                        ? "Free"
                        : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-black/10 dark:border-white/10">
                    <span className="text-[11px] tracking-[0.2em] uppercase">
                      Total
                    </span>
                    <span className="text-[11px] tracking-wider font-medium">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="auth-btn"
                >
                  {loading
                    ? "Redirecting to payment..."
                    : "Continue to Payment"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* summary bar */}
        <div className="w-full lg:w-[300px] 2xl:w-[380px] min-[2560px]:w-[450px] min-[3840px]:w-[600px] lg:sticky lg:top-8 lg:self-start order-first lg:order-last">
          <h3 className="text-[11px] tracking-[0.2em] uppercase mb-6">
            Your Order
          </h3>

          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-3">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  width={50}
                  height={65}
                  className="object-cover"
                />
                <div className="flex-1">
                  <p className="text-[10px] tracking-wider uppercase">
                    {item.product.name}
                  </p>
                  <p className="text-[10px] text-black/40 dark:text-white/40 tracking-wider">
                    Qty: {item.quantity}
                  </p>
                  <p className="text-[10px] tracking-wider">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-black/10 dark:border-white/10 mt-6 pt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-[10px] tracking-wider text-black/50 dark:text-white/50 uppercase">
                Subtotal
              </span>
              <span className="text-[10px] tracking-wider">
                ${totalPrice().toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[10px] tracking-wider text-black/50 dark:text-white/50 uppercase">
                Shipping
              </span>
              <span className="text-[10px] tracking-wider">
                {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-black/10 dark:border-white/10">
              <span className="text-[11px] tracking-[0.2em] uppercase">
                Total
              </span>
              <span className="text-[11px] tracking-wider font-medium">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
