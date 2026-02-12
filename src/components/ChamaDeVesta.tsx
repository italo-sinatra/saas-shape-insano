import { motion } from "framer-motion";
import { Flame } from "lucide-react";

interface ChamaDeVestaProps {
  streak: number;
  maxStreak: number;
}

const ChamaDeVesta = ({ streak, maxStreak }: ChamaDeVestaProps) => {
  const percentage = (streak / maxStreak) * 100;
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
            stroke="hsl(var(--border))"
            strokeWidth="6"
          />
          <motion.circle
            cx="64"
            cy="64"
            r="58"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(43, 76%, 53%)" />
              <stop offset="100%" stopColor="hsl(43, 80%, 65%)" />
            </linearGradient>
          </defs>
        </svg>
        {/* Center flame */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [1, 0.9, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Flame className="text-accent" size={36} />
          </motion.div>
          <span className="font-cinzel text-xl font-bold text-foreground mt-1">{streak}</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">dias</span>
        </div>
      </div>
      <p className="font-cinzel text-xs text-muted-foreground mt-2 tracking-wider uppercase">
        Chama de Vesta
      </p>
    </motion.div>
  );
};

export default ChamaDeVesta;
