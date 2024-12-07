"use client";

import Chat from "@/components/Chat";
import { useEffect, useState } from "react";

export default function ChatPage() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth")
      .then((res) => res.json())
      .then((data) => setAccessToken(data.accessToken))
      .catch(console.error);
  }, []);

  if (!accessToken) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse">Connecting...</div>
      </div>
    );
  }

  return <Chat accessToken={accessToken} />;
}