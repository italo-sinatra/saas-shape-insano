import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swords, Timer, ArrowLeft, Check, Flame, Loader2, ChevronDown, ChevronUp, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAddXpAndDracmas } from "@/hooks/useGamification";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

interface ExerciseSet {
  targetReps: number;
  actualReps: number | null;
  weight: number | null;
  done: boolean;
}

interface Exercise {
  name: string;
  videoUrl: string | null;
  sets: ExerciseSet[];
}

const initialExercises: Exercise[] = [
  { name: "Supino Inclinado", videoUrl: null, sets: Array(4).fill(null).map(() => ({ targetReps: 10, actualReps: null, weight: null, done: false })) },
  { name: "Remada Curvada", videoUrl: null, sets: Array(4).fill(null).map(() => ({ targetReps: 10, actualReps: null, weight: null, done: false })) },
  { name: "Desenvolvimento Militar", videoUrl: null, sets: Array(3).fill(null).map(() => ({ targetReps: 12, actualReps: null, weight: null, done: false })) },
  { name: "Agachamento", videoUrl: null, sets: Array(4).fill(null).map(() => ({ targetReps: 8, actualReps: null, weight: null, done: false })) },
  { name: "Barra Fixa", videoUrl: null, sets: Array(3).fill(null).map(() => ({ targetReps: 8, actualReps: null, weight: null, done: false })) },
];

const BattleMode = () => {
  const navigate = useNavigate();
  const addXpAndDracmas = useAddXpAndDracmas();
  const [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(true);
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [complete, setComplete] = useState(false);
  const [saving, setSaving] = useState(false);

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

  const allDone = exercises.every((ex) => ex.sets.every((s) => s.done));

  const confirmSet = async (exIndex: number, setIndex: number) => {
    const updated = [...exercises];
    const set = updated[exIndex].sets[setIndex];
    if (set.weight === null || set.actualReps === null) {
      toast.error("Preencha carga e repetições");
      return;
    }
    set.done = true;
    setExercises(updated);

    // Check all done
    if (updated.every((ex) => ex.sets.every((s) => s.done))) {
      setComplete(true);
      setRunning(false);
      setSaving(true);
      try {
        await addXpAndDracmas.mutateAsync({ xp: xpReward, dracmas: dracmasReward });
        toast.success("Batalha registrada!");
      } catch (err) {
        console.error("Erro ao salvar batalha:", err);
      } finally {
        setSaving(false);
      }
    }
  };

  const updateSet = (exIndex: number, setIndex: number, field: "weight" | "actualReps", value: string) => {
    const updated = [...exercises];
    const num = value === "" ? null : Number(value);
    updated[exIndex].sets[setIndex][field] = num;
    setExercises(updated);
  };

  const exerciseDoneCount = (ex: Exercise) => ex.sets.filter((s) => s.done).length;

  return (
    <div className="min-h-screen bg-background p-4 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pt-2">
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
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center mb-6">
        <div className={`inline-block rounded-2xl px-8 py-3 border-2 ${running ? "border-primary animate-pulse-glow" : "border-border"}`}>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Tempo de Batalha</p>
          <p className="font-cinzel text-3xl font-bold text-foreground tabular-nums">{formatTime(timer)}</p>
        </div>
      </motion.div>

      {/* Exercise list */}
      {!complete && (
        <div className="space-y-2 mb-6">
          {exercises.map((ex, exIdx) => {
            const isExpanded = expandedIndex === exIdx;
            const doneCount = exerciseDoneCount(ex);
            const allSetsDone = doneCount === ex.sets.length;

            return (
              <motion.div
                key={exIdx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: exIdx * 0.05 }}
                className={`rounded-xl border overflow-hidden transition-all ${
                  allSetsDone ? "bg-accent/10 border-accent/30" : "bg-card border-border"
                }`}
              >
                {/* Exercise header */}
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : exIdx)}
                  className="w-full flex items-center gap-3 p-3"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${allSetsDone ? "gold-gradient" : "bg-secondary"}`}>
                    {allSetsDone ? <Check size={16} className="text-accent-foreground" /> : <span className="text-xs text-muted-foreground">{exIdx + 1}</span>}
                  </div>
                  <div className="flex-1 text-left">
                    <p className={`text-sm font-semibold ${allSetsDone ? "text-accent line-through" : "text-foreground"}`}>{ex.name}</p>
                    <p className="text-xs text-muted-foreground">{doneCount}/{ex.sets.length} séries</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Video placeholder */}
                    {ex.videoUrl ? (
                      <a href={ex.videoUrl} target="_blank" rel="noreferrer" className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Play size={12} className="text-primary" />
                      </a>
                    ) : (
                      <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center" title="Vídeo em breve">
                        <Play size={12} className="text-muted-foreground" />
                      </div>
                    )}
                    {isExpanded ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
                  </div>
                </button>

                {/* Sets detail */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-3 pb-3 space-y-2">
                        {/* Header row */}
                        <div className="grid grid-cols-[1fr_4fr_4fr_3fr] gap-2 text-[10px] text-muted-foreground uppercase tracking-wider px-1">
                          <span>Série</span>
                          <span>Carga (kg)</span>
                          <span>Reps</span>
                          <span></span>
                        </div>
                        {ex.sets.map((set, setIdx) => (
                          <div
                            key={setIdx}
                            className={`grid grid-cols-[1fr_4fr_4fr_3fr] gap-2 items-center p-2 rounded-lg ${
                              set.done ? "bg-accent/10" : "bg-secondary/50"
                            }`}
                          >
                            <span className="text-xs font-semibold text-muted-foreground text-center">{setIdx + 1}</span>
                            <Input
                              type="number"
                              placeholder="kg"
                              value={set.weight ?? ""}
                              onChange={(e) => updateSet(exIdx, setIdx, "weight", e.target.value)}
                              disabled={set.done}
                              className="h-8 text-xs bg-background border-border text-center"
                            />
                            <Input
                              type="number"
                              placeholder={`${set.targetReps}`}
                              value={set.actualReps ?? ""}
                              onChange={(e) => updateSet(exIdx, setIdx, "actualReps", e.target.value)}
                              disabled={set.done}
                              className="h-8 text-xs bg-background border-border text-center"
                            />
                            {set.done ? (
                              <div className="flex justify-center">
                                <Check size={16} className="text-accent" />
                              </div>
                            ) : (
                              <button
                                onClick={() => confirmSet(exIdx, setIdx)}
                                className="h-8 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary text-xs font-semibold transition-colors"
                              >
                                OK
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Complete overlay */}
      {complete && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center mt-8">
          <motion.div
            animate={{ boxShadow: ["0 0 20px hsl(43 76% 53% / 0.2)", "0 0 60px hsl(43 76% 53% / 0.5)", "0 0 20px hsl(43 76% 53% / 0.2)"] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center"
          >
            <Flame className="text-accent" size={40} />
          </motion.div>
          <h2 className="font-cinzel text-xl font-bold text-foreground mb-2">VITÓRIA!</h2>
          <p className="text-muted-foreground text-sm mb-1">Batalha concluída em {formatTime(timer)}</p>

          {/* Volume summary */}
          <div className="bg-card border border-border rounded-xl p-4 my-4 text-left">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Resumo da Batalha</p>
            {exercises.map((ex, i) => {
              const vol = ex.sets.reduce((acc, s) => acc + (s.weight ?? 0) * (s.actualReps ?? 0), 0);
              return (
                <div key={i} className="flex justify-between text-xs py-1 border-b border-border/30 last:border-0">
                  <span className="text-foreground">{ex.name}</span>
                  <span className="text-accent font-semibold">{vol.toLocaleString()} kg</span>
                </div>
              );
            })}
            <div className="flex justify-between text-sm pt-2 mt-1 border-t border-border">
              <span className="font-cinzel font-bold text-foreground">Volume Total</span>
              <span className="font-cinzel font-bold text-accent">
                {exercises.reduce((acc, ex) => acc + ex.sets.reduce((a, s) => a + (s.weight ?? 0) * (s.actualReps ?? 0), 0), 0).toLocaleString()} kg
              </span>
            </div>
          </div>

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
