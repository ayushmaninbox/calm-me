"use client";

import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Messages";
import Controls from "./Controls";
import StartCall from "./StartCall";
import { ComponentRef, useRef } from "react";

export default function Chat({ accessToken }: { accessToken: string }) {
  const timeout = useRef<number | null>(null);
  const ref = useRef<ComponentRef<typeof Messages> | null>(null);
  const configId = process.env['NEXT_PUBLIC_HUME_CONFIG_ID'];
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-yellow-500/5 to-background">
      <div className="max-w-4xl mx-auto w-full px-4 py-8">
        <h1 className="text-2xl font-bold mb-8 text-center">chat with calm/me</h1>
        <div className="relative grow flex flex-col bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
          <VoiceProvider
            auth={{ type: "accessToken", value: accessToken }}
            configId={configId}
            onMessage={() => {
              if (timeout.current) {
                window.clearTimeout(timeout.current);
              }

              timeout.current = window.setTimeout(() => {
                if (ref.current) {
                  const scrollHeight = ref.current.scrollHeight;
                  ref.current.scrollTo({
                    top: scrollHeight,
                    behavior: "smooth",
                  });
                }
              }, 200);
            }}
          >
            <Messages ref={ref} />
            <Controls />
            <StartCall />
          </VoiceProvider>
        </div>
      </div>
    </div>
  );
}