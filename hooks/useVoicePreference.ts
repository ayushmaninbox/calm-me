"use client";

import { useState, useEffect } from 'react';

type VoiceType = 'FEMALE' | 'MALE';

export function useVoicePreference() {
  const [selectedVoice, setSelectedVoice] = useState<VoiceType | null>(null);

  useEffect(() => {
    const savedVoice = localStorage.getItem('voicePreference') as VoiceType | null;
    if (savedVoice) {
      setSelectedVoice(savedVoice);
    }
  }, []);

  const setVoicePreference = (voice: VoiceType) => {
    localStorage.setItem('voicePreference', voice);
    setSelectedVoice(voice);
  };

  return {
    selectedVoice,
    setVoicePreference
  };
}