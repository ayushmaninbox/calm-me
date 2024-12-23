"use client";

import { useVoice } from "@humeai/voice-react";
import { Button } from "./ui/button";
import { Mic, MicOff, Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Toggle } from "./ui/toggle";
import MicFFT from "./MicFFT";
import { cn } from "@/utils";
import { useEffect, useState } from "react";
import { EndCallDialog } from "./EndCallDialog";
import { KeyboardShortcuts } from "./KeyboardShortcuts";

export default function Controls({ isMobile }: { isMobile: boolean }) {
  const { disconnect, status, isMuted, unmute, mute, micFft } = useVoice();
  const [showEndCallDialog, setShowEndCallDialog] = useState(false);

  // Keyboard shortcuts - only for desktop
  useEffect(() => {
    if (isMobile) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      if (status.value === "connected") {
        if (event.code === "Space") {
          event.preventDefault();
          if (isMuted) unmute();
          else mute();
        }
        if (event.code === "Escape") {
          event.preventDefault();
          setShowEndCallDialog(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [status, isMuted, unmute, mute, isMobile]);

  if (status.value !== "connected") return null;

  return (
    <>
      {!isMobile && <KeyboardShortcuts />}

      {isMobile ? (
        // Mobile Controls
        <div className="fixed bottom-0 left-0 w-full flex justify-between px-6 py-4 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="pointer-events-auto"
          >
            <Button
              size="icon"
              variant={isMuted ? "outline" : "default"}
              onClick={() => isMuted ? unmute() : mute()}
              className={cn(
                "h-12 w-12 rounded-full shadow-lg",
                !isMuted && "bg-yellow-500 hover:bg-yellow-600 text-black"
              )}
            >
              {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="pointer-events-auto"
          >
            <Button
              size="icon"
              variant="destructive"
              onClick={() => setShowEndCallDialog(true)}
              className="h-12 w-12 rounded-full shadow-lg"
            >
              <Phone className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      ) : (
        // Desktop Controls
        <div className="fixed bottom-0 left-0 w-full flex justify-center pb-4">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="p-4 bg-card/95 backdrop-blur-sm border border-border rounded-2xl shadow-lg flex items-center gap-6"
          >
            <Toggle
              pressed={!isMuted}
              onPressedChange={() => isMuted ? unmute() : mute()}
              className="h-12 w-12 rounded-full bg-muted data-[state=on]:bg-yellow-500 data-[state=on]:text-black transition-colors duration-300"
            >
              {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
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
              onClick={() => setShowEndCallDialog(true)}
            >
              <Phone className="h-5 w-5 mr-2" />
              end call
            </Button>
          </motion.div>
        </div>
      )}

      <EndCallDialog
        isOpen={showEndCallDialog}
        onClose={() => setShowEndCallDialog(false)}
        onConfirm={() => {
          disconnect();
          setShowEndCallDialog(false);
        }}
      />
    </>
  );
}