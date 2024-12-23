// @ts-nocheck
"use client";

import { useVoice } from "@humeai/voice-react";
import Expressions from "./Expressions";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/utils";
import { MessageBubble } from "./MessageBubble";
import { ListeningIndicator } from "./ListeningIndicator";

export default function Messages() {
  const { messages, status, isMuted } = useVoice();
  const [currentMessages, setCurrentMessages] = useState({
    user: null,
    assistant: null
  });
  const [isListening, setIsListening] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      
      if (lastMessage.type === "user_message") {
        setCurrentMessages(prev => ({ ...prev, user: lastMessage }));
        setIsListening(true);
      } else if (lastMessage.type === "assistant_message") {
        setCurrentMessages(prev => ({ ...prev, assistant: lastMessage }));
        setIsListening(false);
      }
    } else {
      setCurrentMessages({ user: null, assistant: null });
    }
  }, [messages]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[300px] gap-6 px-4 pb-20 md:pb-24">
      <AnimatePresence mode="wait">
        {isListening && !isMuted && (
          <ListeningIndicator isMobile={isMobile} />
        )}
        
        {currentMessages.assistant && (
          <MessageBubble
            type="assistant"
            message={currentMessages.assistant.message.content}
            isMobile={isMobile}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {currentMessages.user && (
          <MessageBubble
            type="user"
            message={currentMessages.user.message.content}
            isMobile={isMobile}
            expressions={currentMessages.user.models.prosody?.scores}
          />
        )}
      </AnimatePresence>
    </div>
  );
}