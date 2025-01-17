"use client";

import { motion } from "framer-motion";

export function Logo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="w-full h-full bg-yellow-500"
        style={{
          transform: "rotate(45deg)",
          borderRadius: "25%", 
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
}
