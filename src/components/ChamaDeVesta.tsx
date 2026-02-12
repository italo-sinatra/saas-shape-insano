import { motion } from "framer-motion";
import { Flame, Skull } from "lucide-react";

interface ChamaDeVestaProps {
  streak: number;
  maxStreak: number;
  isActive?: boolean;
}

const ChamaDeVesta = ({ streak, maxStreak, isActive = true }: ChamaDeVestaProps) => {
  const percentage = isActive ? (streak / maxStreak) * 100 : 0;
  const circumference = 2 * Math.PI * 58;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center"
    >
      <div className="relative w-40 h-40">
        {/* Background ring */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
          <circle
            cx="64"
            cy="64"
            r="58"
            fill="none"
            stroke={isActive ? "hsl(var(--border))" : "hsl(var(--dishonor-border))"}
            strokeWidth="6"
          />
          <motion.circle
            cx="64"
            cy="64"
            r="58"
            fill="none"
            stroke={isActive ? "url(#goldGradient)" : "url(#deadGradient)"}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: isActive ? offset : circumference * 0.92 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(43, 76%, 53%)" />
              <stop offset="100%" stopColor="hsl(43, 80%, 65%)" />
            </linearGradient>
            <linearGradient id="deadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(270, 20%, 25%)" />
              <stop offset="100%" stopColor="hsl(260, 15%, 18%)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center icon */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {isActive ? (
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [1, 0.9, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Flame className="text-accent" size={36} />
            </motion.div>
          ) : (
            <motion.div
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <Skull size={36} style={{ color: "hsl(var(--dishonor-accent))" }} />
              {/* Cold vapor particles */}
              <motion.div
                className="absolute -top-2 left-1/2 w-1 h-1 rounded-full"
                style={{ backgroundColor: "hsl(var(--dishonor-frost))" }}
                animate={{ y: [-2, -16], opacity: [0.6, 0], x: [-2, 4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", repeatDelay: 1 }}
              />
              <motion.div
                className="absolute -top-1 left-1/2 w-0.5 h-0.5 rounded-full"
                style={{ backgroundColor: "hsl(var(--dishonor-frost))" }}
                animate={{ y: [-2, -14], opacity: [0.4, 0], x: [2, -3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.8, repeatDelay: 1.2 }}
              />
            </motion.div>
          )}
          <span
            className="font-cinzel text-xl font-bold mt-1"
            style={{ color: isActive ? "hsl(var(--foreground))" : "hsl(var(--dishonor-muted))" }}
          >
            {streak}
          </span>
          <span
            className="text-[10px] uppercase tracking-wider"
            style={{ color: isActive ? "hsl(var(--muted-foreground))" : "hsl(var(--dishonor-muted))" }}
          >
            dias
          </span>
        </div>
      </div>
      <p
        className="font-cinzel text-xs mt-2 tracking-wider uppercase"
        style={{ color: isActive ? "hsl(var(--muted-foreground))" : "hsl(var(--dishonor-accent))" }}
      >
        {isActive ? "Chama de Vesta" : "Chama Extinta"}
      </p>
    </motion.div>
  );
};

export default ChamaDeVesta;
