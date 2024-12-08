"use client";

import { motion } from "framer-motion";

export function Logo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={className}>
      <motion.div 
        className="relative w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="absolute inset-0"
          style={{ 
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridTemplateRows: "repeat(2, 1fr)",
            gap: "2px"
          }}
        >
          <motion.div 
            className="bg-[#8C6700] rounded-[3px]"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
          />
          <motion.div 
            className="bg-[#B58600] rounded-[3px]"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          />
          <motion.div 
            className="bg-[#F7B500] rounded-[3px]"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          />
          <motion.div 
            className="bg-[#FFD04D] rounded-[3px]"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}