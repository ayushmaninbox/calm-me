"use client";

import { useVoice } from "@humeai/voice-react";
import Expressions from "./Expressions";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Messages() {
  const { messages } = useVoice();
  const [currentMessages, setCurrentMessages] = useState<{
    user: typeof messages[0] | null;
    assistant: typeof messages[0] | null;
  }>({ user: null, assistant: null });

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      
      if (lastMessage.type === "user_message") {
        setCurrentMessages(prev => ({ ...prev, user: lastMessage }));
      } else if (lastMessage.type === "assistant_message") {
        setCurrentMessages(prev => ({ ...prev, assistant: lastMessage }));
      }
    } else {
      // Reset messages when starting a new conversation
      setCurrentMessages({ user: null, assistant: null });
    }
  }, [messages]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[300px] gap-6">
      {/* Assistant Message */}
      <AnimatePresence mode="wait">
        {currentMessages.assistant && (
          <motion.div
            key={`assistant-${currentMessages.assistant.id}`}
            className="absolute top-4 left-0 right-0 text-center px-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="text-xl font-medium">
              {currentMessages.assistant.message.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Message */}
      <AnimatePresence mode="wait">
        {currentMessages.user && (
          <motion.div
            key={`user-${currentMessages.user.id}`}
            className="w-[90%] max-w-2xl mx-auto bg-yellow-500/5 rounded-2xl mt-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex justify-between items-center pt-4 px-4">
              <div className="text-xs capitalize font-medium leading-none opacity-50">
                {currentMessages.user.message.role}
              </div>
              <div className="text-xs opacity-50">
                {getCurrentTime()}
              </div>
            </div>
            <div className="py-3 px-4 text-lg">
              {currentMessages.user.message.content}
            </div>
            <Expressions values={{ ...currentMessages.user.models.prosody?.scores }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}