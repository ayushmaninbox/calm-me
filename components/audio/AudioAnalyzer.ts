import { useEffect, useRef } from 'react';

export class AudioAnalyzer {
  private analyser: AnalyserNode;
  private dataArray: Uint8Array;
  private bufferLength: number;

  constructor(audioContext: AudioContext, mediaStream: MediaStream) {
    this.analyser = audioContext.createAnalyser();
    this.analyser.fftSize = 256;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);

    const source = audioContext.createMediaStreamSource(mediaStream);
    source.connect(this.analyser);
  }

  getAudioData(): { frequencies: Uint8Array; average: number } {
    this.analyser.getByteFrequencyData(this.dataArray);
    const average = Array.from(this.dataArray).reduce((a, b) => a + b, 0) / this.bufferLength;
    return { frequencies: this.dataArray, average: average / 255 };
  }

  dispose() {
    this.analyser.disconnect();
  }
}