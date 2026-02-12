import { motion } from "framer-motion";
import { User, Flame, Trophy, Sword, Coins, Settings } from "lucide-react";

const Perfil = () => {
  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="font-cinzel text-2xl font-bold text-foreground mb-6 pt-2">PERFIL</h1>

      {/* Avatar & name */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-6"
      >
        <div className="w-20 h-20 rounded-full bg-card border-2 border-accent/30 flex items-center justify-center">
          <User size={36} className="text-accent" />
        </div>
        <div>
          <h2 className="font-cinzel text-xl font-bold text-foreground">GLADIADOR</h2>
          <p className="text-sm text-accent font-cinzel">Classe: Gladius</p>
          <p className="text-xs text-muted-foreground">Nível 12 • Equites</p>
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { icon: Flame, label: "Sequência", value: "7 dias", color: "text-orange-400" },
          { icon: Trophy, label: "Batalhas", value: "42", color: "text-amber-400" },
          { icon: Sword, label: "XP Total", value: "8.450", color: "text-red-400" },
          { icon: Coins, label: "Dracmas", value: "1.250", color: "text-amber-400" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl border border-border p-4 text-center"
          >
            <stat.icon size={22} className={`${stat.color} mx-auto mb-2`} />
            <p className="font-cinzel text-lg font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Settings placeholder */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-xl border border-border p-4 flex items-center gap-3 cursor-pointer hover:border-accent/30 transition-colors"
      >
        <Settings size={20} className="text-muted-foreground" />
        <span className="text-sm text-foreground">Configurações</span>
      </motion.div>
    </div>
  );
};

export default Perfil;
