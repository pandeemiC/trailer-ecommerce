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

  return <div>CheckoutPage</div>;
}
