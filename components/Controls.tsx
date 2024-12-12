"use client";

import { useVoice } from "@humeai/voice-react";
import { Button } from "./ui/button";
import { Mic, MicOff, Phone } from 'lucide-react';
import { AnimatePresence, motion } from "framer-motion";
import { Toggle } from "./ui/toggle";
import MicFFT from "./MicFFT";
import { cn } from "@/utils";
import { useEffect, useState } from "react";
import { EndCallDialog } from "./EndCallDialog";
import { KeyboardShortcuts } from "./KeyboardShortcuts";

export default function Controls() {
  const { disconnect, status, isMuted, unmute, mute, micFft } = useVoice();
  const [showEndCallDialog, setShowEndCallDialog] = useState(false);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (status.value === "connected") {
        // Space bar toggles mute
        if (event.code === "Space") {
          event.preventDefault();
          if (isMuted) {
            unmute();
          } else {
            mute();
          }
        }
        // Escape key shows end call dialog
        if (event.code === "Escape") {
          event.preventDefault();
          setShowEndCallDialog(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [status, isMuted, unmute, mute]);

  const handleEndCall = () => {
    setShowEndCallDialog(true);
  };

  const handleConfirmEndCall = () => {
    disconnect();
    setShowEndCallDialog(false);
  };

  return (
    <>
      <AnimatePresence>
        {status.value === "connected" && <KeyboardShortcuts />}
      </AnimatePresence>

      <div
        className={cn(
          "fixed bottom-0 left-0 w-full flex flex-col items-center justify-end pb-4",
          "bg-gradient-to-t from-card via-card/90 to-card/0"
        )}
      >
        <AnimatePresence>
          {status.value === "connected" && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ 
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="p-4 bg-card/95 backdrop-blur-sm border border-border rounded-2xl shadow-lg flex items-center gap-6"
            >
              <Toggle
                pressed={!isMuted}
                onPressedChange={() => {
                  if (isMuted) {
                    unmute();
                  } else {
                    mute();
                  }
                }}
                className="h-12 w-12 rounded-full bg-muted data-[state=on]:bg-yellow-500 data-[state=on]:text-black transition-colors duration-300"
              >
                {isMuted ? (
                  <MicOff className="h-5 w-5" />
                ) : (
                  <Mic className="h-5 w-5" />
                )}
              </Toggle>

              <div className="relative h-12 w-64">
                <MicFFT 
                  fft={micFft} 
                  className="fill-current opacity-50 data-[active=true]:opacity-100 transition-opacity duration-300"
                  data-active={!isMuted}
                />
              </div>

              <Button
                className="h-12 px-6 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors duration-300"
                onClick={handleEndCall}
              >
                <Phone className="h-5 w-5 mr-2" />
                end call
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <EndCallDialog 
        isOpen={showEndCallDialog}
        onClose={() => setShowEndCallDialog(false)}
        onConfirm={handleConfirmEndCall}
      />
    </>
  );
}