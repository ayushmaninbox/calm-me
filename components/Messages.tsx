// @ts-nocheck
"use client";

import { useVoice } from "@humeai/voice-react";
import Expressions from "./Expressions";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function Messages() {
  const { messages, status, isMuted } = useVoice();
  const [currentMessages, setCurrentMessages] = useState({
    user: null,
    assistant: null
  });
  const [isListening, setIsListening] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (status.value === "connected" && !isMuted) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          const audioContext = new AudioContext();
          const analyser = audioContext.createAnalyser();
          const microphone = audioContext.createMediaStreamSource(stream);
          microphone.connect(analyser);
          analyser.fftSize = 256;
          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);

          function checkAudioLevel() {
            analyser.getByteFrequencyData(dataArray);
            const average = dataArray.reduce((a, b) => a + b) / bufferLength;
            setIsListening(average > 30);
            requestAnimationFrame(checkAudioLevel);
          }

          checkAudioLevel();

          return () => {
            stream.getTracks().forEach(track => track.stop());
            audioContext.close();
          };
        })
        .catch(err => console.error("Error accessing microphone:", err));
    } else {
      setIsListening(false);
    }
  }, [status.value, isMuted]);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      
      if (lastMessage.type === "user_message") {
        setCurrentMessages(prev => ({ ...prev, user: lastMessage }));
      } else if (lastMessage.type === "assistant_message") {
        setCurrentMessages(prev => ({ ...prev, assistant: lastMessage }));
      }
    } else {
      setCurrentMessages({ user: null, assistant: null });
    }
  }, [messages]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[300px] gap-6">
      <AnimatePresence mode="wait">
        {isListening && (
          <motion.div
            key="listening"
            className="absolute top-4 left-0 right-0 text-center px-4 z-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <motion.div 
              className={`text-lg md:text-xl font-medium text-muted-foreground`}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              listening now...
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
            <div className={`text-base md:text-xl font-medium px-2 md:px-4`}>
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
            <div className={`py-3 px-4 text-sm md:text-base leading-relaxed`}>
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