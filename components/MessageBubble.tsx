"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils";
import Expressions from "./Expressions";

interface MessageBubbleProps {
  type: "user" | "assistant";
  message: string;
  isMobile: boolean;
  expressions?: Record<string, number>;
}

export function MessageBubble({ type, message, isMobile, expressions }: MessageBubbleProps) {
  const isUser = type === "user";

  return (
    <motion.div
      key={`${type}-message`}
      className={cn(
        "w-[90%] max-w-2xl mx-auto rounded-2xl",
        isUser ? "bg-yellow-500/5 mt-auto" : "absolute top-4 left-0 right-0 text-center px-4"
      )}
      initial={{ opacity: 0, scale: 0.95, y: isUser ? 20 : -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: isUser ? 20 : -20 }}
    >
      {isUser ? (
        <>
          <div className="flex justify-between items-center pt-3 px-3">
            <div className="text-xs capitalize font-medium leading-none opacity-50">
              you
            </div>
            <div className="text-xs opacity-50">
              {new Date().toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
          <div className={cn(
            "py-2 px-3 leading-relaxed",
            isMobile ? "text-sm" : "text-base"
          )}>
            {message}
          </div>
          {expressions && (
            <div className="overflow-x-auto">
              <Expressions values={expressions} />
            </div>
          )}
        </>
      ) : (
        <div className={cn(
          "font-medium px-2 md:px-4",
          isMobile ? "text-sm" : "text-base"
        )}>
          {message}
        </div>
      )}
    </motion.div>
  );
}