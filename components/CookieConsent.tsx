"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import Link from "next/link";

const COOKIE_EXPIRY_DAYS = 7;

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    analytics: false
  });

  useEffect(() => {
    // Check if user has already made cookie choices and if they're still valid
    const consentData = localStorage.getItem("cookieConsent");
    const consentTimestamp = localStorage.getItem("cookieConsentTimestamp");
    
    const shouldShowConsent = () => {
      if (!consentData || !consentTimestamp) return true;
      
      const timestamp = parseInt(consentTimestamp);
      const now = Date.now();
      const daysSinceConsent = (now - timestamp) / (1000 * 60 * 60 * 24);
      
      return daysSinceConsent >= COOKIE_EXPIRY_DAYS;
    };

    if (shouldShowConsent()) {
      // Show banner after a small delay for better UX
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsentPreferences = (preferences: string) => {
    localStorage.setItem("cookieConsent", preferences);
    localStorage.setItem("cookieConsentTimestamp", Date.now().toString());
    setShowConsent(false);
  };

  const handleAcceptAll = () => {
    setCookiePreferences({
      necessary: true,
      analytics: true
    });
    saveConsentPreferences("all");
  };

  const handleRejectAll = () => {
    setCookiePreferences({
      necessary: true,
      analytics: false
    });
    saveConsentPreferences("necessary");
  };

  const handleSavePreferences = () => {
    saveConsentPreferences(cookiePreferences.analytics ? "all" : "necessary");
  };

  const togglePreferences = () => {
    setShowPreferences(!showPreferences);
    setShowDetails(false);
  };

  if (!showConsent) return null;

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/80 backdrop-blur-sm"
        >
          {/* Main Banner */}
          {!showPreferences && (
            <motion.div
              className="max-w-6xl mx-auto bg-card border border-border rounded-lg p-4 shadow-lg"
              layout
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <p className="text-sm flex-grow">
                  we use cookies (yummy) to enhance your experience and improve our services.{" "}
                  <button
                    onClick={togglePreferences}
                    className="text-yellow-500 hover:text-yellow-600 underline"
                  >
                    manage preferences
                  </button>
                </p>
                <div className="flex gap-2 w-full md:w-auto">
                  <Button
                    variant="outline"
                    onClick={handleRejectAll}
                    className="flex-1 md:flex-none"
                  >
                    reject all
                  </Button>
                  <Button
                    onClick={handleAcceptAll}
                    className="flex-1 md:flex-none bg-yellow-500 hover:bg-yellow-600 text-black"
                  >
                    accept all
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Preferences Dialog */}
          {showPreferences && (
            <motion.div
              className="max-w-2xl mx-auto bg-card border border-border rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">cookie preferences</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  choose which cookies you allow calmi inc. to use. preferences expire after {COOKIE_EXPIRY_DAYS} days.
                </p>

                {/* Cookie Options */}
                <div className="space-y-4">
                  {/* Necessary Cookies */}
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">necessary cookies</div>
                      <div className="w-11 h-6 bg-yellow-500 rounded-full relative">
                        <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      required for the website to function properly. cannot be disabled.
                    </p>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">analytics cookies</div>
                      <button
                        onClick={() =>
                          setCookiePreferences(prev => ({
                            ...prev,
                            analytics: !prev.analytics
                          }))
                        }
                        className={`w-11 h-6 rounded-full transition-colors relative ${
                          cookiePreferences.analytics
                            ? "bg-yellow-500"
                            : "bg-muted"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${
                            cookiePreferences.analytics ? "right-1" : "left-1"
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      help us understand how visitors interact with our website using posthog analytics.
                    </p>
                    <button
                      onClick={() => setShowDetails(!showDetails)}
                      className="text-sm text-yellow-500 hover:text-yellow-600 flex items-center gap-1"
                    >
                      {showDetails ? "Hide" : "Show"} Details
                      {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>

                    <AnimatePresence>
                      {showDetails && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 space-y-2">
                            <div className="flex gap-2 text-sm text-muted-foreground">
                              <Info size={16} className="shrink-0 mt-0.5" />
                              <div>
                                <div className="font-medium text-foreground mb-2">
                                  analytics cookies collect the following information:
                                </div>
                                <ul className="list-disc pl-4 space-y-1">
                                  <li>pages visited and time spent</li>
                                  <li>anonymous usage patterns</li>
                                  <li>basic device information</li>
                                  <li>approximate geographic location (country level)</li>
                                </ul>
                                <p className="mt-4">
                                  we use posthog analytics, which processes data within the eu. data is
                                  retained for 24 months. you can revoke consent at any time in the
                                  account page or by clearing your cookies.
                                </p>
                                <p className="mt-4">
                                  view our{" "}
                                  <Link
                                    href="/privacy-policy"
                                    className="text-yellow-500 hover:text-yellow-600 underline"
                                  >
                                    privacy policy
                                  </Link>{" "}
                                  for more details about how we handle your data.
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={handleRejectAll}
                    className="flex-1"
                  >
                    reject all
                  </Button>
                  <Button
                    onClick={handleSavePreferences}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black"
                  >
                    save preferences
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}