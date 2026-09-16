import { useEffect } from "react";
import { motion } from "framer-motion";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 1600);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020c10]"
      exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0, filter: "blur(16px)" }}
        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-4"
      >
        <div
          className="text-7xl sm:text-9xl font-display font-bold tracking-tighter"
          style={{
            background: "linear-gradient(135deg, #14b8a6 0%, #eab308 60%, #ef4444 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          SJ
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex items-center gap-2"
        >
          <span className="w-1 h-1 rounded-full bg-teal-400 animate-pulse" />
          <span className="w-1 h-1 rounded-full bg-yellow-400 animate-pulse" style={{ animationDelay: "0.2s" }} />
          <span className="w-1 h-1 rounded-full bg-red-400 animate-pulse" style={{ animationDelay: "0.4s" }} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
