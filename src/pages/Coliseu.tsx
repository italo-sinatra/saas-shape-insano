import { motion } from "framer-motion";
import { Crown, Shield, Sword, Users, Gift, Star, Coins, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const leagueRanges = {
  plebe: { min: 0, max: 5000 },
  equites: { min: 5001, max: 10000 },
  legionarios: { min: 10001, max: 15000 },
  pretorianos: { min: 15001, max: Infinity },
};

const leagues = [
  { id: "plebe", name: "Plebe", icon: Users, color: "text-gray-400", bg: "bg-gray-800/50", border: "border-gray-700/50" },
  { id: "equites", name: "Equites", icon: Sword, color: "text-blue-400", bg: "bg-blue-900/30", border: "border-blue-800/50" },
  { id: "legionarios", name: "Legionários", icon: Shield, color: "text-purple-400", bg: "bg-purple-900/30", border: "border-purple-800/50" },
  { id: "pretorianos", name: "Pretorianos", icon: Crown, color: "text-amber-400", bg: "bg-amber-900/30", border: "border-amber-800/50" },
];

const promotionBonuses: Record<string, { rewards: { icon: typeof Coins; label: string; value: string }[] }> = {
  legionarios: {
    rewards: [
      { icon: Coins, label: "Dracmas", value: "+500" },
      { icon: Star, label: "Título", value: "Legionário" },
      { icon: Zap, label: "XP Bônus", value: "+200" },
    ],
  },
  pretorianos: {
    rewards: [
      { icon: Coins, label: "Dracmas", value: "+1.500" },
      { icon: Star, label: "Título", value: "Pretoriano" },
      { icon: Gift, label: "Skin", value: "Exclusiva" },
    ],
  },
};

const mockPlayers = [
  { rank: 1, name: "Brutus", xp: 9800, league: "equites", isUser: false },
  { rank: 2, name: "Tu (Gladiador)", xp: 8450, league: "equites", isUser: true },
  { rank: 3, name: "Cato", xp: 7200, league: "equites", isUser: false },
  { rank: 4, name: "Varro", xp: 6800, league: "equites", isUser: false },
  { rank: 5, name: "Lucius", xp: 6100, league: "equites", isUser: false },
  { rank: 6, name: "Decimus", xp: 5400, league: "equites", isUser: false },
];

const userLeague = "equites";
const userXP = 8450;

const Coliseu = () => {
  const currentLeague = leagues.find((l) => l.id === userLeague)!;
  const currentRange = leagueRanges[userLeague as keyof typeof leagueRanges];
  const currentIndex = leagues.findIndex((l) => l.id === userLeague);
  const nextLeague = currentIndex < leagues.length - 1 ? leagues[currentIndex + 1] : null;
  const nextRange = nextLeague ? leagueRanges[nextLeague.id as keyof typeof leagueRanges] : null;
  const xpInLeague = userXP - currentRange.min;
  const leagueSpan = currentRange.max - currentRange.min;
  const progressPercent = Math.round((xpInLeague / leagueSpan) * 100);
  const xpToNext = nextLeague ? currentRange.max - userXP + 1 : 0;
  const nextBonuses = nextLeague ? promotionBonuses[nextLeague.id] : null;

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="font-cinzel text-2xl font-bold text-foreground mb-1 pt-2">COLISEU</h1>
      <p className="text-muted-foreground text-sm mb-6">Ligas do Império</p>

      {/* League Progression */}
      <div className="flex items-center gap-1 mb-6">
        {leagues.map((league, i) => {
          const isActive = league.id === userLeague;
          const isPast = i < currentIndex;
          return (
            <div key={league.id} className="flex-1 flex flex-col items-center gap-1.5">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`w-10 h-10 rounded-lg flex items-center justify-center border-2 transition-all ${
                  isActive
                    ? `${league.bg} ${league.border} ring-2 ring-offset-2 ring-offset-background ring-accent/50`
                    : isPast
                    ? `${league.bg} ${league.border} opacity-60`
                    : "bg-secondary border-border opacity-30"
                }`}
              >
                <league.icon size={18} className={isActive || isPast ? league.color : "text-muted-foreground"} />
              </motion.div>
              <span className={`text-[10px] font-cinzel font-semibold ${isActive ? league.color : "text-muted-foreground"}`}>
                {league.name}
              </span>
              {i < leagues.length - 1 && (
                <div className={`absolute hidden`} />
              )}
            </div>
          );
        })}
      </div>

      {/* XP Progress to Next League */}
      {nextLeague && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl border border-border p-4 mb-4"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-muted-foreground">Progresso para <span className={`font-semibold ${nextLeague.color}`}>{nextLeague.name}</span></p>
            <p className="text-xs text-foreground font-cinzel font-bold">{userXP.toLocaleString()} / {currentRange.max.toLocaleString()} XP</p>
          </div>
          <Progress value={progressPercent} className="h-2.5" />
          <p className="text-[10px] text-muted-foreground mt-1.5">Faltam <span className="text-accent font-semibold">{xpToNext.toLocaleString()} XP</span> para promoção</p>
        </motion.div>
      )}

      {/* Promotion Bonus */}
      {nextBonuses && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-accent/5 rounded-xl border border-accent/20 p-4 mb-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <Gift size={16} className="text-accent" />
            <h3 className="font-cinzel text-xs font-bold text-accent">Bônus de Promoção</h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {nextBonuses.rewards.map((reward) => (
              <div key={reward.label} className="bg-card rounded-lg border border-border p-2.5 text-center">
                <reward.icon size={16} className="text-accent mx-auto mb-1" />
                <p className="font-cinzel text-xs font-bold text-foreground">{reward.value}</p>
                <p className="text-[10px] text-muted-foreground">{reward.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Liga Header */}
      <div className="flex items-center gap-2 mb-3">
        <currentLeague.icon size={16} className={currentLeague.color} />
        <h2 className={`font-cinzel text-sm font-bold ${currentLeague.color}`}>Liga {currentLeague.name}</h2>
        <span className="text-[10px] text-muted-foreground ml-auto">{mockPlayers.length} gladiadores</span>
      </div>

      {/* Leaderboard */}
      <div className="space-y-2">
        {mockPlayers.map((player, i) => (
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
              <p className={`text-xs ${currentLeague.color}`}>{currentLeague.name}</p>
            </div>
            <div className="text-right">
              <p className="font-cinzel text-sm font-bold text-foreground">{player.xp.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground">XP</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Coliseu;
