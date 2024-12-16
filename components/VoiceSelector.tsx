"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface VoiceConfig {
  FEMALE: string;
  MALE: string;
}

interface VoiceSelectorProps {
  onVoiceSelect: (voice: keyof VoiceConfig) => void;
  voiceConfig: VoiceConfig;
  disabled?: boolean;
}

export function VoiceSelector({ onVoiceSelect, voiceConfig, disabled }: VoiceSelectorProps) {
  return (
    <div className="relative w-full max-w-xs">
      <Select onValueChange={(value) => onVoiceSelect(value as keyof VoiceConfig)} disabled={disabled}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select AI voice" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="FEMALE">female voice</SelectItem>
          <SelectItem value="MALE">male voice</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

