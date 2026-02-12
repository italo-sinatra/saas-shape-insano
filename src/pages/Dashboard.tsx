import { motion } from "framer-motion";
import { Flame, Swords, Trophy, Users, Coins } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ChamaDeVesta from "@/components/ChamaDeVesta";

const stoicQuotes = [
  { text: "Não é porque as coisas são difíceis que não ousamos. É porque não ousamos que são difíceis.", author: "Sêneca" },
  { text: "A felicidade da tua vida depende da qualidade dos teus pensamentos.", author: "Marco Aurélio" },
  { text: "Primeiro diz a ti mesmo o que serias, e depois faz o que tens de fazer.", author: "Epicteto" },
  { text: "A riqueza não consiste em ter grandes posses, mas em ter poucas necessidades.", author: "Epicteto" },
  { text: "O impedimento à ação faz avançar a ação. O que está no caminho torna-se o caminho.", author: "Marco Aurélio" },
];

const randomQuote = stoicQuotes[Math.floor(Math.random() * stoicQuotes.length)];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 max-w-lg mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <p className="text-muted-foreground text-sm">Ave, Guerreiro</p>
          <h1 className="font-cinzel text-xl font-bold text-foreground">INVICTUS</h1>
        </div>
        <div className="flex items-center gap-2 bg-card rounded-lg px-3 py-1.5 border border-border">
          <Coins size={16} className="text-accent" />
          <span className="font-cinzel text-sm font-bold text-accent">1.250</span>
        </div>
      </div>

      {/* Chama de Vesta */}
      <ChamaDeVesta streak={7} maxStreak={30} />

      {/* Player Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-xl border border-border p-4 marble-texture"
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-muted-foreground text-xs uppercase tracking-wider">Nível</p>
            <p className="font-cinzel text-2xl font-bold text-foreground">12</p>
          </div>
          <div className="text-right">
            <p className="text-muted-foreground text-xs uppercase tracking-wider">Liga</p>
            <p className="font-cinzel text-sm font-bold text-accent">Equites</p>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>XP</span>
            <span>2.450 / 3.000</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "82%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full gold-gradient rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-3">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/batalha")}
          className="w-full py-4 crimson-gradient text-white font-cinzel font-bold text-lg rounded-xl crimson-shadow tracking-wider flex items-center justify-center gap-3 animate-pulse-glow"
        >
          <Swords size={24} />
          INICIAR BATALHA
        </motion.button>

        <div className="grid grid-cols-2 gap-3">
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/mentores")}
            className="py-3 bg-card border border-border rounded-xl font-cinzel text-sm font-semibold text-foreground flex items-center justify-center gap-2 hover:border-accent/50 transition-colors"
          >
            <Users size={18} className="text-accent" />
            MENTORES
          </motion.button>
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/coliseu")}
            className="py-3 bg-card border border-border rounded-xl font-cinzel text-sm font-semibold text-foreground flex items-center justify-center gap-2 hover:border-accent/50 transition-colors"
          >
            <Trophy size={18} className="text-accent" />
            COLISEU
          </motion.button>
        </div>
      </div>

      {/* Stoic Quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-card/50 rounded-xl border border-border/50 p-4 text-center"
      >
        <p className="text-foreground/80 text-sm italic mb-2">"{randomQuote.text}"</p>
        <p className="text-accent text-xs font-cinzel font-semibold">— {randomQuote.author}</p>
      </motion.div>
    </div>
  );
};

export default Dashboard;
