"use client";

import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Messages";
import Controls from "./Controls";
import StartCall from "./StartCall";
import { ThreeAudioVisualizer } from "./ThreeAudioVisualizer";
import { LoadingScreen } from "./LoadingScreen";
import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Chat({ accessToken }: { accessToken: string }) {
  const configId = process.env['NEXT_PUBLIC_HUME_CONFIG_ID'];
  
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-yellow-500/5 to-background">
      <div className="max-w-4xl mx-auto w-full px-4 py-8 h-full flex flex-col">
        <VoiceProvider
          auth={{ type: "accessToken", value: accessToken }}
          configId={configId}
        >
          <ChatContent />
        </VoiceProvider>
      </div>
    </div>
  );
}

function ChatContent() {
  const { status } = useVoice();
  const isConnecting = status.value === "connecting";
  const isConnected = status.value === "connected";

  return (
    <>
      {/* Audio Visualizer Container */}
      <AnimatePresence mode="wait">
        {isConnected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="h-[300px] mb-4 relative"
          >
            <ThreeAudioVisualizer />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages Container */}
      <div className="relative grow flex flex-col">
        <Messages />
        <Controls />
        <StartCall />
        
        {/* Loading Screen Overlay */}
        <AnimatePresence>
          {isConnecting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-50"
            >
              <LoadingScreen />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}