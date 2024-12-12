"use client";
import { cn } from "@/utils";
import { useVoice } from "@humeai/voice-react";
import Expressions from "./Expressions";
import { AnimatePresence, motion } from "framer-motion";
import { ComponentRef, forwardRef, useEffect, useState } from "react";

const Messages = forwardRef<
  ComponentRef<typeof motion.div>,
  Record<never, never>
>(function Messages(_, ref) {
  const { messages } = useVoice();
  const [visibleMessages, setVisibleMessages] = useState<typeof messages>([]);
  const [currentMessage, setCurrentMessage] = useState<(typeof messages)[0] | null>(null);

  useEffect(() => {
    // When new message arrives
    if (messages.length > 0 && messages[messages.length - 1] !== currentMessage) {
      const newMessage = messages[messages.length - 1];
      setCurrentMessage(newMessage);
      
      // Clear previous message after animation
      setTimeout(() => {
        setVisibleMessages([newMessage]);
      }, 500);
    }
  }, [messages, currentMessage]);

  return (
    <motion.div
      layoutScroll
      className="grow overflow-auto px-4 pb-24"
      ref={ref}
    >
      <motion.div className="max-w-2xl mx-auto w-full flex flex-col gap-4">
        <AnimatePresence mode="popLayout">
          {visibleMessages.map((msg, index) => {
            if (msg.type === "user_message" || msg.type === "assistant_message") {
              return (
                <motion.div
                  key={msg.type + index}
                  className={cn(
                    "w-[80%] backdrop-blur-sm",
                    "bg-transparent",
                    msg.type === "user_message" ? "ml-auto" : ""
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ 
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                >
                  <div className="text-xs capitalize font-medium leading-none opacity-50 pt-4 px-4">
                    {msg.message.role}
                  </div>
                  <div className="py-3 px-4 text-lg">
                    {msg.message.content}
                  </div>
                  {msg.type === "user_message" && (
                    <Expressions values={{ ...msg.models.prosody?.scores }} />
                  )}
                </motion.div>
              );
            }
            return null;
          })}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
});

export default Messages;