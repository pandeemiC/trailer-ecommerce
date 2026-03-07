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

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 md:px-16 pt-8 pb-20 flex flex-col lg:flex-row gap-8 lg:gap-16">
        <div className="flex-1">
          {step === 1 && (
            <div>
              <h2 className="text-[13px] tracking-[0.2em] uppercase mb-8">
                Personal Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {/* Sign In box */}
                <button
                  onClick={() => setAuthMode("signin")}
                  className={`p-6 border text-left transition-colors ${
                    authMode === "signin"
                      ? "border-black"
                      : "border-black/15 hover:border-black/30"
                  }`}
                >
                  <span className="text-[11px] tracking-[0.2em] uppercase font-light">
                    Sign In
                  </span>
                  <p className="text-[10px] text-black/40 tracking-wider mt-1">
                    Use your existing account
                  </p>
                </button>

                {/* Guest box */}
                <button
                  onClick={() => setAuthMode("guest")}
                  className={`p-6 border text-left transition-colors ${
                    authMode === "guest"
                      ? "border-black"
                      : "border-black/15 hover:border-black/30"
                  }`}
                >
                  <span className="text-[11px] tracking-[0.2em] uppercase font-light">
                    Continue as Guest
                  </span>
                  <p className="text-[10px] text-black/40 tracking-wider mt-1">
                    No account needed
                  </p>
                </button>
              </div>

              {/* signin */}
              {authMode === "signin" && (
                <div className="max-w-sm">
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
                    <hr className="flex-1 border-gray-300" />
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                      or
                    </span>
                    <hr className="flex-1 border-gray-300" />
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => handleOAuth("google")}
                      className="flex items-center justify-center gap-3 w-full border border-black py-3 text-[11px] tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-colors cursor-pointer"
                    >
                      <FcGoogle size={16} /> Continue with Google
                    </button>
                    <button
                      onClick={() => handleOAuth("github")}
                      className="flex items-center justify-center gap-3 w-full border border-black py-3 text-[11px] tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-colors cursor-pointer"
                    >
                      <FaGithub size={16} /> Continue with Github
                    </button>
                  </div>
                </div>
              )}

              {/* guest */}
              {authMode === "guest" && (
                <div className="max-w-sm">
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
                  className="auth-btn max-w-sm mt-6"
                >
                  Continue
                </button>
              )}
            </div>
          )}

          {/* shipping */}
          {step === 2 && (
            <div>
              <h2 className="text-[13px] tracking-[0.2em] uppercase mb-8">
                Shipping Details
              </h2>

              <div className="max-w-lg">
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
                          ? "border-black"
                          : "border-black/15 hover:border-black/30"
                      }`}
                    >
                      <span className="text-[10px] tracking-[0.2em] uppercase block">
                        {option.name}
                      </span>
                      <span className="text-[10px] text-black/40 tracking-wider mt-1 block">
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
              <h2 className="text-[13px] tracking-[0.2em] uppercase mb-8">
                Order Summary
              </h2>

              <div className="max-w-lg space-y-6">
                {/* Personal */}
                <div className="flex justify-between items-start border-b border-black/10 pb-4">
                  <div>
                    <h3 className="text-[10px] tracking-[0.2em] uppercase text-black/40 mb-1">
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

                <div className="flex justify-between items-start border-b border-black/10 pb-4">
                  <div>
                    <h3 className="text-[10px] tracking-[0.2em] uppercase text-black/40 mb-1">
                      Shipping Address
                    </h3>
                    <p className="text-[12px] tracking-wider">
                      {firstName} {lastName}
                    </p>
                    <p className="text-[12px] tracking-wider text-black/60">
                      {street}
                    </p>
                    <p className="text-[12px] tracking-wider text-black/60">
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

                <div className="flex justify-between items-start border-b border-black/10 pb-4">
                  <div>
                    <h3 className="text-[10px] tracking-[0.2em] uppercase text-black/40 mb-1">
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
                      className="flex gap-4 py-3 border-b border-black/5"
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
                          <p className="text-[10px] text-black/40 tracking-wider">
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
                    <span className="text-[10px] tracking-wider text-black/50 uppercase">
                      Subtotal
                    </span>
                    <span className="text-[11px] tracking-wider">
                      ${totalPrice().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[10px] tracking-wider text-black/50 uppercase">
                      Shipping
                    </span>
                    <span className="text-[11px] tracking-wider">
                      {shippingCost === 0
                        ? "Free"
                        : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-black/10">
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
        <div className="w-full lg:w-[300px] lg:sticky lg:top-8 lg:self-start order-first lg:order-last">
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
                  <p className="text-[10px] text-black/40 tracking-wider">
                    Qty: {item.quantity}
                  </p>
                  <p className="text-[10px] tracking-wider">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-black/10 mt-6 pt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-[10px] tracking-wider text-black/50 uppercase">
                Subtotal
              </span>
              <span className="text-[10px] tracking-wider">
                ${totalPrice().toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[10px] tracking-wider text-black/50 uppercase">
                Shipping
              </span>
              <span className="text-[10px] tracking-wider">
                {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-black/10">
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
