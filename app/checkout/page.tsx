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

  return <div>CheckoutPage</div>;
}
