"use client";

import { FormEvent, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function NotificationPreferences() {
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Processing Request...", {
      position: "top-center",
    });
    setTimeout(() => {
      toast.dismiss(toastId);
      toast.success("Preferences saved successfully", {
        position: "top-center",
      });
      setLoading(false);
    }, 2000);
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-6 mb-3">
      <div className="rounded-lg border shadow p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold">Marketing Emails</h3>
            <p className="text-sm text-muted-foreground">
              Receive emails about new products, features, and more.
            </p>
          </div>
          <Switch
            checked={marketingEmails}
            onCheckedChange={setMarketingEmails}
          />
        </div>
      </div>

      <div className="rounded-lg border shadow p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold">Email Notifications</h3>
            <p className="text-sm text-muted-foreground">
              Receive notifications about your account activity.
            </p>
          </div>
          <Switch
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />
        </div>
      </div>

      <div className="rounded-lg border shadow p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold">Security Emails</h3>
            <p className="text-sm text-muted-foreground">
              Receive emails about your account security.
            </p>
          </div>
          <Switch checked={true} disabled />
        </div>
      </div>

      <div className="rounded-lg border shadow p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold">Cookies</h3>
            <p className="text-sm text-muted-foreground">
              Essential cookies for site functionality.
            </p>
          </div>
          <Switch checked={true} disabled />
        </div>
      </div>

      <div className="md:col-span-2 flex justify-end">
        <Button
          type="submit"
          disabled={loading}
          className="disabled:bg-muted disabled:text-muted-foreground">
          {loading ? "Saving....." : "Save preferences"}
        </Button>
      </div>
    </form>
  );
}
