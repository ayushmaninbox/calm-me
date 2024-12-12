"use client";

import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { Mic } from "lucide-react";

export default function StartCall() {
  const { status, connect } = useVoice();

  const handleStartSession = async () => {
    try {
      // Start connection immediately
      await connect();
    } catch (error) {
      console.error("Failed to start session:", error);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {status.value !== "connected" && status.value !== "connecting" ? (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-background via-background to-background/95 backdrop-blur-sm z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="max-w-md w-full mx-4 text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated Microphone Icon */}
            <motion.div
              className="relative w-40 h-40 mx-auto mb-8"
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Outer Ring */}
              <motion.div
                className="absolute inset-0 rounded-full bg-yellow-500/10"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.2, 0.5]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Inner Ring */}
              <motion.div
                className="absolute inset-4 rounded-full bg-yellow-500/20"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 0.3, 0.7]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2
                }}
              />
              
              {/* Mic Icon Container */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Mic className="w-16 h-16 text-yellow-500" />
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4">ready to talk?</h2>
              <p className="text-muted-foreground mb-8 text-lg">
                your AI therapist is here to listen and support you
              </p>
            </motion.div>

            {/* Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Button
                className="w-full max-w-xs h-14 text-lg bg-yellow-500 hover:bg-yellow-600 text-black rounded-full transition-all duration-300 hover:scale-105"
                onClick={handleStartSession}
              >
                <Mic className="w-5 h-5 mr-2" />
                begin session
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}