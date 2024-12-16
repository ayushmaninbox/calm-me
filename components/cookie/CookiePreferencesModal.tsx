"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { setCookie } from "@/utils/cookies";

interface CookiePreferencesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

export function CookiePreferencesModal({ open, onOpenChange, onSave }: CookiePreferencesModalProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
  });

  const handleSave = () => {
    setCookie("cookie-consent", JSON.stringify(preferences), 30);
    onSave();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>cookie preferences</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">
            choose which cookies you allow calm/me to use.
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">necessary cookies</label>
                <p className="text-sm text-muted-foreground">
                  required for the website to function properly. cannot be disabled.
                </p>
              </div>
              <div className="h-6 w-11 bg-yellow-500 rounded-full relative">
                <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">analytics cookies</label>
                <p className="text-sm text-muted-foreground">
                  help us understand how visitors interact with our website.
                </p>
              </div>
              <button
                onClick={() => setPreferences(prev => ({ ...prev, analytics: !prev.analytics }))}
                className={`h-6 w-11 rounded-full relative transition-colors ${
                  preferences.analytics ? 'bg-yellow-500' : 'bg-gray-200'
                }`}
              >
                <div
                  className={`absolute top-1 h-4 w-4 bg-white rounded-full transition-all ${
                    preferences.analytics ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            {showDetails ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" /> Hide Details
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" /> Show Details
              </>
            )}
          </button>

          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="space-y-4 pt-4 border-t border-border">
                  <div>
                    <h4 className="font-medium mb-2">analytics cookies collect the following information:</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      <li>pages visited and time spent</li>
                      <li>anonymous usage patterns</li>
                      <li>basic device information</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-yellow-500 hover:bg-yellow-600 text-black"
          >
            save preferences
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}