import { motion } from "framer-motion";
import { Flame, Trophy, Sword, Coins, Settings, Shield, TrendingUp, Target, Award } from "lucide-react";
import InvictusLogo from "@/components/InvictusLogo";

const Perfil = () => {
  return (
    <div className="p-4 max-w-lg mx-auto space-y-4">
      <h1 className="font-cinzel text-2xl font-bold text-foreground pt-2">PERFIL</h1>

      {/* Avatar Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl border border-border p-5 flex flex-col items-center relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/20 to-transparent" />
        </div>

        {/* Avatar */}
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center border-4 border-primary/30 shadow-lg shadow-primary/20">
            <svg viewBox="0 0 64 64" className="w-16 h-16">
              {/* Helmet silhouette */}
              <ellipse cx="32" cy="36" rx="14" ry="16" fill="hsl(43, 30%, 85%)" />
              <path d="M18 30 Q18 14 32 10 Q46 14 46 30 L46 26 Q46 12 32 8 Q18 12 18 26 Z" fill="hsl(43, 76%, 53%)" />
              <path d="M26 30 Q32 28 38 30 L38 36 Q32 34 26 36 Z" fill="hsl(0, 0%, 10%)" />
              <rect x="30" y="8" width="4" height="18" rx="2" fill="hsl(0, 100%, 27%)" />
            </svg>
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-accent flex items-center justify-center border-2 border-card">
            <span className="text-xs font-bold text-accent-foreground">12</span>
          </div>
        </div>

        <h2 className="font-cinzel text-xl font-bold text-foreground">GLADIADOR</h2>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs font-cinzel font-semibold text-primary px-2 py-0.5 bg-primary/10 rounded-full">Gladius</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs font-cinzel text-accent">Equites</span>
        </div>

        {/* XP Bar */}
        <div className="w-full mt-4">
          <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
            <span>Nível 12</span>
            <span>2.450 / 3.000 XP</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "82%" }}
              transition={{ duration: 1 }}
              className="h-full gold-gradient rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: Flame, label: "Sequência", value: "14 dias", sub: "Recorde: 21", color: "text-primary" },
          { icon: Trophy, label: "Batalhas", value: "42", sub: "32 vitórias", color: "text-accent" },
          { icon: Sword, label: "XP Total", value: "8.450", sub: "+320 esta semana", color: "text-primary" },
          { icon: Coins, label: "Dracmas", value: "1.250", sub: "Gastos: 3.200", color: "text-accent" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl border border-border p-4"
          >
            <stat.icon size={20} className={`${stat.color} mb-2`} />
            <p className="font-cinzel text-lg font-bold text-foreground">{stat.value}</p>
            <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            <p className="text-[10px] text-muted-foreground/60 mt-0.5">{stat.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-xl border border-border p-4"
      >
        <h3 className="font-cinzel text-sm font-bold text-foreground mb-3">Conquistas Recentes</h3>
        <div className="flex gap-3">
          {[
            { icon: "🏆", title: "Primeiro Sangue", desc: "1ª batalha" },
            { icon: "🔥", title: "Semana de Fogo", desc: "7 dias seguidos" },
            { icon: "⚔️", title: "Centurião", desc: "10 batalhas" },
            { icon: "🛡️", title: "Indestrutível", desc: "14 dias seguidos" },
          ].map((badge, i) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex-1 text-center"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-secondary flex items-center justify-center text-xl mb-1">
                {badge.icon}
              </div>
              <p className="text-[9px] text-muted-foreground leading-tight">{badge.title}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Settings */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-card rounded-xl border border-border p-4 flex items-center gap-3 cursor-pointer hover:border-primary/30 transition-colors"
      >
        <Settings size={20} className="text-muted-foreground" />
        <span className="text-sm text-foreground">Configurações</span>
      </motion.div>
    </div>
  );
};

export default Perfil;
