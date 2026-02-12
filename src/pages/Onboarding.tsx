import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sword, Wind, Shield, Flame } from "lucide-react";

interface OnboardingProps {
  onComplete: () => void;
}

const classes = [
  {
    id: "gladius",
    name: "GLADIUS",
    subtitle: "Caminho da Hipertrofia",
    description: "Forja teu corpo como aço romano. Foco em volume muscular e força estética.",
    icon: Sword,
    color: "from-red-900 to-red-700",
    borderColor: "border-red-800",
    accent: "text-red-400",
  },
  {
    id: "velite",
    name: "VELITE",
    subtitle: "Caminho da Agilidade",
    description: "Rápido como o vento do Mediterrâneo. Foco em cardio, resistência e mobilidade.",
    icon: Wind,
    color: "from-blue-900 to-blue-700",
    borderColor: "border-blue-800",
    accent: "text-blue-400",
  },
  {
    id: "centurio",
    name: "CENTURIO",
    subtitle: "Caminho da Força Bruta",
    description: "Inabalável como as muralhas de Roma. Foco em força máxima e potência.",
    icon: Shield,
    color: "from-amber-900 to-amber-700",
    borderColor: "border-amber-800",
    accent: "text-amber-400",
  },
];

const steps = [
  { id: "welcome", title: "O Ritual de Alistamento" },
  { id: "class", title: "Escolha Tua Classe" },
  { id: "ignite", title: "Acenda a Chama" },
];

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [step, setStep] = useState(0);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 marble-texture">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-md"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="w-20 h-20 mx-auto mb-8 rounded-full bg-accent/20 flex items-center justify-center"
            >
              <Flame className="text-accent" size={40} />
            </motion.div>
            <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-foreground mb-4">
              AVE, <span className="gold-text-gradient">GUERREIRO</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-2">
              Roma não foi construída em um dia.
            </p>
            <p className="text-muted-foreground mb-8">
              Mas tua jornada começa agora. Escolhe teu caminho e acende a Chama de Vesta que guiará teus passos.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep(1)}
              className="px-8 py-3 gold-gradient text-accent-foreground font-cinzel font-bold rounded-lg gold-shadow tracking-wider"
            >
              INICIAR RITUAL
            </motion.button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="class"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl w-full"
          >
            <h2 className="font-cinzel text-2xl md:text-3xl font-bold text-center mb-2 text-foreground">
              ESCOLHA TUA <span className="gold-text-gradient">CLASSE</span>
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              Cada legionário tem sua especialidade. Qual será a tua?
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {classes.map((cls, i) => (
                <motion.div
                  key={cls.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  whileHover={{ y: -4 }}
                  onClick={() => setSelectedClass(cls.id)}
                  className={`cursor-pointer rounded-xl border-2 p-6 transition-all duration-300 bg-card ${
                    selectedClass === cls.id
                      ? `${cls.borderColor} gold-shadow`
                      : "border-border hover:border-muted-foreground/30"
                  }`}
                >
                  <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${cls.color} flex items-center justify-center mb-4`}>
                    <cls.icon className="text-white" size={28} />
                  </div>
                  <h3 className={`font-cinzel text-xl font-bold mb-1 ${cls.accent}`}>
                    {cls.name}
                  </h3>
                  <p className="text-sm text-accent font-semibold mb-2">{cls.subtitle}</p>
                  <p className="text-sm text-muted-foreground">{cls.description}</p>
                  {selectedClass === cls.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="mt-3 text-center text-accent font-cinzel text-sm font-bold"
                    >
                      ⚔ SELECIONADO
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {selectedClass && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep(2)}
                  className="px-8 py-3 gold-gradient text-accent-foreground font-cinzel font-bold rounded-lg gold-shadow tracking-wider"
                >
                  CONFIRMAR CLASSE
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="ignite"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-md"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px hsl(43 76% 53% / 0.2)",
                  "0 0 60px hsl(43 76% 53% / 0.5)",
                  "0 0 20px hsl(43 76% 53% / 0.2)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-32 h-32 mx-auto mb-8 rounded-full bg-accent/10 flex items-center justify-center"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Flame className="text-accent" size={64} />
              </motion.div>
            </motion.div>

            <h2 className="font-cinzel text-2xl md:text-3xl font-bold mb-4">
              A <span className="gold-text-gradient">CHAMA DE VESTA</span>
            </h2>
            <p className="text-muted-foreground mb-2">
              Tua chama foi acesa. Ela representa tua consistência.
            </p>
            <p className="text-muted-foreground mb-8 text-sm">
              Treine diariamente para mantê-la viva. Se ela apagar... enfrentarás a <strong className="text-foreground">Desonra</strong>.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onComplete}
              className="px-8 py-3 gold-gradient text-accent-foreground font-cinzel font-bold rounded-lg gold-shadow tracking-wider"
            >
              ENTRAR NA ARENA
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Onboarding;
