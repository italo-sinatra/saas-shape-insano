import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, ChevronRight } from "lucide-react";
import InvictusLogo from "@/components/InvictusLogo";

interface OnboardingProps {
  onComplete: () => void;
}

const quizQuestions = [
  {
    question: "Como você prefere iniciar seu dia?",
    options: [
      { text: "Com uma sessão intensa de exercícios pesados", class: "centurio" },
      { text: "Com uma corrida ao ar livre ou treino funcional", class: "velite" },
      { text: "Com um treino estruturado focado em cada músculo", class: "gladius" },
    ],
  },
  {
    question: "O que te motiva a treinar?",
    options: [
      { text: "Quero ficar mais forte e levantar mais peso", class: "centurio" },
      { text: "Quero ter mais resistência e agilidade", class: "velite" },
      { text: "Quero um corpo definido e estético", class: "gladius" },
    ],
  },
  {
    question: "Qual seu treino ideal?",
    options: [
      { text: "Agachamento, terra e supino pesados", class: "centurio" },
      { text: "HIIT, sprints e circuitos", class: "velite" },
      { text: "Séries focadas com tempo sob tensão", class: "gladius" },
    ],
  },
  {
    question: "Em uma batalha, qual seria seu papel?",
    options: [
      { text: "Na linha de frente quebrando escudos", class: "centurio" },
      { text: "Flanqueando o inimigo com velocidade", class: "velite" },
      { text: "Lutando com técnica e precisão", class: "gladius" },
    ],
  },
  {
    question: "O que é sucesso no treino para você?",
    options: [
      { text: "Bater recordes pessoais de carga", class: "centurio" },
      { text: "Melhorar tempo e resistência", class: "velite" },
      { text: "Ver a evolução no espelho", class: "gladius" },
    ],
  },
];

const classResults = {
  gladius: {
    name: "GLADIUS",
    subtitle: "Caminho da Hipertrofia",
    description: "Teu destino é forjar um corpo como aço romano. Foco em volume muscular e força estética.",
    color: "from-red-900 to-red-700",
  },
  velite: {
    name: "VELITE",
    subtitle: "Caminho da Agilidade",
    description: "Rápido como o vento do Mediterrâneo. Teu caminho é a resistência, a velocidade e a mobilidade.",
    color: "from-blue-900 to-blue-700",
  },
  centurio: {
    name: "CENTURIO",
    subtitle: "Caminho da Força Bruta",
    description: "Inabalável como as muralhas de Roma. Teu destino é a força máxima e a potência devastadora.",
    color: "from-amber-900 to-amber-700",
  },
};

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [step, setStep] = useState<"welcome" | "quiz" | "result" | "ignite">("welcome");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [resultClass, setResultClass] = useState<keyof typeof classResults | null>(null);

  const handleAnswer = (classId: string) => {
    const newAnswers = [...answers, classId];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result
      const counts: Record<string, number> = {};
      newAnswers.forEach((a) => {
        counts[a] = (counts[a] || 0) + 1;
      });
      const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as keyof typeof classResults;
      setResultClass(winner);
      setStep("result");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 marble-texture">
      <AnimatePresence mode="wait">
        {step === "welcome" && (
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
              className="mx-auto mb-8"
            >
              <InvictusLogo size={80} className="mx-auto" />
            </motion.div>
            <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-foreground mb-4">
              AVE, <span className="gold-text-gradient">GUERREIRO</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-2">
              Roma não foi construída em um dia.
            </p>
            <p className="text-muted-foreground mb-8">
              Mas tua jornada começa agora. Responda às perguntas do Oráculo e descubra tua classe de legionário.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep("quiz")}
              className="px-8 py-3 crimson-gradient text-foreground font-cinzel font-bold rounded-lg crimson-shadow tracking-wider"
            >
              INICIAR RITUAL
            </motion.button>
          </motion.div>
        )}

        {step === "quiz" && (
          <motion.div
            key={`quiz-${currentQuestion}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            className="max-w-lg w-full"
          >
            {/* Progress */}
            <div className="flex items-center gap-2 mb-8">
              {quizQuestions.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    i <= currentQuestion ? "bg-primary" : "bg-secondary"
                  }`}
                />
              ))}
            </div>

            <p className="text-muted-foreground text-xs uppercase tracking-widest mb-2 font-cinzel">
              Pergunta {currentQuestion + 1} de {quizQuestions.length}
            </p>
            <h2 className="font-cinzel text-xl md:text-2xl font-bold text-foreground mb-6">
              {quizQuestions[currentQuestion].question}
            </h2>

            <div className="space-y-3">
              {quizQuestions[currentQuestion].options.map((option, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(option.class)}
                  className="w-full text-left p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-all flex items-center justify-between group"
                >
                  <span className="text-foreground text-sm">{option.text}</span>
                  <ChevronRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step === "result" && resultClass && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-md"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className={`w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${classResults[resultClass].color} flex items-center justify-center`}
            >
              <span className="text-4xl">⚔</span>
            </motion.div>

            <p className="text-muted-foreground text-xs uppercase tracking-widest mb-2 font-cinzel">O Oráculo decretou</p>
            <h2 className="font-cinzel text-3xl font-bold text-foreground mb-1">
              {classResults[resultClass].name}
            </h2>
            <p className="text-primary font-cinzel font-semibold mb-4">{classResults[resultClass].subtitle}</p>
            <p className="text-muted-foreground text-sm mb-8">{classResults[resultClass].description}</p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep("ignite")}
              className="px-8 py-3 gold-gradient text-accent-foreground font-cinzel font-bold rounded-lg gold-shadow tracking-wider"
            >
              ACEITAR DESTINO
            </motion.button>
          </motion.div>
        )}

        {step === "ignite" && (
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
              className="px-8 py-3 crimson-gradient text-foreground font-cinzel font-bold rounded-lg crimson-shadow tracking-wider"
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
