"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

import Select from "react-select";
import countryList from "country-list";

export default function AccountDetails() {
  const supabase = createClient();

  // 1ST BATCH
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // 2ND BATCh
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email ?? "");

        const meta = user.user_metadata;
        // for oauth
        setFirstName(meta?.first_name ?? meta?.full_name?.split(" ")[0] ?? "");
        setLastName(
          meta?.last_name ??
            meta?.full_name?.split(" ").slice(1).join(" ") ??
            "",
        );
        setPhone(meta?.phone ?? "");
        // 2nd batch (addy)
        const addy = meta?.address ?? "";
        setStreet(addy.street ?? "");
        setCity(addy.city ?? "");
        setState(addy.state ?? "");
        setZip(addy.zip ?? "");
        setCountry(addy.country ?? "");
      }
    };
    getUser();
  }, [supabase]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    const { error } = await supabase.auth.updateUser({
      data: {
        first_name: firstName,
        last_name: lastName,
        phone,
        address: { street, city, state, zip, country },
      },
    });

    setLoading(false);
    if (!error) setSaved(true);
  };

  const getFlagEmoji = (countryCode: string) => {
    return countryCode
      .toUpperCase()
      .split("")
      .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
      .join("");
  };

  const countryOptions = countryList.getData().map((c) => ({
    value: c.code,
    label: `${getFlagEmoji(c.code)} ${c.name}`,
  }));

  return (
    <div>
      <h1 className="text-[22px] font-light tracking-[0.2em] uppercase mb-10">
        My Details
      </h1>

      <form onSubmit={handleSave} className="max-w-2xl">
        {/* PERSONAL INFO */}
        <h2 className="text-[13px] tracking-[0.2em] uppercase mb-6">
          Personal Information
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
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

        <p className="auth-input border-none text-gray-400 cursor-not-allowed mb-4">
          {email || "Email"}
        </p>

        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="auth-input mb-10"
        />

        {/* ADDY */}
        <h2 className="text-[13px] tracking-[0.2em] uppercase mb-6">Address</h2>

        <input
          type="text"
          placeholder="Street Address"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          className="auth-input mb-4"
        />

        <div className="grid grid-cols-2 gap-4 mb-4">
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

        <div className="grid grid-cols-2 gap-4 mb-8">
          <input
            type="text"
            placeholder="Zip / Postal Code"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            className="auth-input"
          />
          <Select
            options={countryOptions}
            value={countryOptions.find((c) => c.value === country) || null}
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
              option: (base, optionState) => ({
                ...base,
                fontSize: "12px",
                letterSpacing: "0.05em",
                backgroundColor: optionState.isFocused ? "#f3f4f6" : "white",
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
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="w-[200px] py-3 text-white bg-black border border-black uppercase text-[11px] tracking-widest font-light hover:bg-black/80 transition-colors cursor-pointer disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          {saved && (
            <span className="text-[11px] text-green-600 tracking-wider">
              Changes saved successfully.
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
