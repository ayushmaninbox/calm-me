"use client";

import { useVoice } from "@humeai/voice-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export function AudioVisualizer() {
  const { micFft, isMuted, status } = useVoice();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Create gradient for the visualization
      const gradient = ctx.createLinearGradient(0, height/2, width, height/2);
      gradient.addColorStop(0, "rgba(255, 213, 0, 0.2)"); // Yellow theme
      gradient.addColorStop(0.5, "rgba(255, 213, 0, 0.6)"); // More vibrant in the middle
      gradient.addColorStop(1, "rgba(255, 213, 0, 0.2)");

      if (status.value === "connected" && !isMuted && micFft.length > 0) {
        // Active voice visualization
        const points: [number, number][] = [];
        const sliceWidth = width / micFft.length;

        for (let i = 0; i < micFft.length; i++) {
          const x = i * sliceWidth;
          const v = micFft[i] / 128.0;
          const y = (v * height) / 2;
          points.push([x, y]);
        }

        // Draw smooth curve with enhanced amplitude
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        
        points.forEach(([x, y], i) => {
          if (i === 0) {
            ctx.moveTo(x, height/2 + y * 1.5); // Increased amplitude
          } else {
            const [x0, y0] = points[i - 1];
            const cpx = (x0 + x) / 2;
            const cpy = height/2 + (y0 + y) / 2 * 1.5; // Increased amplitude
            ctx.quadraticCurveTo(cpx, cpy, x, height/2 + y * 1.5);
          }
        });

        ctx.lineTo(width, height / 2);
        ctx.fillStyle = gradient;
        ctx.strokeStyle = "rgba(255, 213, 0, 0.8)";
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.fill();

        // Enhanced mirror effect
        ctx.save();
        ctx.scale(1, -1);
        ctx.translate(0, -height);
        ctx.fillStyle = "rgba(255, 213, 0, 0.2)";
        ctx.fill();
        ctx.restore();
      } else {
        // Enhanced idle animation
        const time = Date.now() / 1000;
        ctx.beginPath();
        ctx.moveTo(0, height / 2);

        for (let x = 0; x < width; x++) {
          const y = Math.sin(x * 0.02 + time) * 15 + // Increased amplitude
                    Math.sin(x * 0.01 - time * 0.5) * 8 +
                    Math.sin(x * 0.005 + time * 0.7) * 5; // Added third wave
          ctx.lineTo(x, height/2 + y);
        }

        ctx.lineTo(width, height / 2);
        ctx.fillStyle = gradient;
        ctx.strokeStyle = "rgba(255, 213, 0, 0.6)";
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.fill();

        // Enhanced mirror effect for idle state
        ctx.save();
        ctx.scale(1, -1);
        ctx.translate(0, -height);
        ctx.fillStyle = "rgba(255, 213, 0, 0.1)";
        ctx.fill();
        ctx.restore();
      }

      requestAnimationFrame(draw);
    };

    draw();
  }, [micFft, isMuted, status]);

  return (
    <motion.div 
      className="w-full h-full relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        width={800}
        height={200}
      />
    </motion.div>
  );
}