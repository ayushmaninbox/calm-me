"use client";

import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Messages";
import Controls from "./Controls";
import StartCall from "./StartCall";
import { ComponentRef, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThreeAudioVisualizer } from "./ThreeAudioVisualizer";

export default function Chat({ accessToken }: { accessToken: string }) {
  const timeout = useRef<number | null>(null);
  const ref = useRef<ComponentRef<typeof Messages> | null>(null);
  const configId = process.env['NEXT_PUBLIC_HUME_CONFIG_ID'];
  
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-yellow-500/5 to-background">
      <div className="max-w-4xl mx-auto w-full px-4 py-8 h-full flex flex-col">
        <VoiceProvider
          auth={{ type: "accessToken", value: accessToken }}
          configId={configId}
          onMessage={() => {
            if (timeout.current) {
              window.clearTimeout(timeout.current);
            }

            timeout.current = window.setTimeout(() => {
              if (ref.current) {
                const scrollHeight = ref.current.scrollHeight;
                ref.current.scrollTo({
                  top: scrollHeight,
                  behavior: "smooth",
                });
              }
            }, 200);
          }}
        >
          {/* Audio Visualizer Container */}
          <AnimatePresence mode="wait">
            <motion.div 
              className="h-[400px] mb-8 relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ 
                duration: 0.5,
                ease: "easeOut"
              }}
            >
              <ThreeAudioVisualizer />
            </motion.div>
          </AnimatePresence>

          {/* Messages Container */}
          <div className="relative grow flex flex-col overflow-hidden">
            <Messages ref={ref} />
            <Controls />
            <StartCall />
          </div>
        </VoiceProvider>
      </div>
    </div>
  );
}