// @ts-nocheck
"use client";

import { useVoice } from "@humeai/voice-react";
import Expressions from "./Expressions";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function Messages() {
  const { messages, status, isMuted } = useVoice();
  const [currentMessages, setCurrentMessages] = useState({
    user: null,
    assistant: null
  });
  const [isListening, setIsListening] = useState(false);
  const micStreamRef = useRef<MediaStream | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    let audioContext: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let animationFrame: number;

    const setupMicAnalysis = async () => {
      if (status.value === "connected" && !isMuted) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          micStreamRef.current = stream;
          
          audioContext = new AudioContext();
          analyser = audioContext.createAnalyser();
          const microphone = audioContext.createMediaStreamSource(stream);
          microphone.connect(analyser);
          analyser.fftSize = 256;
          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);

          const checkAudioLevel = () => {
            if (!analyser) return;
            analyser.getByteFrequencyData(dataArray);
            const average = dataArray.reduce((a, b) => a + b) / bufferLength;
            setIsListening(average > 30);
            animationFrame = requestAnimationFrame(checkAudioLevel);
          };

          checkAudioLevel();
        } catch (err) {
          console.error("Error accessing microphone:", err);
        }
      }
    };

    if (status.value === "connected") {
      setupMicAnalysis();
    }

    return () => {
      if (audioContext) {
        audioContext.close();
      }
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach(track => track.stop());
        micStreamRef.current = null;
      }
    };
  }, [status.value, isMuted]);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      
      if (lastMessage.type === "user_message") {
        setCurrentMessages(prev => ({ ...prev, user: lastMessage }));
      } else if (lastMessage.type === "assistant_message") {
        setCurrentMessages(prev => ({ ...prev, assistant: lastMessage }));
        setIsListening(false);
      }
    } else {
      setCurrentMessages({ user: null, assistant: null });
    }
  }, [messages]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[300px] gap-6">
      <AnimatePresence mode="wait">
        {isListening && !isMuted && (
          <motion.div
            key="listening"
            className="absolute top-4 left-0 right-0 text-center px-4 z-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <motion.div 
              className="text-lg md:text-xl font-medium text-muted-foreground"
            >
              listening now
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >...</motion.span>
            </motion.div>
          </motion.div>
        )}
        
        {currentMessages.assistant && (
          <motion.div
            key="assistant-message"
            className="absolute top-4 left-0 right-0 text-center px-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="text-base md:text-xl font-medium px-2 md:px-4">
              {currentMessages.assistant.message.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {currentMessages.user && (
          <motion.div
            key={`user-${currentMessages.user.id}`}
            className="w-[90%] max-w-2xl mx-auto bg-yellow-500/5 rounded-2xl mt-auto"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
          >
            <div className="flex justify-between items-center pt-4 px-4">
              <div className="text-xs capitalize font-medium leading-none opacity-50">
                {currentMessages.user.message.role}
              </div>
              <div className="text-xs opacity-50">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            <div className="py-3 px-4 text-sm md:text-base leading-relaxed">
              {currentMessages.user.message.content}
            </div>
            <div className="overflow-x-auto">
              <Expressions values={currentMessages.user.models.prosody?.scores || {}} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}