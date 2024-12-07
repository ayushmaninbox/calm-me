import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { Mic } from "lucide-react";

export default function StartCall() {
  const { status, connect } = useVoice();

  return (
    <AnimatePresence>
      {status.value !== "connected" ? (
        <motion.div
          className="fixed inset-0 p-4 flex items-center justify-center bg-background/95 backdrop-blur-sm"
          initial="initial"
          animate="enter"
          exit="exit"
          variants={{
            initial: { opacity: 0 },
            enter: { opacity: 1 },
            exit: { opacity: 0 },
          }}
        >
          <motion.div
            variants={{
              initial: { scale: 0.95 },
              enter: { scale: 1 },
              exit: { scale: 0.95 },
            }}
          >
            <Button
              className="z-50 flex items-center gap-2 lowercase-all bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg"
              onClick={() => {
                connect()
                  .then(() => {})
                  .catch(() => {})
                  .finally(() => {});
              }}
            >
              <Mic className="h-5 w-5" />
              connect now
            </Button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}