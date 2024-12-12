import { motion } from "framer-motion";

export function KeyboardShortcuts() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ 
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }}
      className="fixed top-16 right-4 text-right text-sm text-muted-foreground space-y-2 z-50"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-end gap-2">
          <span>mute/unmute</span>
          <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">Space</kbd>
        </div>
        <div className="flex items-center justify-end gap-2">
          <span>end call</span>
          <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">Esc</kbd>
        </div>
      </div>
      <p className="text-xs opacity-50">you can ask the assistant to end the call</p>
    </motion.div>
  );
}