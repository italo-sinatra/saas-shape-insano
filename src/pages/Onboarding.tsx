import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, ChevronRight, User, Dumbbell, Apple, Brain } from "lucide-react";
import InvictusLogo from "@/components/InvictusLogo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface OnboardingProps {
  onComplete: () => void;
}

type Step = "welcome" | "cadastro" | "fisico" | "nutricional" | "psicologico" | "quiz" | "result" | "ignite";

const steps: Step[] = ["welcome", "cadastro", "fisico", "nutricional", "psicologico", "quiz", "result", "ignite"];

const stepLabels: Record<Step, string> = {
  welcome: "Início",
  cadastro: "Cadastro",
  fisico: "Físico",
  nutricional: "Nutrição",
  psicologico: "Mental",
  quiz: "Oráculo",
  result: "Classe",
  ignite: "Chama",
};

const stepIcons: Partial<Record<Step, typeof User>> = {
  cadastro: User,
  fisico: Dumbbell,
  nutricional: Apple,
  psicologico: Brain,
};

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

const restricoesAlimentares = [
  "Vegetariano", "Vegano", "Sem Lactose", "Sem Glúten", "Low Carb", "Sem Açúcar", "Kosher", "Halal",
];

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [step, setStep] = useState<Step>("welcome");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [resultClass, setResultClass] = useState<keyof typeof classResults | null>(null);

  // Anamnese data
  const [userData, setUserData] = useState({
    nome: "", email: "", telefone: "", nascimento: "", genero: "",
    peso: "", altura: "", objetivo: "", experiencia: "", frequencia: "",
    lesoes: "", esporte: "",
    restricoes: [] as string[], refeicoes: "", suplementos: "", hidratacao: "", alcool: "",
    estresse: [3], sono_qualidade: "", sono_horas: "", dificuldade: "", desistencia: "",
  });

  const updateField = (field: string, value: any) => setUserData((prev) => ({ ...prev, [field]: value }));

  const toggleRestricao = (r: string) => {
    setUserData((prev) => ({
      ...prev,
      restricoes: prev.restricoes.includes(r) ? prev.restricoes.filter((x) => x !== r) : [...prev.restricoes, r],
    }));
  };

  const currentStepIndex = steps.indexOf(step);
  const progress = ((currentStepIndex) / (steps.length - 1)) * 100;

  const nextStep = () => {
    const idx = steps.indexOf(step);
    if (idx < steps.length - 1) setStep(steps[idx + 1]);
  };

  const handleQuizAnswer = (classId: string) => {
    const newAnswers = [...quizAnswers, classId];
    setQuizAnswers(newAnswers);
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const counts: Record<string, number> = {};
      newAnswers.forEach((a) => { counts[a] = (counts[a] || 0) + 1; });
      const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as keyof typeof classResults;
      setResultClass(winner);
      setStep("result");
    }
  };

  const showStepper = step !== "welcome";

  const fieldClass = "bg-card border-border text-foreground";

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 marble-texture">
      {/* Stepper */}
      {showStepper && (
        <div className="w-full max-w-lg mb-6">
          <div className="flex items-center gap-1 mb-2">
            {steps.filter((s) => s !== "welcome").map((s, i) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  steps.indexOf(s) <= currentStepIndex ? "bg-primary" : "bg-secondary"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center font-cinzel tracking-widest">
            {stepLabels[step]}
          </p>
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* WELCOME */}
        {step === "welcome" && (
          <motion.div key="welcome" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="text-center max-w-md">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }} className="mx-auto mb-8">
              <InvictusLogo size={80} className="mx-auto" />
            </motion.div>
            <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-foreground mb-4">
              AVE, <span className="gold-text-gradient">GUERREIRO</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-2">Roma não foi construída em um dia.</p>
            <p className="text-muted-foreground mb-8">Mas tua jornada começa agora. Vamos conhecer teu perfil de legionário.</p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={nextStep} className="px-8 py-3 crimson-gradient text-foreground font-cinzel font-bold rounded-lg crimson-shadow tracking-wider">
              INICIAR RITUAL
            </motion.button>
          </motion.div>
        )}

        {/* CADASTRO */}
        {step === "cadastro" && (
          <motion.div key="cadastro" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }} className="max-w-lg w-full space-y-5">
            <div className="text-center mb-4">
              <User className="mx-auto text-primary mb-2" size={32} />
              <h2 className="font-cinzel text-xl font-bold text-foreground">Dados do Legionário</h2>
              <p className="text-sm text-muted-foreground">Identifique-se para a legião</p>
            </div>
            <div className="space-y-4">
              <div><Label className="text-muted-foreground text-xs">Nome completo</Label><Input className={fieldClass} value={userData.nome} onChange={(e) => updateField("nome", e.target.value)} placeholder="Marcus Aurelius" /></div>
              <div><Label className="text-muted-foreground text-xs">Email</Label><Input type="email" className={fieldClass} value={userData.email} onChange={(e) => updateField("email", e.target.value)} placeholder="marcus@roma.com" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label className="text-muted-foreground text-xs">Telefone / WhatsApp</Label><Input className={fieldClass} value={userData.telefone} onChange={(e) => updateField("telefone", e.target.value)} placeholder="(11) 99999-9999" /></div>
                <div><Label className="text-muted-foreground text-xs">Data de Nascimento</Label><Input type="date" className={fieldClass} value={userData.nascimento} onChange={(e) => updateField("nascimento", e.target.value)} /></div>
              </div>
              <div>
                <Label className="text-muted-foreground text-xs">Gênero</Label>
                <Select value={userData.genero} onValueChange={(v) => updateField("genero", v)}>
                  <SelectTrigger className={fieldClass}><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent><SelectItem value="masculino">Masculino</SelectItem><SelectItem value="feminino">Feminino</SelectItem><SelectItem value="outro">Outro</SelectItem><SelectItem value="prefiro_nao">Prefiro não dizer</SelectItem></SelectContent>
                </Select>
              </div>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={nextStep} className="w-full py-3 crimson-gradient text-foreground font-cinzel font-bold rounded-lg crimson-shadow tracking-wider mt-4">
              AVANÇAR
            </motion.button>
          </motion.div>
        )}

        {/* FISICO */}
        {step === "fisico" && (
          <motion.div key="fisico" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }} className="max-w-lg w-full space-y-5">
            <div className="text-center mb-4">
              <Dumbbell className="mx-auto text-primary mb-2" size={32} />
              <h2 className="font-cinzel text-xl font-bold text-foreground">Anamnese Física</h2>
              <p className="text-sm text-muted-foreground">Precisamos conhecer teu corpo de guerreiro</p>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div><Label className="text-muted-foreground text-xs">Peso (kg)</Label><Input type="number" className={fieldClass} value={userData.peso} onChange={(e) => updateField("peso", e.target.value)} placeholder="80" /></div>
                <div><Label className="text-muted-foreground text-xs">Altura (cm)</Label><Input type="number" className={fieldClass} value={userData.altura} onChange={(e) => updateField("altura", e.target.value)} placeholder="178" /></div>
              </div>
              <div>
                <Label className="text-muted-foreground text-xs">Objetivo principal</Label>
                <Select value={userData.objetivo} onValueChange={(v) => updateField("objetivo", v)}>
                  <SelectTrigger className={fieldClass}><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent><SelectItem value="perder_peso">Perder peso</SelectItem><SelectItem value="ganhar_massa">Ganhar massa muscular</SelectItem><SelectItem value="performance">Performance esportiva</SelectItem><SelectItem value="saude">Saúde geral</SelectItem></SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-muted-foreground text-xs">Nível de experiência</Label>
                <Select value={userData.experiencia} onValueChange={(v) => updateField("experiencia", v)}>
                  <SelectTrigger className={fieldClass}><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent><SelectItem value="iniciante">Iniciante (0-6 meses)</SelectItem><SelectItem value="intermediario">Intermediário (6m - 2 anos)</SelectItem><SelectItem value="avancado">Avançado (2+ anos)</SelectItem></SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-muted-foreground text-xs">Frequência semanal desejada</Label>
                <Select value={userData.frequencia} onValueChange={(v) => updateField("frequencia", v)}>
                  <SelectTrigger className={fieldClass}><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent><SelectItem value="2-3">2-3x por semana</SelectItem><SelectItem value="4-5">4-5x por semana</SelectItem><SelectItem value="6-7">6-7x por semana</SelectItem></SelectContent>
                </Select>
              </div>
              <div><Label className="text-muted-foreground text-xs">Lesões ou restrições físicas</Label><Textarea className={fieldClass} value={userData.lesoes} onChange={(e) => updateField("lesoes", e.target.value)} placeholder="Descreva se possui alguma lesão..." rows={2} /></div>
              <div><Label className="text-muted-foreground text-xs">Pratica algum esporte? Qual?</Label><Input className={fieldClass} value={userData.esporte} onChange={(e) => updateField("esporte", e.target.value)} placeholder="Ex: Jiu-Jitsu, Futebol..." /></div>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={nextStep} className="w-full py-3 crimson-gradient text-foreground font-cinzel font-bold rounded-lg crimson-shadow tracking-wider">
              AVANÇAR
            </motion.button>
          </motion.div>
        )}

        {/* NUTRICIONAL */}
        {step === "nutricional" && (
          <motion.div key="nutricional" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }} className="max-w-lg w-full space-y-5">
            <div className="text-center mb-4">
              <Apple className="mx-auto text-primary mb-2" size={32} />
              <h2 className="font-cinzel text-xl font-bold text-foreground">Anamnese Nutricional</h2>
              <p className="text-sm text-muted-foreground">O combustível do teu corpo de batalha</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-muted-foreground text-xs mb-2 block">Restrições alimentares</Label>
                <div className="grid grid-cols-2 gap-2">
                  {restricoesAlimentares.map((r) => (
                    <label key={r} className="flex items-center gap-2 p-2 rounded-md bg-card border border-border cursor-pointer hover:border-primary/30 transition-colors">
                      <Checkbox checked={userData.restricoes.includes(r)} onCheckedChange={() => toggleRestricao(r)} />
                      <span className="text-sm text-foreground">{r}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground text-xs">Quantas refeições por dia?</Label>
                <Select value={userData.refeicoes} onValueChange={(v) => updateField("refeicoes", v)}>
                  <SelectTrigger className={fieldClass}><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent><SelectItem value="1-2">1-2 refeições</SelectItem><SelectItem value="3-4">3-4 refeições</SelectItem><SelectItem value="5-6">5-6 refeições</SelectItem><SelectItem value="6+">6+ refeições</SelectItem></SelectContent>
                </Select>
              </div>
              <div><Label className="text-muted-foreground text-xs">Usa suplementos? Quais?</Label><Input className={fieldClass} value={userData.suplementos} onChange={(e) => updateField("suplementos", e.target.value)} placeholder="Ex: Whey, Creatina..." /></div>
              <div>
                <Label className="text-muted-foreground text-xs">Hidratação diária</Label>
                <Select value={userData.hidratacao} onValueChange={(v) => updateField("hidratacao", v)}>
                  <SelectTrigger className={fieldClass}><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent><SelectItem value="menos_1l">Menos de 1L</SelectItem><SelectItem value="1-2l">1-2L</SelectItem><SelectItem value="2-3l">2-3L</SelectItem><SelectItem value="mais_3l">Mais de 3L</SelectItem></SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-muted-foreground text-xs">Consumo de álcool</Label>
                <Select value={userData.alcool} onValueChange={(v) => updateField("alcool", v)}>
                  <SelectTrigger className={fieldClass}><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent><SelectItem value="nunca">Nunca</SelectItem><SelectItem value="social">Social / Ocasional</SelectItem><SelectItem value="frequente">Frequente</SelectItem></SelectContent>
                </Select>
              </div>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={nextStep} className="w-full py-3 crimson-gradient text-foreground font-cinzel font-bold rounded-lg crimson-shadow tracking-wider">
              AVANÇAR
            </motion.button>
          </motion.div>
        )}

        {/* PSICOLOGICO */}
        {step === "psicologico" && (
          <motion.div key="psicologico" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }} className="max-w-lg w-full space-y-5">
            <div className="text-center mb-4">
              <Brain className="mx-auto text-primary mb-2" size={32} />
              <h2 className="font-cinzel text-xl font-bold text-foreground">Perfil Mental</h2>
              <p className="text-sm text-muted-foreground">A mente de um guerreiro é sua maior arma</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-muted-foreground text-xs mb-3 block">Nível de estresse atual: <span className="text-foreground font-bold">{userData.estresse[0]}/5</span></Label>
                <Slider value={userData.estresse} onValueChange={(v) => updateField("estresse", v)} min={1} max={5} step={1} className="py-2" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>Tranquilo</span><span>Muito estressado</span></div>
              </div>
              <div>
                <Label className="text-muted-foreground text-xs">Qualidade do sono</Label>
                <Select value={userData.sono_qualidade} onValueChange={(v) => updateField("sono_qualidade", v)}>
                  <SelectTrigger className={fieldClass}><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent><SelectItem value="ruim">Ruim</SelectItem><SelectItem value="regular">Regular</SelectItem><SelectItem value="bom">Bom</SelectItem><SelectItem value="otimo">Ótimo</SelectItem></SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-muted-foreground text-xs">Horas de sono por noite</Label>
                <Select value={userData.sono_horas} onValueChange={(v) => updateField("sono_horas", v)}>
                  <SelectTrigger className={fieldClass}><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent><SelectItem value="menos_5">Menos de 5h</SelectItem><SelectItem value="5-6">5-6h</SelectItem><SelectItem value="7-8">7-8h</SelectItem><SelectItem value="mais_8">Mais de 8h</SelectItem></SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-muted-foreground text-xs">Maior dificuldade com consistência</Label>
                <Select value={userData.dificuldade} onValueChange={(v) => updateField("dificuldade", v)}>
                  <SelectTrigger className={fieldClass}><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent><SelectItem value="tempo">Falta de tempo</SelectItem><SelectItem value="motivacao">Falta de motivação</SelectItem><SelectItem value="organizacao">Falta de organização</SelectItem><SelectItem value="outro">Outro</SelectItem></SelectContent>
                </Select>
              </div>
              <div><Label className="text-muted-foreground text-xs">O que te faria desistir?</Label><Textarea className={fieldClass} value={userData.desistencia} onChange={(e) => updateField("desistencia", e.target.value)} placeholder="Seja honesto, isso nos ajuda a te manter no caminho..." rows={2} /></div>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={nextStep} className="w-full py-3 crimson-gradient text-foreground font-cinzel font-bold rounded-lg crimson-shadow tracking-wider">
              CONSULTAR O ORÁCULO
            </motion.button>
          </motion.div>
        )}

        {/* QUIZ */}
        {step === "quiz" && (
          <motion.div key={`quiz-${currentQuestion}`} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }} className="max-w-lg w-full">
            <p className="text-muted-foreground text-xs uppercase tracking-widest mb-2 font-cinzel">
              Oráculo — Pergunta {currentQuestion + 1} de {quizQuestions.length}
            </p>
            <h2 className="font-cinzel text-xl md:text-2xl font-bold text-foreground mb-6">
              {quizQuestions[currentQuestion].question}
            </h2>
            <div className="space-y-3">
              {quizQuestions[currentQuestion].options.map((option, i) => (
                <motion.button key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleQuizAnswer(option.class)} className="w-full text-left p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-all flex items-center justify-between group">
                  <span className="text-foreground text-sm">{option.text}</span>
                  <ChevronRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* RESULT */}
        {step === "result" && resultClass && (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }} className="text-center max-w-md">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }} className={`w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${classResults[resultClass].color} flex items-center justify-center`}>
              <span className="text-4xl">⚔</span>
            </motion.div>
            <p className="text-muted-foreground text-xs uppercase tracking-widest mb-2 font-cinzel">O Oráculo decretou</p>
            <h2 className="font-cinzel text-3xl font-bold text-foreground mb-1">{classResults[resultClass].name}</h2>
            <p className="text-primary font-cinzel font-semibold mb-4">{classResults[resultClass].subtitle}</p>
            <p className="text-muted-foreground text-sm mb-8">{classResults[resultClass].description}</p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setStep("ignite")} className="px-8 py-3 gold-gradient text-accent-foreground font-cinzel font-bold rounded-lg gold-shadow tracking-wider">
              ACEITAR DESTINO
            </motion.button>
          </motion.div>
        )}

        {/* IGNITE */}
        {step === "ignite" && (
          <motion.div key="ignite" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="text-center max-w-md">
            <motion.div animate={{ boxShadow: ["0 0 20px hsl(43 76% 53% / 0.2)", "0 0 60px hsl(43 76% 53% / 0.5)", "0 0 20px hsl(43 76% 53% / 0.2)"] }} transition={{ duration: 2, repeat: Infinity }} className="w-32 h-32 mx-auto mb-8 rounded-full bg-accent/10 flex items-center justify-center">
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <Flame className="text-accent" size={64} />
              </motion.div>
            </motion.div>
            <h2 className="font-cinzel text-2xl md:text-3xl font-bold mb-4">A <span className="gold-text-gradient">CHAMA DE VESTA</span></h2>
            <p className="text-muted-foreground mb-2">Tua chama foi acesa. Ela representa tua consistência.</p>
            <p className="text-muted-foreground mb-8 text-sm">Treine diariamente para mantê-la viva. Se ela apagar... enfrentarás a <strong className="text-foreground">Desonra</strong>.</p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onComplete} className="px-8 py-3 crimson-gradient text-foreground font-cinzel font-bold rounded-lg crimson-shadow tracking-wider">
              ENTRAR NA ARENA
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Onboarding;
