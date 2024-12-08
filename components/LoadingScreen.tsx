import { motion } from "framer-motion";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      <motion.div 
        className="flex flex-col items-center gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="w-24 h-24"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 0, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="relative w-full h-full">
            <div 
              className="absolute inset-0"
              style={{ 
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gridTemplateRows: "repeat(2, 1fr)",
                gap: "4px"
              }}
            >
              {[
                "#8C6700",
                "#B58600",
                "#F7B500",
                "#FFD04D"
              ].map((color, index) => (
                <motion.div 
                  key={color}
                  className="rounded-lg"
                  style={{ backgroundColor: color }}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ 
                    scale: 1, 
                    rotate: 0,
                  }}
                  transition={{
                    delay: index * 0.15,
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-xl font-medium text-foreground/80"
        >
          loading calm/me...
        </motion.div>
      </motion.div>
    </div>
  );
}