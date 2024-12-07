"use client";

import Chat from "@/components/Chat";
import { LoadingScreen } from "@/components/LoadingScreen";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function ChatPage() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const res = await fetch("/api/auth");
        const data = await res.json();
        
        // Add a minimum loading time to ensure smooth transition
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setAccessToken(data.accessToken);
      } catch (error) {
        console.error(error);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeChat();
  }, []);

  return (
    <div className="h-[calc(100vh-3.5rem)] overflow-hidden">
      <AnimatePresence mode="wait">
        {isInitializing || !accessToken ? (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-50"
          >
            <LoadingScreen />
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-full"
          >
            <Chat accessToken={accessToken} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}