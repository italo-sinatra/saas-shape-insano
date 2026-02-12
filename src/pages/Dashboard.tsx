import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Swords, Users, Coins, Heart, Brain, TrendingUp, Sparkles, Dumbbell, Target, Zap, Calendar, Award, Sword, Leaf, Landmark, AlertTriangle, Skull, ShieldOff } from "lucide-react";
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

// Dishonor quotes — darker, more confrontational
const dishonorQuotes = [
  { text: "A inação é a mãe da destruição. Cada dia sem luta é um dia mais perto do esquecimento.", author: "Mars" },
  { text: "Teu corpo não te pertence mais — pertence à preguiça que o governa.", author: "Sêneca" },
  { text: "O guerreiro que não treina é apenas um homem vestindo armadura vazia.", author: "Marco Aurélio" },
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

// Dishonor-mode insights — cold, confrontational
const dishonorInsights: AiInsight[] = [
  {
    mentor: "mars", name: "Mars", icon: Sword,
    text: "Estás a apodrecer. Cada dia sem treino, teus músculos definham. Levanta-te ou aceita a derrota.",
    bgColor: "bg-purple-900/20", borderColor: "border-purple-500/30", textColor: "text-purple-400", iconBg: "bg-purple-900/30",
  },
  {
    mentor: "seneca", name: "Sêneca", icon: Skull,
    text: "A chama que não ardes é a chama que esquecerão. O tempo não espera por covardes.",
    bgColor: "bg-purple-900/20", borderColor: "border-purple-500/30", textColor: "text-purple-400", iconBg: "bg-purple-900/30",
  },
  {
    mentor: "ceres", name: "Ceres", icon: Leaf,
    text: "Sem treino, a nutrição não constrói nada. Estás a alimentar um corpo que se recusa a lutar.",
    bgColor: "bg-purple-900/20", borderColor: "border-purple-500/30", textColor: "text-purple-400", iconBg: "bg-purple-900/30",
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

  // Choose quotes and insights based on state
  const activeQuotes = chamaAtiva ? stoicQuotes : dishonorQuotes;
  const activeInsights = chamaAtiva ? aiInsights : dishonorInsights;

  // Rotating stoic quote
  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * activeQuotes.length));
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % activeQuotes.length);
    }, chamaAtiva ? 30000 : 15000);
    return () => clearInterval(interval);
  }, [activeQuotes.length, chamaAtiva]);
  const currentQuote = activeQuotes[quoteIndex % activeQuotes.length];

  // Rotating AI insight
  const [insightIndex, setInsightIndex] = useState(() => Math.floor(Math.random() * activeInsights.length));
  useEffect(() => {
    const interval = setInterval(() => {
      setInsightIndex((prev) => (prev + 1) % activeInsights.length);
    }, 20000);
    return () => clearInterval(interval);
  }, [activeInsights.length]);
  const currentInsight = activeInsights[insightIndex % activeInsights.length];

  // Dishonor visual styles
  const cardBg = chamaAtiva ? "bg-card" : "bg-[hsl(var(--dishonor-card))]";
  const cardBorder = chamaAtiva ? "border-border" : "border-[hsl(var(--dishonor-border))]";
  const dishonoredClass = !chamaAtiva ? "opacity-50 saturate-[0.3]" : "";
  const textMuted = chamaAtiva ? "text-muted-foreground" : "text-[hsl(var(--dishonor-muted))]";

  const AlertBanner = () => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl p-4 flex items-center gap-3 border"
      style={{
        background: "linear-gradient(135deg, hsl(270 30% 12%), hsl(0 40% 12%))",
        borderColor: "hsl(var(--dishonor-accent))",
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ShieldOff size={20} style={{ color: "hsl(var(--dishonor-glow))" }} />
      </motion.div>
      <div className="flex-1">
        <p className="font-cinzel text-xs font-bold tracking-wider" style={{ color: "hsl(var(--dishonor-glow))" }}>
          TUA CHAMA SE EXTINGUIU
        </p>
        <p className="text-[10px] mt-0.5" style={{ color: "hsl(var(--dishonor-muted))" }}>
          Cada hora sem ação é mais uma camada de fraqueza. Volta à arena.
        </p>
      </div>
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
    <div
      className="rounded-xl border p-4 text-center"
      style={{
        background: chamaAtiva ? "hsl(var(--card) / 0.5)" : "hsl(var(--dishonor-card))",
        borderColor: chamaAtiva ? "hsl(var(--border) / 0.5)" : "hsl(var(--dishonor-border))",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={quoteIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p
            className={`${compact ? "text-xs" : "text-sm"} italic mb-2`}
            style={{ color: chamaAtiva ? "hsl(var(--foreground) / 0.8)" : "hsl(var(--dishonor-glow))" }}
          >
            "{currentQuote.text}"
          </p>
          <p
            className={`${compact ? "text-[10px]" : "text-xs"} font-cinzel font-semibold`}
            style={{ color: chamaAtiva ? "hsl(var(--accent))" : "hsl(var(--dishonor-muted))" }}
          >
            — {currentQuote.author}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );

  // ========== MOBILE LAYOUT ==========
  if (isMobile) {
    return (
      <div
        className="p-4 max-w-lg mx-auto space-y-4 relative min-h-screen"
        style={{ background: !chamaAtiva ? "hsl(var(--dishonor-bg))" : undefined }}
      >
        {/* Cold vignette overlay when dishonored */}
        {!chamaAtiva && (
          <div
            className="fixed inset-0 pointer-events-none z-0"
            style={{
              background: "radial-gradient(ellipse at center, transparent 40%, hsl(270 20% 4% / 0.6) 100%)",
            }}
          />
        )}

        {/* Alert Banner */}
        {!chamaAtiva && <AlertBanner />}

        {/* Header */}
        <div className="flex items-center justify-between pt-2 relative z-10">
          <div className="flex items-center gap-3">
            <InsanoLogo size={36} />
            <div>
              <p className={`text-xs ${textMuted}`}>Ave, Guerreiro</p>
              <h1 className="font-cinzel text-lg font-bold text-foreground">SHAPE INSANO</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1.5 ${cardBg} rounded-lg px-3 py-1.5 border ${cardBorder}`}>
              <Flame size={14} style={{ color: chamaAtiva ? "hsl(var(--primary))" : "hsl(var(--dishonor-muted))" }} />
              <span className="font-cinzel text-xs font-bold" style={{ color: chamaAtiva ? "hsl(var(--foreground))" : "hsl(var(--dishonor-muted))" }}>
                {streak} dias
              </span>
            </div>
            <div className={`flex items-center gap-1.5 ${cardBg} rounded-lg px-3 py-1.5 border ${cardBorder}`}>
              <Coins size={14} style={{ color: chamaAtiva ? "hsl(var(--accent))" : "hsl(var(--dishonor-muted))" }} />
              <span className="font-cinzel text-xs font-bold" style={{ color: chamaAtiva ? "hsl(var(--accent))" : "hsl(var(--dishonor-muted))" }}>
                1.250
              </span>
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
              className={`${cardBg} rounded-xl border ${cardBorder} p-3 text-center`}
            >
              <stat.icon size={16} className={chamaAtiva ? stat.color : ""} style={!chamaAtiva ? { color: "hsl(var(--dishonor-muted))" } : undefined} />
              <p className="font-cinzel text-sm font-bold" style={{ color: chamaAtiva ? "hsl(var(--foreground))" : "hsl(var(--dishonor-muted))" }}>
                {stat.value}
              </p>
              <p className="text-[10px]" style={{ color: "hsl(var(--muted-foreground))" }}>{stat.sub || stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Chama de Vesta — mobile prominent placement when dead */}
        {!chamaAtiva && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`${cardBg} rounded-xl border ${cardBorder} p-6 flex flex-col items-center relative z-10`}
          >
            <ChamaDeVesta streak={streak} maxStreak={18} isActive={chamaAtiva} />
          </motion.div>
        )}

        {/* XP Progress */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={`${cardBg} rounded-xl border ${cardBorder} p-4 relative z-10 ${dishonoredClass}`}>
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className={`text-[10px] uppercase tracking-wider ${textMuted}`}>Nível 12</p>
              <p className="font-cinzel text-sm font-bold" style={{ color: chamaAtiva ? "hsl(var(--accent))" : "hsl(var(--dishonor-muted))" }}>Equites</p>
            </div>
            <div className="text-right">
              <p className={`text-xs ${textMuted}`}>XP: 2.450 / 3.000</p>
            </div>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: chamaAtiva ? "hsl(var(--secondary))" : "hsl(var(--dishonor-border))" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: chamaAtiva ? "82%" : "82%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full rounded-full"
              style={{ background: chamaAtiva ? "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-glow)))" : "linear-gradient(135deg, hsl(var(--dishonor-accent)), hsl(var(--dishonor-border)))" }}
            />
          </div>
        </motion.div>

        {/* Battle Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/batalha")}
          className="w-full py-4 font-cinzel font-bold text-lg rounded-xl tracking-wider flex items-center justify-center gap-3 relative z-10"
          style={{
            background: chamaAtiva
              ? "linear-gradient(135deg, hsl(var(--crimson)), hsl(var(--crimson-glow)))"
              : "linear-gradient(135deg, hsl(270 40% 30%), hsl(270 50% 45%))",
            boxShadow: chamaAtiva
              ? "0 0 20px hsl(var(--crimson) / 0.3)"
              : "0 0 30px hsl(270 50% 40% / 0.4), 0 0 60px hsl(270 40% 30% / 0.2)",
            color: "hsl(var(--foreground))",
          }}
        >
          {chamaAtiva ? (
            <Swords size={24} />
          ) : (
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <Flame size={24} />
            </motion.div>
          )}
          {chamaAtiva ? "INICIAR BATALHA" : "REACENDER CHAMA"}
        </motion.button>

        {/* Performance Chart */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className={`${cardBg} rounded-xl border ${cardBorder} p-4 relative z-10 ${dishonoredClass}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-cinzel text-sm font-bold text-foreground">Evolução de Performance</h3>
            <span className={`text-[10px] ${textMuted} px-2 py-1 rounded`} style={{ background: chamaAtiva ? "hsl(var(--secondary))" : "hsl(var(--dishonor-border))" }}>Últimos 7 dias</span>
          </div>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="performanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chamaAtiva ? "hsl(0, 100%, 27%)" : "hsl(270, 40%, 35%)"} stopOpacity={0.4} />
                    <stop offset="95%" stopColor={chamaAtiva ? "hsl(0, 100%, 27%)" : "hsl(270, 40%, 35%)"} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "hsl(43, 10%, 55%)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(43, 10%, 55%)" }} axisLine={false} tickLine={false} domain={[50, 100]} />
                <Tooltip contentStyle={{ background: "hsl(0, 0%, 10%)", border: "1px solid hsl(0, 0%, 16%)", borderRadius: "8px", fontSize: "12px", color: "hsl(43, 30%, 85%)" }} />
                <Area type="monotone" dataKey="score" stroke={chamaAtiva ? "hsl(0, 100%, 27%)" : "hsl(270, 40%, 45%)"} fill="url(#performanceGradient)" strokeWidth={2} dot={{ fill: chamaAtiva ? "hsl(0, 100%, 35%)" : "hsl(270, 50%, 55%)", r: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Quick Nav */}
        <div className="grid grid-cols-2 gap-3 relative z-10">
          <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate("/mentores")} className={`py-3 ${cardBg} border ${cardBorder} rounded-xl font-cinzel text-sm font-semibold text-foreground flex items-center justify-center gap-2 transition-colors`}>
            <Users size={18} style={{ color: chamaAtiva ? "hsl(var(--primary))" : "hsl(var(--dishonor-accent))" }} />
            MENTORES
          </motion.button>
          <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate("/coliseu")} className={`py-3 ${cardBg} border ${cardBorder} rounded-xl font-cinzel text-sm font-semibold text-foreground flex items-center justify-center gap-2 transition-colors`}>
            <Landmark size={18} style={{ color: chamaAtiva ? "hsl(var(--accent))" : "hsl(var(--dishonor-accent))" }} />
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
    <div
      className="p-6 max-w-7xl mx-auto space-y-6 relative min-h-screen"
      style={{ background: !chamaAtiva ? "hsl(var(--dishonor-bg))" : undefined }}
    >
      {/* Cold vignette overlay */}
      {!chamaAtiva && (
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 30%, hsl(270 20% 4% / 0.7) 100%)",
          }}
        />
      )}

      {/* Alert Banner */}
      {!chamaAtiva && <AlertBanner />}

      {/* Desktop Header Bar */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <InsanoLogo size={44} />
          <div>
            <p className={`text-xs ${textMuted}`}>Ave, Guerreiro</p>
            <h1 className="font-cinzel text-2xl font-bold text-foreground">SHAPE INSANO</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className={`flex items-center gap-2 ${cardBg} rounded-lg px-4 py-2 border ${cardBorder} ${dishonoredClass}`}>
              <stat.icon size={16} style={{ color: chamaAtiva ? undefined : "hsl(var(--dishonor-muted))" }} className={chamaAtiva ? stat.color : ""} />
              <div>
                <p className="font-cinzel text-sm font-bold" style={{ color: chamaAtiva ? "hsl(var(--foreground))" : "hsl(var(--dishonor-muted))" }}>{stat.value}</p>
                <p className={`text-[10px] ${textMuted}`}>{stat.sub || stat.label}</p>
              </div>
            </div>
          ))}
          <div className={`flex items-center gap-1.5 ${cardBg} rounded-lg px-4 py-2 border ${cardBorder}`}>
            <Flame size={16} style={{ color: chamaAtiva ? "hsl(var(--primary))" : "hsl(var(--dishonor-muted))" }} />
            <span className="font-cinzel text-sm font-bold" style={{ color: chamaAtiva ? "hsl(var(--foreground))" : "hsl(var(--dishonor-muted))" }}>{streak} dias</span>
          </div>
          <div className={`flex items-center gap-1.5 ${cardBg} rounded-lg px-4 py-2 border ${cardBorder}`}>
            <Coins size={16} style={{ color: chamaAtiva ? "hsl(var(--accent))" : "hsl(var(--dishonor-muted))" }} />
            <span className="font-cinzel text-sm font-bold" style={{ color: chamaAtiva ? "hsl(var(--accent))" : "hsl(var(--dishonor-muted))" }}>1.250</span>
          </div>
        </div>
      </div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-3 gap-6 relative z-10">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {/* Chama de Vesta */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`${cardBg} rounded-xl border ${cardBorder} p-6 flex flex-col items-center`}>
            <h3 className="font-cinzel text-sm font-bold text-foreground mb-4">{chamaAtiva ? "Chama de Vesta" : "Chama Extinta"}</h3>
            <ChamaDeVesta streak={streak} maxStreak={18} isActive={chamaAtiva} />
            <p className={`text-xs mt-4 ${textMuted}`}>{chamaAtiva ? "Consistência: 78%" : "Sem atividade registrada"}</p>
          </motion.div>

          {/* XP & League */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={`${cardBg} rounded-xl border ${cardBorder} p-6 ${dishonoredClass}`}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className={`text-[10px] uppercase tracking-wider ${textMuted}`}>Nível 12</p>
                <p className="font-cinzel text-lg font-bold" style={{ color: chamaAtiva ? "hsl(var(--accent))" : "hsl(var(--dishonor-muted))" }}>Equites</p>
              </div>
              <Award size={24} style={{ color: chamaAtiva ? "hsl(var(--accent))" : "hsl(var(--dishonor-muted))" }} />
            </div>
            <p className={`text-xs mb-2 ${textMuted}`}>XP: 2.450 / 3.000</p>
            <div className="h-3 rounded-full overflow-hidden" style={{ background: chamaAtiva ? "hsl(var(--secondary))" : "hsl(var(--dishonor-border))" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "82%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full rounded-full"
                style={{ background: chamaAtiva ? "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-glow)))" : "linear-gradient(135deg, hsl(var(--dishonor-accent)), hsl(var(--dishonor-border)))" }}
              />
            </div>
            <p className={`text-[10px] mt-2 ${textMuted}`}>550 XP para Legionário</p>
          </motion.div>

          {/* Quick Nav */}
          <div className="grid grid-cols-2 gap-3">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => navigate("/mentores")} className={`py-4 ${cardBg} border ${cardBorder} rounded-xl font-cinzel text-sm font-semibold text-foreground flex flex-col items-center gap-2 transition-colors`}>
              <Users size={22} style={{ color: chamaAtiva ? "hsl(var(--primary))" : "hsl(var(--dishonor-accent))" }} />
              MENTORES
            </motion.button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => navigate("/coliseu")} className={`py-4 ${cardBg} border ${cardBorder} rounded-xl font-cinzel text-sm font-semibold text-foreground flex flex-col items-center gap-2 transition-colors`}>
              <Landmark size={22} style={{ color: chamaAtiva ? "hsl(var(--accent))" : "hsl(var(--dishonor-accent))" }} />
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
            className="w-full py-5 font-cinzel font-bold text-xl rounded-xl tracking-wider flex items-center justify-center gap-3"
            style={{
              background: chamaAtiva
                ? "linear-gradient(135deg, hsl(var(--crimson)), hsl(var(--crimson-glow)))"
                : "linear-gradient(135deg, hsl(270 40% 30%), hsl(270 50% 45%))",
              boxShadow: chamaAtiva
                ? "0 0 20px hsl(var(--crimson) / 0.3), 0 0 60px hsl(var(--crimson) / 0.1)"
                : "0 0 30px hsl(270 50% 40% / 0.5), 0 0 80px hsl(270 40% 30% / 0.2)",
              color: "hsl(var(--foreground))",
            }}
          >
            {chamaAtiva ? (
              <Swords size={28} />
            ) : (
              <motion.div animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
                <Flame size={28} />
              </motion.div>
            )}
            {chamaAtiva ? "INICIAR BATALHA" : "REACENDER CHAMA"}
          </motion.button>

          {/* Performance Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className={`${cardBg} rounded-xl border ${cardBorder} p-6 ${dishonoredClass}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-cinzel text-sm font-bold text-foreground">Evolução de Performance</h3>
              <span className={`text-[10px] ${textMuted} px-2 py-1 rounded`} style={{ background: chamaAtiva ? "hsl(var(--secondary))" : "hsl(var(--dishonor-border))" }}>Últimos 7 dias</span>
            </div>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="perfGradDesktop" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chamaAtiva ? "hsl(0, 100%, 27%)" : "hsl(270, 40%, 35%)"} stopOpacity={0.4} />
                      <stop offset="95%" stopColor={chamaAtiva ? "hsl(0, 100%, 27%)" : "hsl(270, 40%, 35%)"} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(43, 10%, 55%)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(43, 10%, 55%)" }} axisLine={false} tickLine={false} domain={[50, 100]} />
                  <Tooltip contentStyle={{ background: "hsl(0, 0%, 10%)", border: "1px solid hsl(0, 0%, 16%)", borderRadius: "8px", fontSize: "12px", color: "hsl(43, 30%, 85%)" }} />
                  <Area type="monotone" dataKey="score" stroke={chamaAtiva ? "hsl(0, 100%, 27%)" : "hsl(270, 40%, 45%)"} fill="url(#perfGradDesktop)" strokeWidth={2} dot={{ fill: chamaAtiva ? "hsl(0, 100%, 35%)" : "hsl(270, 50%, 55%)", r: 4 }} />
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={`${cardBg} rounded-xl border ${cardBorder} p-6 ${dishonoredClass}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-cinzel text-sm font-bold text-foreground">Volume Semanal</h3>
              <TrendingUp size={16} style={{ color: chamaAtiva ? "hsl(var(--accent))" : "hsl(var(--dishonor-muted))" }} />
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyVolume}>
                  <XAxis dataKey="week" tick={{ fontSize: 11, fill: "hsl(43, 10%, 55%)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "hsl(43, 10%, 55%)" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "hsl(0, 0%, 10%)", border: "1px solid hsl(0, 0%, 16%)", borderRadius: "8px", fontSize: "12px", color: "hsl(43, 30%, 85%)" }} />
                  <Bar dataKey="volume" fill={chamaAtiva ? "hsl(43, 76%, 53%)" : "hsl(270, 30%, 35%)"} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Daily Targets */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className={`${cardBg} rounded-xl border ${cardBorder} p-6 ${dishonoredClass}`}>
            <h3 className="font-cinzel text-sm font-bold text-foreground mb-4">Metas Diárias</h3>
            <div className="space-y-3">
              {[
                { label: "Proteína", current: 142, target: 180, unit: "g", color: chamaAtiva ? "hsl(var(--primary))" : "hsl(var(--dishonor-accent))" },
                { label: "Água", current: 2.1, target: 3, unit: "L", color: chamaAtiva ? "hsl(220, 60%, 50%)" : "hsl(var(--dishonor-frost))" },
                { label: "Sono", current: 7.5, target: 8, unit: "h", color: chamaAtiva ? "hsl(270, 60%, 50%)" : "hsl(var(--dishonor-accent))" },
                { label: "Passos", current: 8200, target: 10000, unit: "", color: chamaAtiva ? "hsl(var(--accent))" : "hsl(var(--dishonor-muted))" },
              ].map((goal) => (
                <div key={goal.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className={textMuted}>{goal.label}</span>
                    <span className="text-foreground font-semibold">{goal.current}{goal.unit} / {goal.target}{goal.unit}</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: chamaAtiva ? "hsl(var(--secondary))" : "hsl(var(--dishonor-border))" }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%`, background: goal.color }} />
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
