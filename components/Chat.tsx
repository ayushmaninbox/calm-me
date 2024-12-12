"use client";

import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Messages";
import Controls from "./Controls";
import StartCall from "./StartCall";
import { ThreeAudioVisualizer } from "./ThreeAudioVisualizer";

export default function Chat({ accessToken }: { accessToken: string }) {
  const configId = process.env['NEXT_PUBLIC_HUME_CONFIG_ID'];
  
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-yellow-500/5 to-background">
      <div className="max-w-4xl mx-auto w-full px-4 py-8 h-full flex flex-col">
        <VoiceProvider
          auth={{ type: "accessToken", value: accessToken }}
          configId={configId}
        >
          {/* Audio Visualizer Container */}
          <div className="h-[300px] mb-4 relative">
            <ThreeAudioVisualizer />
          </div>

          {/* Messages Container */}
          <div className="relative grow flex flex-col">
            <Messages />
            <Controls />
            <StartCall />
          </div>
        </VoiceProvider>
      </div>
    </div>
  );
}