import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Swords, Timer, ArrowLeft, Check, Flame, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useAddXpAndDracmas } from "@/hooks/useGamification";
import { toast } from "sonner";

const exercises = [
  { name: "Supino Reto", sets: 4, reps: 10, done: false },
  { name: "Remada Curvada", sets: 4, reps: 10, done: false },
  { name: "Desenvolvimento Militar", sets: 3, reps: 12, done: false },
  { name: "Agachamento", sets: 4, reps: 8, done: false },
  { name: "Barra Fixa", sets: 3, reps: 8, done: false },
];

const BattleMode = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const addXpAndDracmas = useAddXpAndDracmas();
  const [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(true);
  const [exerciseList, setExerciseList] = useState(exercises);
  const [complete, setComplete] = useState(false);
  const [saving, setSaving] = useState(false);
  const [startedAt] = useState(new Date().toISOString());

  useEffect(() => {
    if (!running || complete) return;
    const interval = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [running, complete]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const xpReward = 350;
  const dracmasReward = 50;

  const toggleExercise = async (index: number) => {
    const updated = [...exerciseList];
    updated[index].done = !updated[index].done;
    setExerciseList(updated);
    if (updated.every((e) => e.done)) {
      setComplete(true);
      setRunning(false);
      
      // Save workout to DB
      if (user) {
        setSaving(true);
        try {
          await supabase.from("workouts").insert({
            user_id: user.id,
            started_at: startedAt,
            finished_at: new Date().toISOString(),
            duration_seconds: timer,
            exercises: updated.map((e) => ({ name: e.name, sets: e.sets, reps: e.reps })) as any,
            xp_earned: xpReward,
            dracmas_earned: dracmasReward,
          } as any);

          await addXpAndDracmas.mutateAsync({ xp: xpReward, dracmas: dracmasReward });
          toast.success("Batalha registrada!");
        } catch (err) {
          console.error("Erro ao salvar batalha:", err);
        } finally {
          setSaving(false);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pt-2">
        <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-2">
          <Swords size={20} className="text-primary" />
          <span className="font-cinzel font-bold text-primary text-sm">MODO BATALHA</span>
        </div>
        <div />
      </div>

      {/* Timer */}
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center mb-8">
        <div className={`inline-block rounded-2xl px-8 py-4 border-2 ${running ? "border-primary animate-pulse-glow" : "border-border"}`}>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Tempo de Batalha</p>
          <p className="font-cinzel text-4xl font-bold text-foreground tabular-nums">{formatTime(timer)}</p>
        </div>
      </motion.div>

      {/* Exercise list */}
      <div className="space-y-2 mb-8">
        {exerciseList.map((ex, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => !complete && toggleExercise(i)}
            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
              ex.done ? "bg-accent/10 border-accent/30" : "bg-card border-border hover:border-primary/30"
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${ex.done ? "gold-gradient" : "bg-secondary"}`}>
              {ex.done ? <Check size={16} className="text-accent-foreground" /> : <span className="text-xs text-muted-foreground">{i + 1}</span>}
            </div>
            <div className="flex-1">
              <p className={`text-sm font-semibold ${ex.done ? "text-accent line-through" : "text-foreground"}`}>{ex.name}</p>
              <p className="text-xs text-muted-foreground">{ex.sets} séries × {ex.reps} reps</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Complete overlay */}
      {complete && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.div
            animate={{ boxShadow: ["0 0 20px hsl(43 76% 53% / 0.2)", "0 0 60px hsl(43 76% 53% / 0.5)", "0 0 20px hsl(43 76% 53% / 0.2)"] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center"
          >
            <Flame className="text-accent" size={40} />
          </motion.div>
          <h2 className="font-cinzel text-xl font-bold text-foreground mb-2">VITÓRIA!</h2>
          <p className="text-muted-foreground text-sm mb-1">Batalha concluída em {formatTime(timer)}</p>
          <p className="text-accent text-sm font-cinzel mb-6">+{xpReward} XP • +{dracmasReward} Dracmas</p>
          {saving ? (
            <Loader2 className="animate-spin mx-auto text-accent" size={24} />
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              className="px-8 py-3 gold-gradient text-accent-foreground font-cinzel font-bold rounded-lg gold-shadow tracking-wider"
            >
              VOLTAR À ARENA
            </motion.button>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default BattleMode;
