"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { CookiePreferencesModal } from "./CookiePreferencesModal";
import { setCookie, getCookie } from "@/utils/cookies";

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    // Check if cookie consent exists
    const consent = getCookie("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const preferences = {
      necessary: true,
      analytics: true,
    };
    setCookie("cookie-consent", JSON.stringify(preferences), 30);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const preferences = {
      necessary: true,
      analytics: false,
    };
    setCookie("cookie-consent", JSON.stringify(preferences), 30);
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t border-border z-50"
        >
          <div className="max-w-screen-xl mx-auto flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              we use cookies (yummy) to enhance your experience and improve our services.{" "}
              <button
                onClick={() => setShowPreferences(true)}
                className="text-yellow-500 hover:text-yellow-600 underline-offset-4 hover:underline"
              >
                manage preferences
              </button>
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRejectAll}
              >
                reject all
              </Button>
              <Button
                size="sm"
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
                onClick={handleAcceptAll}
              >
                accept all
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      <CookiePreferencesModal
        open={showPreferences}
        onOpenChange={setShowPreferences}
        onSave={() => setShowBanner(false)}
      />
    </AnimatePresence>
  );
}