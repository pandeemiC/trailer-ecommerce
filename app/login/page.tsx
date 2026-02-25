"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import trailerLogo from "@/public/icons/trailer-logo-light.png";
import authImg from "@/public/auth/authimg.jpg";
import Link from "next/link";
import Image from "next/image";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  const handleOAuth = async (provider: "google" | "github") => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="flex min-h-screen">
      {/* left */}
      <div className="w-1/2 flex flex-col items-center justify-center px-20">
        <div className="w-full max-w-sm">
          <Link href="/">
            <Image
              src={trailerLogo}
              alt="Trailer"
              width={430}
              height={360}
              className="mx-auto mb-14"
            />
          </Link>
          {error && (
            <p className="text-red-500 text-[11px] text-center mb-6">{error}</p>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
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

            <button type="submit" disabled={loading} className="auth-btn">
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <div className="flex items-center gap-4 my-8">
            <hr className="flex-1 border-gray-300" />
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">
              or
            </span>
            <hr className="flex-1 border-gray-300" />
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleOAuth("google")}
              className="flex items-center justify-center gap-3 w-full border border-black py-3 text-[11px] tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-colors"
            >
              <FcGoogle size={16} />
              Continue with Google
            </button>
            <button
              onClick={() => handleOAuth("github")}
              className="flex items-center justify-center gap-3 w-full border border-black py-3 text-[11px] tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-colors"
            >
              <FaGithub size={16} />
              Continue with Github
            </button>
          </div>

          <p className="text-center mt-12 text-[11px] tracking-wider text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* right */}
      <div className="w-1/2 relative">
        <Image
          src={authImg}
          alt="Trailer Image"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
