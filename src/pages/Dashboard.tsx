import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Swords, Users, Coins, Heart, Brain, TrendingUp, Sparkles, Dumbbell, Target, Zap, Calendar, Award, Sword, Leaf, Landmark, AlertTriangle } from "lucide-react";
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
  { text: "Sofres mais na imaginação do que na realidade.", author: "Sêneca" },
  { text: "A riqueza não consiste em ter grandes posses, mas em ter poucas necessidades.", author: "Epicteto" },
  { text: "Desperdiçamos os nossos dias à espera de dias especiais.", author: "Sêneca" },
  { text: "Tudo o que ouvimos é uma opinião, não um facto. Tudo o que vemos é uma perspectiva, não a verdade.", author: "Marco Aurélio" },
  { text: "Quem vive temendo nunca será livre.", author: "Horácio" },
  { text: "A disciplina é o maior dos poderes.", author: "Sêneca" },
];

type MentorType = "mars" | "ceres" | "seneca";

interface AiInsight {
  mentor: MentorType;
  name: string;
  text: string;
  icon: typeof Sword;
  bgColor: string;
  borderColor: string;
  textColor: string;
  iconBg: string;
}

const aiInsights: AiInsight[] = [
  {
    mentor: "mars", name: "Mars", icon: Sword,
    text: "Tua força no supino aumentou 12% esta semana. Hora de subir a carga no próximo ciclo.",
    bgColor: "bg-red-900/20", borderColor: "border-red-500/30", textColor: "text-red-400", iconBg: "bg-red-900/30",
  },
  {
    mentor: "mars", name: "Mars", icon: Sword,
    text: "Notei fadiga acumulada nos últimos 3 treinos. Recomendo um deload estratégico esta semana.",
    bgColor: "bg-red-900/20", borderColor: "border-red-500/30", textColor: "text-red-400", iconBg: "bg-red-900/30",
  },
  {
    mentor: "ceres", name: "Ceres", icon: Leaf,
    text: "Teu consumo de proteína está 20g abaixo da meta. Adiciona um shake pós-treino para compensar.",
    bgColor: "bg-green-900/20", borderColor: "border-green-500/30", textColor: "text-green-400", iconBg: "bg-green-900/30",
  },
  {
    mentor: "ceres", name: "Ceres", icon: Leaf,
    text: "Hidratação abaixo do ideal ontem. Bebe pelo menos 500ml antes do treino de hoje.",
    bgColor: "bg-green-900/20", borderColor: "border-green-500/30", textColor: "text-green-400", iconBg: "bg-green-900/30",
  },
  {
    mentor: "seneca", name: "Sêneca", icon: Landmark,
    text: "Teu nível de estresse reportado subiu. Reajustei a intensidade em -15% para evitar burnout.",
    bgColor: "bg-amber-900/20", borderColor: "border-amber-500/30", textColor: "text-amber-400", iconBg: "bg-amber-900/30",
  },
  {
    mentor: "seneca", name: "Sêneca", icon: Landmark,
    text: "3 dias consecutivos de meditação. A consistência mental fortalece o corpo. Continua.",
    bgColor: "bg-amber-900/20", borderColor: "border-amber-500/30", textColor: "text-amber-400", iconBg: "bg-amber-900/30",
  },
];

const stats = [
  { icon: Heart, label: "Health Score", value: "86", sub: "/100", color: "text-primary" },
  { icon: Dumbbell, label: "Treino Hoje", value: "HIIT", sub: "45 min", color: "text-primary" },
  { icon: Flame, label: "Calorias", value: "1.250", sub: "/2.400", color: "text-accent" },
  { icon: Brain, label: "Mental", value: "Focado", sub: "", color: "text-accent" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Simulated streak — set to 0 to see "chama apagada" mode
  const streak = 0;
  const chamaAtiva = streak > 0;

  // Rotating stoic quote
  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * stoicQuotes.length));
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % stoicQuotes.length);
    }, 30000);
    return () => clearInterval(interval);
  }, []);
  const currentQuote = stoicQuotes[quoteIndex];

  // Rotating AI insight
  const [insightIndex, setInsightIndex] = useState(() => Math.floor(Math.random() * aiInsights.length));
  useEffect(() => {
    const interval = setInterval(() => {
      setInsightIndex((prev) => (prev + 1) % aiInsights.length);
    }, 20000);
    return () => clearInterval(interval);
  }, []);
  const currentInsight = aiInsights[insightIndex];

  // Chama apagada overlay
  const dishonoredClass = !chamaAtiva ? "opacity-60" : "";

  const AlertBanner = () => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-destructive/20 border border-destructive/40 rounded-xl p-3 flex items-center gap-3"
    >
      <AlertTriangle size={18} className="text-destructive flex-shrink-0" />
      <p className="font-cinzel text-xs font-bold text-destructive tracking-wider">
        TUA CHAMA SE APAGOU. TREINA HOJE PARA REACENDÊ-LA.
      </p>
    </motion.div>
  );

  const InsightCard = ({ insight, compact = false }: { insight: AiInsight; compact?: boolean }) => (
    <AnimatePresence mode="wait">
      <motion.div
        key={insight.text}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.4 }}
        className={`${insight.bgColor} rounded-xl border ${insight.borderColor} ${compact ? "p-4" : "p-5"}`}
      >
        <div className="flex items-start gap-3">
          <div className={`${compact ? "w-8 h-8" : "w-10 h-10"} rounded-lg ${insight.iconBg} flex items-center justify-center flex-shrink-0`}>
            <insight.icon size={compact ? 16 : 20} className={insight.textColor} />
          </div>
          <div className="flex-1">
            <h4 className={`font-cinzel ${compact ? "text-sm" : "text-sm"} font-bold ${insight.textColor} mb-1`}>{insight.name}</h4>
            <p className={`${compact ? "text-xs" : "text-sm"} text-muted-foreground leading-relaxed`}>{insight.text}</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );

  const StoicQuote = ({ compact = false }: { compact?: boolean }) => (
    <div className="bg-card/50 rounded-xl border border-border/50 p-4 text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={quoteIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className={`text-foreground/80 ${compact ? "text-xs" : "text-sm"} italic mb-2`}>"{currentQuote.text}"</p>
          <p className={`text-accent ${compact ? "text-[10px]" : "text-xs"} font-cinzel font-semibold`}>— {currentQuote.author}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );

  if (isMobile) {
    return (
      <div className={`p-4 max-w-lg mx-auto space-y-4 ${!chamaAtiva ? "relative" : ""}`}>
        {!chamaAtiva && <div className="absolute inset-0 bg-background/30 pointer-events-none z-0 rounded-xl" />}

        {/* Alert Banner */}
        {!chamaAtiva && <AlertBanner />}

        {/* Header */}
        <div className="flex items-center justify-between pt-2 relative z-10">
          <div className="flex items-center gap-3">
            <InsanoLogo size={36} />
            <div>
              <p className="text-muted-foreground text-xs">Ave, Guerreiro</p>
              <h1 className="font-cinzel text-lg font-bold text-foreground">SHAPE INSANO</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-card rounded-lg px-3 py-1.5 border border-border">
              <Flame size={14} className={chamaAtiva ? "text-primary" : "text-muted-foreground"} />
              <span className="font-cinzel text-xs font-bold text-foreground">{streak} dias</span>
            </div>
            <div className="flex items-center gap-1.5 bg-card rounded-lg px-3 py-1.5 border border-border">
              <Coins size={14} className="text-accent" />
              <span className="font-cinzel text-xs font-bold text-accent">1.250</span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className={`grid grid-cols-4 gap-2 relative z-10 ${dishonoredClass}`}>
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
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={`bg-card rounded-xl border border-border p-4 relative z-10 ${dishonoredClass}`}>
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
          className={`w-full py-4 crimson-gradient text-foreground font-cinzel font-bold text-lg rounded-xl crimson-shadow tracking-wider flex items-center justify-center gap-3 relative z-10 ${!chamaAtiva ? "animate-pulse-glow" : ""}`}
        >
          <Swords size={24} />
          {chamaAtiva ? "INICIAR BATALHA" : "REACENDER CHAMA"}
        </motion.button>

        {/* Performance Chart */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className={`bg-card rounded-xl border border-border p-4 relative z-10 ${dishonoredClass}`}>
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
        <div className="grid grid-cols-2 gap-3 relative z-10">
          <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate("/mentores")} className="py-3 bg-card border border-border rounded-xl font-cinzel text-sm font-semibold text-foreground flex items-center justify-center gap-2 hover:border-primary/50 transition-colors">
            <Users size={18} className="text-primary" />
            MENTORES
          </motion.button>
          <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate("/coliseu")} className="py-3 bg-card border border-border rounded-xl font-cinzel text-sm font-semibold text-foreground flex items-center justify-center gap-2 hover:border-accent/50 transition-colors">
            <Landmark size={18} className="text-accent" />
            COLISEU
          </motion.button>
        </div>

        {/* AI Insight by Mentor */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="relative z-10">
          <InsightCard insight={currentInsight} compact />
        </motion.div>

        {/* Stoic Quote */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="relative z-10">
          <StoicQuote compact />
        </motion.div>
      </div>
    );
  }

  // ========== DESKTOP LAYOUT ==========
  return (
    <div className={`p-6 max-w-7xl mx-auto space-y-6 ${!chamaAtiva ? "relative" : ""}`}>
      {!chamaAtiva && <div className="absolute inset-0 bg-background/20 pointer-events-none z-0 rounded-xl" />}

      {/* Alert Banner */}
      {!chamaAtiva && <AlertBanner />}

      {/* Desktop Header Bar */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <InsanoLogo size={44} />
          <div>
            <p className="text-muted-foreground text-xs">Ave, Guerreiro</p>
            <h1 className="font-cinzel text-2xl font-bold text-foreground">SHAPE INSANO</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className={`flex items-center gap-2 bg-card rounded-lg px-4 py-2 border border-border ${dishonoredClass}`}>
              <stat.icon size={16} className={stat.color} />
              <div>
                <p className="font-cinzel text-sm font-bold text-foreground">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground">{stat.sub || stat.label}</p>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-1.5 bg-card rounded-lg px-4 py-2 border border-border">
            <Flame size={16} className={chamaAtiva ? "text-primary" : "text-muted-foreground"} />
            <span className="font-cinzel text-sm font-bold text-foreground">{streak} dias</span>
          </div>
          <div className="flex items-center gap-1.5 bg-card rounded-lg px-4 py-2 border border-border">
            <Coins size={16} className="text-accent" />
            <span className="font-cinzel text-sm font-bold text-accent">1.250</span>
          </div>
        </div>
      </div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-3 gap-6 relative z-10">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {/* Chama de Vesta */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl border border-border p-6 flex flex-col items-center">
            <h3 className="font-cinzel text-sm font-bold text-foreground mb-4">Chama de Vesta</h3>
            <ChamaDeVesta streak={streak} maxStreak={18} isActive={chamaAtiva} />
            <p className="text-muted-foreground text-xs mt-4">{chamaAtiva ? "Consistência: 78%" : "Chama apagada"}</p>
          </motion.div>

          {/* XP & League */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={`bg-card rounded-xl border border-border p-6 ${dishonoredClass}`}>
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
              <Landmark size={22} className="text-accent" />
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
            className={`w-full py-5 crimson-gradient text-foreground font-cinzel font-bold text-xl rounded-xl crimson-shadow tracking-wider flex items-center justify-center gap-3 ${!chamaAtiva ? "animate-pulse-glow" : ""}`}
          >
            <Swords size={28} />
            {chamaAtiva ? "INICIAR BATALHA" : "REACENDER CHAMA"}
          </motion.button>

          {/* Performance Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className={`bg-card rounded-xl border border-border p-6 ${dishonoredClass}`}>
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

          {/* AI Insight by Mentor */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <InsightCard insight={currentInsight} />
          </motion.div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* Weekly Volume */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={`bg-card rounded-xl border border-border p-6 ${dishonoredClass}`}>
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className={`bg-card rounded-xl border border-border p-6 ${dishonoredClass}`}>
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
            <StoicQuote />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
