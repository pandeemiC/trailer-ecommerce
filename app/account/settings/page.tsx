"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

import { BsBell } from "react-icons/bs";
import { CiLock } from "react-icons/ci";

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
      } = await supabase.auth.getUser();
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
      {/* PW  */}
      <div className="max-w-2xl flex flex-col gap-12">
        <section>
          <div className="flex flex-row gap-4">
            <CiLock size={18} />
            <h2 className="text-[13px] tracking-[0.2em] uppercase mb-6">
              Change password
            </h2>
          </div>

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
            <input
              type="password"
              value={newPassword}
              placeholder="New Password"
              onChange={(e) => setNewPassword(e.target.value)}
              className="auth-input"
            />

            <input
              type="password"
              value={confirmNewPassword}
              placeholder="Confirm New Password"
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="auth-input"
            />

            <button
              type="submit"
              className="w-[200px] py-3 mt-2 text-white bg-black border border-black uppercase text-[11px] tracking-widest font-light hover:bg-black/80 transition-colors"
            >
              {passwordLoading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </section>

        {/* NOTIFS */}
        <section>
          <div className="flex flex-row gap-4">
            <BsBell size={18} />
            <h2 className="text-[13px] tracking-[0.2em] uppercase mb-6">
              Notifications
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-[12px] tracking-wider">Order Updates</span>
              <input
                type="checkbox"
                checked={orderEmails}
                onChange={(e) => {
                  setOrderEmails(e.target.checked);
                  handleSaveNotifications();
                }}
                className="w-4 h-4 accent-black cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-[12px] tracking-wider">
                Promotional Emails
              </span>
              <input
                type="checkbox"
                checked={marketingEmails}
                onChange={(e) => {
                  setMarketingEmails(e.target.checked);
                  handleSaveNotifications();
                }}
                className="w-4 h-4 accent-black cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-[12px] tracking-wider">Newsletter</span>
              <input
                type="checkbox"
                checked={newsletter}
                onChange={(e) => {
                  setNewsletter(e.target.checked);
                  handleSaveNotifications();
                }}
                className="w-4 h-4 accent-black cursor-pointer"
              />
            </label>
          </div>
        </section>

        {/* DELETE ACC */}
        <section>
          <h2 className="text-[13px] tracking-[0.2em] uppercase mb-6 text-red-600">
            Danger Zone
          </h2>

          {!showDeleteConfirm ? (
            <button
              className="w-[200px] py-3 text-red-600 border border-red-600 uppercase text-[11px] tracking-widest font-light hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
              onClick={() => setShowDeleteConfirm(true)}
            >
              Delete Account
            </button>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="text-[12px] tracking-wider text-gray-500">
                Are you sure? This action cannot be reversed. All your data will
                be lost.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-6 py-3 border border-black uppercase text-[11px] tracking-widest font-light hover:bg-black hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    await supabase.auth.signOut();
                    router.push("/");
                  }}
                  className="px-6 py-3 bg-red-600 text-white border border-red-600 uppercase text-[11px] tracking-widest font-light hover:bg-red-700 transition-colors cursor-pointer"
                >
                  Delete My Account
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
