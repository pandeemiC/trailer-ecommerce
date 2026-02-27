"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AccountSettings() {
  const supabase = createClient();
  const router = useRouter();
  // 1st batch
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  // 2nd batch
  const [orderEmails, setOrderEmails] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  // 3rd batch
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const getPrefs = async () => {
      const {
        data: { user },
      } = await supabase.getUser();
      if (user) {
        const prefs = user.user_metadata?.notifications ?? {};
        setOrderEmails(prefs.orderEmails ?? true);
        setMarketingEmails(prefs.marketingEmails ?? false);
        setNewsletter(prefs.newsletter ?? false);
      }
    };
    getPrefs();
  }, [supabase]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess(false);

    if (newPassword !== confirmNewPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }

    setPasswordLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    setPasswordLoading(false);

    if (error) {
      setPasswordError(error.message);
    } else {
      setPasswordSuccess(true);
      setNewPassword("");
      setConfirmNewPassword("");
    }
  };

  const handleSaveNotifications = async () => {
    await supabase.auth.updateUser({
      data: {
        notifications: { orderEmails, marketingEmails, newsletter },
      },
    });
  };

  return (
    <div>
      <h1 className="text-[22px] font-light tracking-[0.2em] uppercase mb-10">
        Settings
      </h1>
      {/* PW RESET */}
      <div className="max-w-2xl flex flex-col gap-12">
        <section>
          <h2 className="text-[13px] tracking-[0.2em] uppercase mb-6">
            Change password
          </h2>

          {passwordError && (
            <p className="text-[11px] text-red-500 tracking-wider mb-4">
              {passwordError}
            </p>
          )}

          {passwordSuccess && (
            <p className="text-[11px] text-green-600 tracking-wider mb-4">
              Password updated successfully.
            </p>
          )}

          <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
            <input type="password" />
          </form>
        </section>
      </div>
    </div>
  );
}
