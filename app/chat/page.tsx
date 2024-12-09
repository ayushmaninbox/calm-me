"use client";

import Chat from "@/components/Chat";
import { LoadingScreen } from "@/components/LoadingScreen";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function ChatPage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/");
      } else if (!user.emailVerified) {
        // Redirect unverified users
        router.push("/?verify=true");
      }
    }
  }, [user, loading, router]);

  useEffect(() => {
    const initializeChat = async () => {
      if (!user || !user.emailVerified) return;
      
      try {
        const res = await fetch("/api/auth");
        const data = await res.json();
        setAccessToken(data.accessToken);
      } catch (error) {
        console.error(error);
      } finally {
        setIsInitializing(false);
      }
    };

    if (user) {
      initializeChat();
    }
  }, [user]);

  if (loading || !user || !user.emailVerified) {
    return <LoadingScreen />;
  }

  return (
    <div className="h-[calc(100vh-3.5rem)] overflow-hidden">
      <AnimatePresence mode="wait">
        {isInitializing || !accessToken ? (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-50"
          >
            <LoadingScreen />
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <Chat accessToken={accessToken} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}