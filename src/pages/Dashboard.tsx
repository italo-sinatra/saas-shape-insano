import { motion } from "framer-motion";
import { Flame, Swords, Trophy, Users, Coins, Heart, Brain, TrendingUp, Sparkles, Dumbbell, Target, Zap, Calendar, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ChamaDeVesta from "@/components/ChamaDeVesta";
import InsanoLogo from "@/components/InsanoLogo";
import { useIsMobile } from "@/hooks/use-mobile";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart, BarChart, Bar } from "recharts";

const performanceData = [
  { day: "Seg", score: 65 },
  { day: "Ter", score: 68 },
  { day: "Qua", score: 64 },
  { day: "Qui", score: 72 },
  { day: "Sex", score: 78 },
  { day: "Sáb", score: 82 },
  { day: "Dom", score: 88 },
];

const weeklyVolume = [
  { week: "S1", volume: 12400 },
  { week: "S2", volume: 14200 },
  { week: "S3", volume: 13800 },
  { week: "S4", volume: 16500 },
];

const stoicQuotes = [
  { text: "Não é porque as coisas são difíceis que não ousamos. É porque não ousamos que são difíceis.", author: "Sêneca" },
  { text: "A felicidade da tua vida depende da qualidade dos teus pensamentos.", author: "Marco Aurélio" },
  { text: "Primeiro diz a ti mesmo o que serias, e depois faz o que tens de fazer.", author: "Epicteto" },
  { text: "O impedimento à ação faz avançar a ação. O que está no caminho torna-se o caminho.", author: "Marco Aurélio" },
];

const randomQuote = stoicQuotes[Math.floor(Math.random() * stoicQuotes.length)];

const stats = [
  { icon: Heart, label: "Health Score", value: "86", sub: "/100", color: "text-primary" },
  { icon: Dumbbell, label: "Treino Hoje", value: "HIIT", sub: "45 min", color: "text-primary" },
  { icon: Flame, label: "Calorias", value: "1.250", sub: "/2.400", color: "text-accent" },
  { icon: Brain, label: "Mental", value: "Focado", sub: "", color: "text-accent" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="p-4 max-w-lg mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <InsanoLogo size={36} />
            <div>
              <p className="text-muted-foreground text-xs">Ave, Guerreiro</p>
              <h1 className="font-cinzel text-lg font-bold text-foreground">INSANO</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-card rounded-lg px-3 py-1.5 border border-border">
              <Flame size={14} className="text-primary" />
              <span className="font-cinzel text-xs font-bold text-foreground">14 dias</span>
            </div>
            <div className="flex items-center gap-1.5 bg-card rounded-lg px-3 py-1.5 border border-border">
              <Coins size={14} className="text-accent" />
              <span className="font-cinzel text-xs font-bold text-accent">1.250</span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-2">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-xl border border-border p-3 text-center"
            >
              <stat.icon size={16} className={`${stat.color} mx-auto mb-1.5`} />
              <p className="font-cinzel text-sm font-bold text-foreground">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.sub || stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* XP Progress */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-muted-foreground text-[10px] uppercase tracking-wider">Nível 12</p>
              <p className="font-cinzel text-sm font-bold text-accent">Equites</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">XP: 2.450 / 3.000</p>
            </div>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: "82%" }} transition={{ duration: 1, delay: 0.5 }} className="h-full gold-gradient rounded-full" />
          </div>
        </motion.div>

        {/* Battle Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/batalha")}
          className="w-full py-4 crimson-gradient text-foreground font-cinzel font-bold text-lg rounded-xl crimson-shadow tracking-wider flex items-center justify-center gap-3 animate-pulse-glow"
        >
          <Swords size={24} />
          INICIAR BATALHA
        </motion.button>

        {/* Performance Chart */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-cinzel text-sm font-bold text-foreground">Evolução de Performance</h3>
            <span className="text-[10px] text-muted-foreground bg-secondary px-2 py-1 rounded">Últimos 7 dias</span>
          </div>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="performanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(0, 100%, 27%)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(0, 100%, 27%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "hsl(43, 10%, 55%)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(43, 10%, 55%)" }} axisLine={false} tickLine={false} domain={[50, 100]} />
                <Tooltip contentStyle={{ background: "hsl(0, 0%, 10%)", border: "1px solid hsl(0, 0%, 16%)", borderRadius: "8px", fontSize: "12px", color: "hsl(43, 30%, 85%)" }} />
                <Area type="monotone" dataKey="score" stroke="hsl(0, 100%, 27%)" fill="url(#performanceGradient)" strokeWidth={2} dot={{ fill: "hsl(0, 100%, 35%)", r: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Quick Nav */}
        <div className="grid grid-cols-2 gap-3">
          <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate("/mentores")} className="py-3 bg-card border border-border rounded-xl font-cinzel text-sm font-semibold text-foreground flex items-center justify-center gap-2 hover:border-primary/50 transition-colors">
            <Users size={18} className="text-primary" />
            MENTORES
          </motion.button>
          <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate("/coliseu")} className="py-3 bg-card border border-border rounded-xl font-cinzel text-sm font-semibold text-foreground flex items-center justify-center gap-2 hover:border-accent/50 transition-colors">
            <Trophy size={18} className="text-accent" />
            COLISEU
          </motion.button>
        </div>

        {/* AI Insight */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-primary/10 rounded-xl border border-primary/30 p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Sparkles size={16} className="text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-cinzel text-sm font-bold text-primary mb-1">Insight da IA</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Notei que seu nível de estresse reportado aumentou ontem. Reajustei seu treino de hoje para focar em mobilidade e reduzi a intensidade em 15% para evitar burnout.
              </p>
            </div>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-3 py-1.5 bg-primary text-foreground font-cinzel text-[10px] font-bold rounded-lg flex-shrink-0">
              Aceitar
            </motion.button>
          </div>
        </motion.div>

        {/* Stoic Quote */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="bg-card/50 rounded-xl border border-border/50 p-4 text-center">
          <p className="text-foreground/80 text-xs italic mb-2">"{randomQuote.text}"</p>
          <p className="text-accent text-[10px] font-cinzel font-semibold">— {randomQuote.author}</p>
        </motion.div>
      </div>
    );
  }

  // ========== DESKTOP LAYOUT ==========
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Desktop Header Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <InsanoLogo size={44} />
          <div>
            <p className="text-muted-foreground text-xs">Ave, Guerreiro</p>
            <h1 className="font-cinzel text-2xl font-bold text-foreground">INSANO</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-2 bg-card rounded-lg px-4 py-2 border border-border">
              <stat.icon size={16} className={stat.color} />
              <div>
                <p className="font-cinzel text-sm font-bold text-foreground">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground">{stat.sub || stat.label}</p>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-1.5 bg-card rounded-lg px-4 py-2 border border-border">
            <Flame size={16} className="text-primary" />
            <span className="font-cinzel text-sm font-bold text-foreground">14 dias</span>
          </div>
          <div className="flex items-center gap-1.5 bg-card rounded-lg px-4 py-2 border border-border">
            <Coins size={16} className="text-accent" />
            <span className="font-cinzel text-sm font-bold text-accent">1.250</span>
          </div>
        </div>
      </div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {/* Chama de Vesta */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl border border-border p-6 flex flex-col items-center">
            <h3 className="font-cinzel text-sm font-bold text-foreground mb-4">Chama de Vesta</h3>
            <ChamaDeVesta streak={14} maxStreak={18} />
            <p className="text-muted-foreground text-xs mt-4">Consistência: 78%</p>
          </motion.div>

          {/* XP & League */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-muted-foreground text-[10px] uppercase tracking-wider">Nível 12</p>
                <p className="font-cinzel text-lg font-bold text-accent">Equites</p>
              </div>
              <Award size={24} className="text-accent" />
            </div>
            <p className="text-xs text-muted-foreground mb-2">XP: 2.450 / 3.000</p>
            <div className="h-3 bg-secondary rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: "82%" }} transition={{ duration: 1, delay: 0.5 }} className="h-full gold-gradient rounded-full" />
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">550 XP para Legionário</p>
          </motion.div>

          {/* Quick Nav */}
          <div className="grid grid-cols-2 gap-3">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => navigate("/mentores")} className="py-4 bg-card border border-border rounded-xl font-cinzel text-sm font-semibold text-foreground flex flex-col items-center gap-2 hover:border-primary/50 transition-colors">
              <Users size={22} className="text-primary" />
              MENTORES
            </motion.button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => navigate("/coliseu")} className="py-4 bg-card border border-border rounded-xl font-cinzel text-sm font-semibold text-foreground flex flex-col items-center gap-2 hover:border-accent/50 transition-colors">
              <Trophy size={22} className="text-accent" />
              COLISEU
            </motion.button>
          </div>
        </div>

        {/* CENTER COLUMN */}
        <div className="space-y-6">
          {/* Battle Button */}
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/batalha")}
            className="w-full py-5 crimson-gradient text-foreground font-cinzel font-bold text-xl rounded-xl crimson-shadow tracking-wider flex items-center justify-center gap-3 animate-pulse-glow"
          >
            <Swords size={28} />
            INICIAR BATALHA
          </motion.button>

          {/* Performance Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-cinzel text-sm font-bold text-foreground">Evolução de Performance</h3>
              <span className="text-[10px] text-muted-foreground bg-secondary px-2 py-1 rounded">Últimos 7 dias</span>
            </div>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="perfGradDesktop" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(0, 100%, 27%)" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="hsl(0, 100%, 27%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(43, 10%, 55%)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(43, 10%, 55%)" }} axisLine={false} tickLine={false} domain={[50, 100]} />
                  <Tooltip contentStyle={{ background: "hsl(0, 0%, 10%)", border: "1px solid hsl(0, 0%, 16%)", borderRadius: "8px", fontSize: "12px", color: "hsl(43, 30%, 85%)" }} />
                  <Area type="monotone" dataKey="score" stroke="hsl(0, 100%, 27%)" fill="url(#perfGradDesktop)" strokeWidth={2} dot={{ fill: "hsl(0, 100%, 35%)", r: 4 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* AI Insight */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-primary/10 rounded-xl border border-primary/30 p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Sparkles size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-cinzel text-sm font-bold text-primary mb-1">Insight da IA</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Notei que seu nível de estresse reportado aumentou ontem. Reajustei seu treino de hoje para focar em mobilidade e reduzi a intensidade em 15% para evitar burnout.
                </p>
              </div>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-4 py-2 bg-primary text-foreground font-cinzel text-xs font-bold rounded-lg flex-shrink-0">
                Aceitar
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* Weekly Volume */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-cinzel text-sm font-bold text-foreground">Volume Semanal</h3>
              <TrendingUp size={16} className="text-accent" />
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyVolume}>
                  <XAxis dataKey="week" tick={{ fontSize: 11, fill: "hsl(43, 10%, 55%)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "hsl(43, 10%, 55%)" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "hsl(0, 0%, 10%)", border: "1px solid hsl(0, 0%, 16%)", borderRadius: "8px", fontSize: "12px", color: "hsl(43, 30%, 85%)" }} />
                  <Bar dataKey="volume" fill="hsl(43, 76%, 53%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Daily Targets */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-cinzel text-sm font-bold text-foreground mb-4">Metas Diárias</h3>
            <div className="space-y-3">
              {[
                { label: "Proteína", current: 142, target: 180, unit: "g", color: "bg-primary" },
                { label: "Água", current: 2.1, target: 3, unit: "L", color: "bg-blue-500" },
                { label: "Sono", current: 7.5, target: 8, unit: "h", color: "bg-purple-500" },
                { label: "Passos", current: 8200, target: 10000, unit: "", color: "bg-accent" },
              ].map((goal) => (
                <div key={goal.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{goal.label}</span>
                    <span className="text-foreground font-semibold">{goal.current}{goal.unit} / {goal.target}{goal.unit}</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className={`h-full ${goal.color} rounded-full transition-all`} style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stoic Quote */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="bg-card/50 rounded-xl border border-border/50 p-5 text-center">
            <p className="text-foreground/80 text-sm italic mb-2">"{randomQuote.text}"</p>
            <p className="text-accent text-xs font-cinzel font-semibold">— {randomQuote.author}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
