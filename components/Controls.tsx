"use client";

import { useVoice } from "@humeai/voice-react";
import { Button } from "./ui/button";
import { Mic, MicOff, Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils";

export default function Controls() {
  const { disconnect, status, isMuted, unmute, mute } = useVoice();

  return (
    <AnimatePresence>
      {status.value === "connected" && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className={cn(
            "fixed bottom-0 left-0 w-full p-6",
            "bg-gradient-to-t from-background via-background/95 to-transparent"
          )}
        >
          <div className="max-w-md mx-auto flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "h-12 w-12 rounded-full transition-all duration-300",
                !isMuted && "bg-yellow-500 text-black hover:bg-yellow-600",
                isMuted && "bg-destructive text-destructive-foreground hover:bg-destructive/90"
              )}
              onClick={() => {
                if (isMuted) {
                  unmute();
                } else {
                  mute();
                }
              }}
            >
              {isMuted ? (
                <MicOff className="h-5 w-5" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </Button>

            <Button
              variant="destructive"
              size="icon"
              className="h-12 w-12 rounded-full"
              onClick={() => disconnect()}
            >
              <Phone className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}