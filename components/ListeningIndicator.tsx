"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils";

interface ListeningIndicatorProps {
  isMobile: boolean;
}

export function ListeningIndicator({ isMobile }: ListeningIndicatorProps) {
  return (
    <motion.div
      key="listening"
      className="absolute top-4 left-0 right-0 text-center z-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <motion.div 
        className={cn(
          "font-medium text-muted-foreground",
          isMobile ? "text-base" : "text-lg"
        )}
      >
        listening now
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ...
        </motion.span>
      </motion.div>
    </motion.div>
  );
}