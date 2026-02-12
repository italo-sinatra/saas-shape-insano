import { useState } from "react";
import { motion } from "framer-motion";
import { Crown, Shield, Sword, Users } from "lucide-react";

const leagues = [
  { id: "plebe", name: "Plebe", icon: Users, color: "text-gray-400", bg: "bg-gray-800/50" },
  { id: "equites", name: "Equites", icon: Sword, color: "text-blue-400", bg: "bg-blue-900/30" },
  { id: "legionarios", name: "Legionários", icon: Shield, color: "text-purple-400", bg: "bg-purple-900/30" },
  { id: "pretorianos", name: "Pretorianos", icon: Crown, color: "text-amber-400", bg: "bg-amber-900/30" },
];

const mockPlayers = [
  { rank: 1, name: "Marcus Aurelius", xp: 12500, league: "pretorianos", isUser: false },
  { rank: 2, name: "Spartacus", xp: 11200, league: "pretorianos", isUser: false },
  { rank: 3, name: "Maximus", xp: 9800, league: "legionarios", isUser: false },
  { rank: 4, name: "Tu (Gladiador)", xp: 8450, league: "equites", isUser: true },
  { rank: 5, name: "Brutus", xp: 7600, league: "equites", isUser: false },
  { rank: 6, name: "Cato", xp: 6200, league: "equites", isUser: false },
  { rank: 7, name: "Octavius", xp: 5100, league: "plebe", isUser: false },
  { rank: 8, name: "Tiberius", xp: 4300, league: "plebe", isUser: false },
];

const Coliseu = () => {
  const [activeLeague, setActiveLeague] = useState("all");

  const filtered = activeLeague === "all"
    ? mockPlayers
    : mockPlayers.filter((p) => p.league === activeLeague);

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="font-cinzel text-2xl font-bold text-foreground mb-1 pt-2">COLISEU</h1>
      <p className="text-muted-foreground text-sm mb-6">Ligas do Império</p>

      {/* League tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveLeague("all")}
          className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-semibold whitespace-nowrap transition-all ${
            activeLeague === "all" ? "gold-gradient text-accent-foreground" : "bg-card border border-border text-muted-foreground"
          }`}
        >
          TODAS
        </button>
        {leagues.map((league) => (
          <button
            key={league.id}
            onClick={() => setActiveLeague(league.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeLeague === league.id ? "gold-gradient text-accent-foreground" : "bg-card border border-border text-muted-foreground"
            }`}
          >
            <league.icon size={12} />
            {league.name}
          </button>
        ))}
      </div>

      {/* Leaderboard */}
      <div className="space-y-2">
        {filtered.map((player, i) => {
          const league = leagues.find((l) => l.id === player.league);
          return (
            <motion.div
              key={player.rank}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                player.isUser
                  ? "bg-accent/10 border-accent/30 gold-shadow"
                  : "bg-card border-border"
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-cinzel font-bold text-sm ${
                player.rank <= 3 ? "gold-gradient text-accent-foreground" : "bg-secondary text-muted-foreground"
              }`}>
                {player.rank}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-semibold text-sm truncate ${player.isUser ? "text-accent" : "text-foreground"}`}>
                  {player.name}
                </p>
                <p className={`text-xs ${league?.color || "text-muted-foreground"}`}>
                  {league?.name}
                </p>
              </div>
              <div className="text-right">
                <p className="font-cinzel text-sm font-bold text-foreground">{player.xp.toLocaleString()}</p>
                <p className="text-[10px] text-muted-foreground">XP</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Coliseu;
