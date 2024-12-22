// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Messages";
import Controls from "./Controls";
import StartCall from "./StartCall";
import { ThreeAudioVisualizer } from "./ThreeAudioVisualizer";
import { LoadingScreen } from "./LoadingScreen";
import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useVoicePreference } from "@/hooks/useVoicePreference";

interface VoiceConfig {
  FEMALE: string;
  MALE: string;
}

export default function Chat({ accessToken }: { accessToken: string }) {
  const { selectedVoice, setVoicePreference } = useVoicePreference();
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const voiceConfig: VoiceConfig = {
    FEMALE: process.env.NEXT_PUBLIC_FEMALE_VOICE_CONFIG_ID || '',
    MALE: process.env.NEXT_PUBLIC_MALE_VOICE_CONFIG_ID || '',
  };

  const configId = selectedVoice ? voiceConfig[selectedVoice] : '';
  
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-yellow-500/5 to-background">
      <div className="max-w-4xl mx-auto w-full px-4 py-8 h-full flex flex-col">
        <VoiceProvider
          auth={{ type: "accessToken", value: accessToken }}
          configId={configId}
        >
          <ChatContent 
            isMobile={isMobile} 
            voiceConfig={voiceConfig} 
            selectedVoice={selectedVoice}
            onVoiceSelect={setVoicePreference}
          />
        </VoiceProvider>
      </div>
    </div>
  );
}

interface ChatContentProps {
  isMobile: boolean;
  voiceConfig: VoiceConfig;
  selectedVoice: string | null;
  onVoiceSelect: (voice: keyof VoiceConfig) => void;
}

function ChatContent({ isMobile, voiceConfig, selectedVoice, onVoiceSelect }: ChatContentProps) {
  const { status } = useVoice();
  const isConnecting = status.value === "connecting";
  const isConnected = status.value === "connected";

  return (
    <>
      <AnimatePresence mode="wait">
        {isConnected && (
          <motion.div
            key="visualizer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="h-[300px] mb-4 relative"
          >
            <ThreeAudioVisualizer />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative grow flex flex-col">
        <Messages />
        <Controls isMobile={isMobile} />
        <StartCall 
          voiceConfig={voiceConfig} 
          onVoiceSelect={onVoiceSelect}
          selectedVoice={selectedVoice}
        />
        
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