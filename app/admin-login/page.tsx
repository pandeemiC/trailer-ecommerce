"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkExistingSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: admin } = await supabase
          .from("admin_users")
          .select("id")
          .eq("id", user.id)
          .single();

        if (admin) {
          router.push("/admin");
          router.refresh();
          return;
        }
      }

      setChecking(false);
    };
    checkExistingSession();
  }, [supabase, router]);

  const handleOAuth = async (provider: "google" | "github") => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/admin`,
      },
    });
  };

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
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Authentication failed.");
      setLoading(false);
      return;
    }

    const { data: admin } = await supabase
      .from("admin_users")
      .select("id")
      .eq("id", user.id)
      .single();

    if (!admin) {
      await supabase.auth.signOut();
      setError("Access denied. You are not an administrator.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-[12px] tracking-widest uppercase text-gray-400">
          Verifying...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center gap-3 mb-12">
          <span className="text-[32px] font-bold tracking-[0.35em] uppercase">
            TRAILER
          </span>
          <div className="flex items-center gap-1.5 bg-black text-white text-[10px] font-light tracking-widest uppercase px-3 py-1.5 rounded-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            Admin Panel
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-[11px] text-center mb-6">{error}</p>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Admin Email"
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
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-white bg-black border border-black uppercase text-[11px] tracking-widest font-light hover:bg-black/80 transition-colors cursor-pointer disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Access Dashboard"}
          </button>
        </form>

        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-[10px] tracking-widest uppercase text-gray-400">
            or
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleOAuth("google")}
            className="flex items-center justify-center gap-3 w-full border border-black py-3 text-[11px] tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-colors cursor-pointer"
          >
            <FcGoogle size={16} />
            Continue with Google
          </button>
          <button
            onClick={() => handleOAuth("github")}
            className="flex items-center justify-center gap-3 w-full border border-black py-3 text-[11px] tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-colors cursor-pointer"
          >
            <FaGithub size={16} />
            Continue with Github
          </button>
        </div>

        <p className="text-center mt-8 text-[10px] tracking-wider text-gray-300">
          Authorized personnel only
        </p>
      </div>
    </div>
  );
}
