import { useState } from "react";
import posturalFrenteCostas from "@/assets/postural-frente-costas.png";
import posturalPerfil from "@/assets/postural-perfil.png";
import posturalTeste from "@/assets/postural-teste.png";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, ChevronRight, User, Dumbbell, Apple, Brain, Camera, Target, Building2, HeartPulse, Coffee } from "lucide-react";
import InsanoLogo from "@/components/InsanoLogo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import FileUploadField from "./onboarding/FileUploadField";
import CheckboxGroup from "./onboarding/CheckboxGroup";
import {
  type Step, type UserData, steps, stepLabels, initialUserData,
  quizQuestions, classResults,
  faixasEtarias, tempoAcompanha, maquinasAcademia, doencasOpcoes,
  alergiasOpcoes, frutasOpcoes, suplementosOpcoes, restricoesOpcoes,
  caloriasOpcoes, aguaOpcoes, faixasSalariais,
} from "./onboarding/constants";

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [step, setStep] = useState<Step>("welcome");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [resultClass, setResultClass] = useState<keyof typeof classResults | null>(null);
  const [userData, setUserData] = useState<UserData>(initialUserData);

  const u = <K extends keyof UserData>(field: K, value: UserData[K]) =>
    setUserData((prev) => ({ ...prev, [field]: value }));

  const toggleArray = (field: keyof UserData, val: string) => {
    const arr = userData[field] as string[];
    u(field, (arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]) as any);
  };

  const currentStepIndex = steps.indexOf(step);
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
  const fc = "bg-card border-border text-foreground";

  const stepMotion = { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -40 }, transition: { duration: 0.4 } };

  const AdvanceButton = ({ label = "AVANÇAR", onClick }: { label?: string; onClick?: () => void }) => (
    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onClick || nextStep}
      className="w-full py-3 crimson-gradient text-foreground font-cinzel font-bold rounded-lg crimson-shadow tracking-wider mt-4">
      {label}
    </motion.button>
  );

  const SectionHeader = ({ icon: Icon, title, subtitle }: { icon: any; title: string; subtitle: string }) => (
    <div className="text-center mb-4">
      <Icon className="mx-auto text-primary mb-2" size={32} />
      <h2 className="font-cinzel text-xl font-bold text-foreground">{title}</h2>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-start p-4 marble-texture overflow-y-auto">
      {showStepper && (
        <div className="w-full max-w-lg mb-6 pt-2">
          <div className="flex items-center gap-1 mb-2">
            {steps.filter((s) => s !== "welcome").map((s) => (
              <div key={s} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${steps.indexOf(s) <= currentStepIndex ? "bg-primary" : "bg-secondary"}`} />
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center font-cinzel tracking-widest">{stepLabels[step]}</p>
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* WELCOME */}
        {step === "welcome" && (
          <motion.div key="welcome" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="text-center max-w-md mt-20">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }} className="mx-auto mb-8">
              <InsanoLogo size={80} className="mx-auto" />
            </motion.div>
            <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-foreground mb-4">AVE, <span className="gold-text-gradient">GUERREIRO</span></h1>
            <p className="text-muted-foreground text-lg mb-2">Roma não foi construída em um dia.</p>
            <p className="text-muted-foreground mb-8">Mas tua jornada começa agora. Vamos conhecer teu perfil de legionário.</p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={nextStep} className="px-8 py-3 crimson-gradient text-foreground font-cinzel font-bold rounded-lg crimson-shadow tracking-wider">
              INICIAR RITUAL
            </motion.button>
          </motion.div>
        )}

        {/* CADASTRO */}
        {step === "cadastro" && (
          <motion.div key="cadastro" {...stepMotion} className="max-w-lg w-full space-y-5 pb-8">
            <SectionHeader icon={User} title="Dados do Legionário" subtitle="Identifique-se para a legião" />
            <div className="space-y-4">
              <div><Label className="text-muted-foreground text-xs">Nome completo (igual ao RG) <span className="text-primary">*</span></Label><Input className={fc} value={userData.nome} onChange={(e) => u("nome", e.target.value)} placeholder="Marcus Aurelius" /></div>
              <div><Label className="text-muted-foreground text-xs">Email mais utilizado <span className="text-primary">*</span></Label><Input type="email" className={fc} value={userData.email} onChange={(e) => u("email", e.target.value)} placeholder="marcus@roma.com" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label className="text-muted-foreground text-xs">Telefone/WhatsApp <span className="text-primary">*</span></Label><Input className={fc} value={userData.telefone} onChange={(e) => u("telefone", e.target.value)} placeholder="(61) 99999-9999" /></div>
                <div><Label className="text-muted-foreground text-xs">Data de nascimento <span className="text-primary">*</span></Label><Input type="date" className={fc} value={userData.nascimento} onChange={(e) => u("nascimento", e.target.value)} /></div>
              </div>
              <div><Label className="text-muted-foreground text-xs">CPF <span className="text-primary">*</span></Label><Input className={fc} value={userData.cpf} onChange={(e) => u("cpf", e.target.value)} placeholder="000.000.000-00" /></div>
              <div><Label className="text-muted-foreground text-xs">Cidade/Estado <span className="text-primary">*</span></Label><Input className={fc} value={userData.cidade_estado} onChange={(e) => u("cidade_estado", e.target.value)} placeholder="Brasília/DF" /></div>
              <div>
                <Label className="text-muted-foreground text-xs">Sexo <span className="text-primary">*</span></Label>
                <Select value={userData.sexo} onValueChange={(v) => u("sexo", v)}>
                  <SelectTrigger className={fc}><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent><SelectItem value="masculino">Masculino</SelectItem><SelectItem value="feminino">Feminino</SelectItem></SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-muted-foreground text-xs">Faixa etária <span className="text-primary">*</span></Label>
                <Select value={userData.faixa_etaria} onValueChange={(v) => u("faixa_etaria", v)}>
                  <SelectTrigger className={fc}><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>{faixasEtarias.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-muted-foreground text-xs">Há quanto tempo acompanha o @iigorcorrea? <span className="text-primary">*</span></Label>
                <Select value={userData.tempo_acompanha} onValueChange={(v) => u("tempo_acompanha", v)}>
                  <SelectTrigger className={fc}><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>{tempoAcompanha.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label className="text-muted-foreground text-xs">Altura (cm) <span className="text-primary">*</span></Label><Input type="number" className={fc} value={userData.altura} onChange={(e) => u("altura", e.target.value)} placeholder="178" /></div>
                <div><Label className="text-muted-foreground text-xs">Peso atual (kg) <span className="text-primary">*</span></Label><Input type="number" className={fc} value={userData.peso} onChange={(e) => u("peso", e.target.value)} placeholder="80" /></div>
              </div>
              <div><Label className="text-muted-foreground text-xs">Quais fatores te fizeram escolher o Clube Shape Insano? <span className="text-primary">*</span></Label><Textarea className={fc} value={userData.fatores_escolha} onChange={(e) => u("fatores_escolha", e.target.value)} placeholder="Conte-nos o que te motivou..." rows={2} /></div>
              <div>
                <Label className="text-muted-foreground text-xs">Você veio por indicação? <span className="text-primary">*</span></Label>
                <Select value={userData.indicacao} onValueChange={(v) => u("indicacao", v)}>
                  <SelectTrigger className={fc}><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent><SelectItem value="sim">Sim, eu vim por indicação</SelectItem><SelectItem value="nao">Não</SelectItem></SelectContent>
                </Select>
              </div>
              {userData.indicacao === "sim" && (
                <div className="space-y-3 pl-3 border-l-2 border-primary/30">
                  <div><Label className="text-muted-foreground text-xs">Nome de quem indicou</Label><Input className={fc} value={userData.indicacao_nome} onChange={(e) => u("indicacao_nome", e.target.value)} /></div>
                  <div><Label className="text-muted-foreground text-xs">Telefone de quem indicou (com DDD)</Label><Input className={fc} value={userData.indicacao_telefone} onChange={(e) => u("indicacao_telefone", e.target.value)} /></div>
                </div>
              )}
            </div>
            <AdvanceButton />
          </motion.div>
        )}

        {/* FOTOS */}
        {step === "fotos" && (
          <motion.div key="fotos" {...stepMotion} className="max-w-lg w-full space-y-5 pb-8">
            <SectionHeader icon={Camera} title="Análise Postural" subtitle="Fotos do seu físico atual" />
            <div className="bg-card border border-border rounded-lg p-3 text-xs text-muted-foreground space-y-2">
              <p>📸 As fotos deverão estar niveladas. Não force nenhuma postura.</p>
              <p>Apoie o celular em um tripé na altura entre o estômago e a cicatriz umbilical. Mostre corpo completo (pés à cabeça), sem camiseta/bermuda cobrindo as coxas.</p>
              <p className="text-foreground font-semibold">Dica: Deixe o celular filmando e tire print nas posições.</p>
            </div>

            {/* Frente e Costas */}
            <div className="space-y-3">
              <img src={posturalFrenteCostas} alt="Exemplo frente e costas" className="w-full rounded-lg border border-border" />
              <div className="grid grid-cols-2 gap-3">
                <FileUploadField label="Frente" value={userData.foto_frente} onChange={(f) => u("foto_frente", f)} required />
                <FileUploadField label="Costas" value={userData.foto_costas} onChange={(f) => u("foto_costas", f)} required />
              </div>
            </div>

            {/* Perfil Direito e Esquerdo */}
            <div className="space-y-3">
              <img src={posturalPerfil} alt="Exemplo perfil" className="w-full rounded-lg border border-border" />
              <div className="grid grid-cols-2 gap-3">
                <FileUploadField label="Lado Direito" value={userData.foto_direito} onChange={(f) => u("foto_direito", f)} required />
                <FileUploadField label="Lado Esquerdo" value={userData.foto_esquerdo} onChange={(f) => u("foto_esquerdo", f)} required />
              </div>
            </div>

            {/* Teste de sentar e alcançar */}
            <div className="space-y-3">
              <img src={posturalTeste} alt="Teste de sentar e alcançar" className="w-full rounded-lg border border-border" />
              <FileUploadField label="Perfil (foto de lado)" value={userData.foto_perfil} onChange={(f) => u("foto_perfil", f)} required />
            </div>
            <AdvanceButton />
          </motion.div>
        )}

        {/* OBJETIVO */}
        {step === "objetivo" && (
          <motion.div key="objetivo" {...stepMotion} className="max-w-lg w-full space-y-5 pb-8">
            <SectionHeader icon={Target} title="Objetivo" subtitle="Qual é a sua missão, legionário?" />
            <div className="space-y-4">
              <div>
                <Label className="text-muted-foreground text-xs">Objetivo principal <span className="text-primary">*</span></Label>
                <Select value={userData.objetivo} onValueChange={(v) => u("objetivo", v)}>
                  <SelectTrigger className={fc}><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="massa">Ganho de massa muscular</SelectItem>
                    <SelectItem value="gordura">Perda de gordura</SelectItem>
                    <SelectItem value="profissionais">Deixo para os profissionais avaliarem</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {userData.objetivo === "outro" && (
                <div><Label className="text-muted-foreground text-xs">Descreva seu objetivo</Label><Input className={fc} value={userData.objetivo_outro} onChange={(e) => u("objetivo_outro", e.target.value)} /></div>
              )}
              <div>
                <Label className="text-muted-foreground text-xs">Pretende ser atleta de fisiculturismo?</Label>
                <Select value={userData.fisiculturismo} onValueChange={(v) => u("fisiculturismo", v)}>
                  <SelectTrigger className={fc}><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent><SelectItem value="sim">Sim</SelectItem><SelectItem value="nao">Não</SelectItem></SelectContent>
                </Select>
              </div>
              {userData.fisiculturismo === "sim" && (
                <div className="space-y-3 pl-3 border-l-2 border-primary/30">
                  <p className="text-xs text-muted-foreground">Envie fotos posando na categoria pretendida:</p>
                  <FileUploadField label="Pose de frente" value={userData.foto_pose_frente} onChange={(f) => u("foto_pose_frente", f)} />
                  <FileUploadField label="Pose de lado" value={userData.foto_pose_lado} onChange={(f) => u("foto_pose_lado", f)} />
                  <FileUploadField label="Pose de costas" value={userData.foto_pose_costas} onChange={(f) => u("foto_pose_costas", f)} />
                </div>
              )}
              <div><Label className="text-muted-foreground text-xs">Influenciador favorito além do Igor (@ do Instagram)</Label><Input className={fc} value={userData.influenciador_favorito} onChange={(e) => u("influenciador_favorito", e.target.value)} placeholder="@exemplo" /></div>
            </div>
            <AdvanceButton />
          </motion.div>
        )}

        {/* TREINO */}
        {step === "treino" && (
          <motion.div key="treino" {...stepMotion} className="max-w-lg w-full space-y-5 pb-8">
            <SectionHeader icon={Dumbbell} title="Rotina de Batalha" subtitle="Como é seu treino atualmente?" />
            <div className="space-y-4">
              <div>
                <Label className="text-muted-foreground text-xs">Já pratica musculação? <span className="text-primary">*</span></Label>
                <Select value={userData.pratica_musculacao} onValueChange={(v) => u("pratica_musculacao", v)}>
                  <SelectTrigger className={fc}><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent><SelectItem value="sim">Sim</SelectItem><SelectItem value="nao">Não, irei começar</SelectItem></SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-muted-foreground text-xs">Onde treina? <span className="text-primary">*</span></Label>
                <Select value={userData.local_treino} onValueChange={(v) => u("local_treino", v)}>
                  <SelectTrigger className={fc}><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="academia">Academia</SelectItem>
                    <SelectItem value="casa">Em casa</SelectItem>
                    <SelectItem value="ambos">Parte na academia, parte em casa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {(userData.local_treino === "casa" || userData.local_treino === "ambos") && (
                <div><Label className="text-muted-foreground text-xs">Quais máquinas/pesos possui em casa?</Label><Textarea className={fc} value={userData.maquinas_casa} onChange={(e) => u("maquinas_casa", e.target.value)} placeholder="Seja específico..." rows={2} /></div>
              )}
              <CheckboxGroup
                label="Dias da semana disponíveis *"
                options={["Domingo", "Segunda", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]}
                value={userData.dias_semana}
                onChange={(v) => u("dias_semana", v)}
                columns={2}
              />
              <div>
                <Label className="text-muted-foreground text-xs">Frequência de compromisso <span className="text-primary">*</span></Label>
                <Select value={userData.frequencia} onValueChange={(v) => u("frequencia", v)}>
                  <SelectTrigger className={fc}><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    {["2", "3", "4", "5", "6", "7"].map((d) => <SelectItem key={d} value={d}>Até {d} dias na semana</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div><Label className="text-muted-foreground text-xs">Horário de treino <span className="text-primary">*</span></Label><Input className={fc} value={userData.horario_treino} onChange={(e) => u("horario_treino", e.target.value)} placeholder="Ex: 06:00" /></div>
              <div>
                <Label className="text-muted-foreground text-xs">Tempo disponível para treinar (sem cardio) <span className="text-primary">*</span></Label>
                <Select value={userData.tempo_treino} onValueChange={(v) => u("tempo_treino", v)}>
                  <SelectTrigger className={fc}><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="menos_1h">Menos de 1 hora</SelectItem>
                    <SelectItem value="1h">1 hora</SelectItem>
                    <SelectItem value="1h30">1 hora e 30 min</SelectItem>
                    <SelectItem value="2h">2 horas</SelectItem>
                    <SelectItem value="mais_2h">Mais de 2 horas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-muted-foreground text-xs">Tempo disponível para cardio <span className="text-primary">*</span></Label>
                <Select value={userData.tempo_cardio} onValueChange={(v) => u("tempo_cardio", v)}>
                  <SelectTrigger className={fc}><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="menos_15">Menos de 15 minutos</SelectItem>
                    <SelectItem value="15_30">Entre 15 e 30 minutos</SelectItem>
                    <SelectItem value="30_45">Entre 30 e 45 minutos</SelectItem>
                    <SelectItem value="45_60">Entre 45 minutos e 1 hora</SelectItem>
                    <SelectItem value="nao_tenho">Não tenho tempo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <FileUploadField label="Treino antigo (opcional)" value={userData.treino_antigo} onChange={(f) => u("treino_antigo", f)} />
            </div>
            <AdvanceButton />
          </motion.div>
        )}

        {/* ACADEMIA */}
        {step === "academia" && (
          <motion.div key="academia" {...stepMotion} className="max-w-lg w-full space-y-5 pb-8">
            <SectionHeader icon={Building2} title="Academia e Corpo" subtitle="Estrutura e prioridades" />
            <div className="space-y-4">
              <div><Label className="text-muted-foreground text-xs">Grupos musculares prioritários <span className="text-primary">*</span></Label><Textarea className={fc} value={userData.grupos_prioritarios} onChange={(e) => u("grupos_prioritarios", e.target.value)} placeholder="Quais grupos quer desenvolver com prioridade?" rows={3} /></div>
              <div>
                <Label className="text-muted-foreground text-xs">Possui dor/desconforto ao se movimentar? <span className="text-primary">*</span></Label>
                <Select value={userData.tem_dor} onValueChange={(v) => u("tem_dor", v)}>
                  <SelectTrigger className={fc}><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent><SelectItem value="sim">Sim</SelectItem><SelectItem value="nao">Não</SelectItem></SelectContent>
                </Select>
              </div>
              {userData.tem_dor === "sim" && (
                <div><Label className="text-muted-foreground text-xs">Descreva as dores e quando sente</Label><Textarea className={fc} value={userData.descricao_dor} onChange={(e) => u("descricao_dor", e.target.value)} rows={2} /></div>
              )}
              <div>
                <Label className="text-muted-foreground text-xs">Exercício que NÃO gosta de realizar? <span className="text-primary">*</span></Label>
                <Select value={userData.exercicio_nao_gosta} onValueChange={(v) => u("exercicio_nao_gosta", v)}>
                  <SelectTrigger className={fc}><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent><SelectItem value="sim">Sim</SelectItem><SelectItem value="nao">Não</SelectItem></SelectContent>
                </Select>
              </div>
              {userData.exercicio_nao_gosta === "sim" && (
                <div><Label className="text-muted-foreground text-xs">Descreva quais exercícios</Label><Textarea className={fc} value={userData.exercicio_nao_gosta_desc} onChange={(e) => u("exercicio_nao_gosta_desc", e.target.value)} rows={2} /></div>
              )}
              <div>
                <Label className="text-muted-foreground text-xs mb-2 block">Máquinas que NÃO tem na academia <span className="text-primary">*</span></Label>
                <ScrollArea className="h-64 rounded-lg border border-border p-2">
                  <div className="space-y-1">
                    <label className="flex items-center gap-2 p-2 rounded-md bg-card border border-accent/30 cursor-pointer hover:border-accent transition-colors">
                      <input type="checkbox" checked={userData.maquinas_nao_tem.includes("Tenho todas")} onChange={() => {
                        if (userData.maquinas_nao_tem.includes("Tenho todas")) {
                          u("maquinas_nao_tem", userData.maquinas_nao_tem.filter(x => x !== "Tenho todas"));
                        } else {
                          u("maquinas_nao_tem", ["Tenho todas"]);
                        }
                      }} className="accent-primary" />
                      <span className="text-foreground text-xs font-semibold">✅ Tenho todas as máquinas</span>
                    </label>
                    {maquinasAcademia.map((m) => (
                      <label key={m} className="flex items-center gap-2 p-2 rounded-md bg-card border border-border cursor-pointer hover:border-primary/30 transition-colors">
                        <input type="checkbox" checked={userData.maquinas_nao_tem.includes(m)} disabled={userData.maquinas_nao_tem.includes("Tenho todas")} onChange={() => toggleArray("maquinas_nao_tem", m)} className="accent-primary" />
                        <span className="text-foreground text-xs">{m}</span>
                      </label>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
            <AdvanceButton />
          </motion.div>
        )}

        {/* SAUDE */}
        {step === "saude" && (
          <motion.div key="saude" {...stepMotion} className="max-w-lg w-full space-y-5 pb-8">
            <SectionHeader icon={HeartPulse} title="Saúde" subtitle="Informações médicas importantes" />
            <div className="space-y-4">
              <CheckboxGroup label="Possui alguma doença? *" options={[...doencasOpcoes]} value={userData.doencas} onChange={(v) => u("doencas", v)} columns={2} />
              {!userData.doencas.includes("Nenhuma") && userData.doencas.length > 0 && (
                <div><Label className="text-muted-foreground text-xs">Outra doença não listada?</Label><Input className={fc} value={userData.doenca_outra} onChange={(e) => u("doenca_outra", e.target.value)} /></div>
              )}
              <div>
                <Label className="text-muted-foreground text-xs">Histórico familiar de doenças acima? <span className="text-primary">*</span></Label>
                <Select value={userData.historico_familiar} onValueChange={(v) => u("historico_familiar", v)}>
                  <SelectTrigger className={fc}><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent><SelectItem value="sim">Sim</SelectItem><SelectItem value="nao">Não</SelectItem></SelectContent>
                </Select>
              </div>
              {userData.historico_familiar === "sim" && (
                <div><Label className="text-muted-foreground text-xs">Descreva quais doenças</Label><Input className={fc} value={userData.historico_familiar_desc} onChange={(e) => u("historico_familiar_desc", e.target.value)} /></div>
              )}
              <div><Label className="text-muted-foreground text-xs">Medicamentos controlados <span className="text-primary">*</span></Label><Input className={fc} value={userData.medicamentos} onChange={(e) => u("medicamentos", e.target.value)} placeholder="Se sim, quais? Se não, escreva 'Nenhum'" /></div>
              <CheckboxGroup label="Alergia/intolerância? *" options={[...alergiasOpcoes]} value={userData.alergias} onChange={(v) => u("alergias", v)} columns={2} />
              {!userData.alergias.includes("Não tenho alergia") && userData.alergias.length > 0 && (
                <div><Label className="text-muted-foreground text-xs">Outra alergia?</Label><Input className={fc} value={userData.alergia_outra} onChange={(e) => u("alergia_outra", e.target.value)} /></div>
              )}
            </div>
            <AdvanceButton />
          </motion.div>
        )}

        {/* NUTRICIONAL */}
        {step === "nutricional" && (
          <motion.div key="nutricional" {...stepMotion} className="max-w-lg w-full space-y-5 pb-8">
            <SectionHeader icon={Apple} title="Combustível de Batalha" subtitle="Sua nutrição em detalhes" />
            <div className="space-y-4">
              <div>
                <Label className="text-muted-foreground text-xs">Nível de atividade no trabalho <span className="text-primary">*</span></Label>
                <Select value={userData.nivel_atividade} onValueChange={(v) => u("nivel_atividade", v)}>
                  <SelectTrigger className={fc}><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentario">Sedentário</SelectItem>
                    <SelectItem value="moderado">Moderadamente ativo</SelectItem>
                    <SelectItem value="ativo">Fisicamente ativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label className="text-muted-foreground text-xs">Média de passos diários / calorias gastas <span className="text-primary">*</span></Label><Input className={fc} value={userData.media_passos} onChange={(e) => u("media_passos", e.target.value)} placeholder="Ex: 8000 passos, 400 kcal" /></div>
              <div>
                <Label className="text-muted-foreground text-xs">Faz cardio? <span className="text-primary">*</span></Label>
                <Select value={userData.faz_cardio} onValueChange={(v) => u("faz_cardio", v)}>
                  <SelectTrigger className={fc}><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent><SelectItem value="sim">Sim</SelectItem><SelectItem value="nao">Não</SelectItem></SelectContent>
                </Select>
              </div>
              {userData.faz_cardio === "sim" && (
                <div>
                  <Label className="text-muted-foreground text-xs">Quanto tempo de cardio?</Label>
                  <Select value={userData.tempo_cardio_nutri} onValueChange={(v) => u("tempo_cardio_nutri", v)}>
                    <SelectTrigger className={fc}><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="menos_30">Menos de 30 min</SelectItem>
                      <SelectItem value="30">30 min</SelectItem>
                      <SelectItem value="45">45 min</SelectItem>
                      <SelectItem value="60">1 hora</SelectItem>
                      <SelectItem value="mais_60">Mais de 1 hora</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div>
                <Label className="text-muted-foreground text-xs">Quantas refeições por dia? <span className="text-primary">*</span></Label>
                <Select value={userData.refeicoes_dia} onValueChange={(v) => u("refeicoes_dia", v)}>
                  <SelectTrigger className={fc}><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>{["1", "2", "3", "4", "5", "6", "7"].map((n) => <SelectItem key={n} value={n}>{n}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label className="text-muted-foreground text-xs">Horário e descrição das refeições <span className="text-primary">*</span></Label><Textarea className={fc} value={userData.horario_refeicoes} onChange={(e) => u("horario_refeicoes", e.target.value)} placeholder="Ex: 07:00 - 3 ovos, pão integral..." rows={4} /></div>
              <div>
                <Label className="text-muted-foreground text-xs">Calorias atuais <span className="text-primary">*</span></Label>
                <Select value={userData.calorias} onValueChange={(v) => u("calorias", v)}>
                  <SelectTrigger className={fc}><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>{caloriasOpcoes.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label className="text-muted-foreground text-xs">Há quanto tempo consome essa faixa?</Label><Input className={fc} value={userData.tempo_calorias} onChange={(e) => u("tempo_calorias", e.target.value)} /></div>
              <CheckboxGroup label="Restrições alimentares *" options={restricoesOpcoes} value={userData.restricoes} onChange={(v) => u("restricoes", v)} columns={1} />
              <CheckboxGroup label="Selecione pelo menos 5 frutas que goste *" options={frutasOpcoes} value={userData.frutas} onChange={(v) => u("frutas", v)} columns={3} />
              <CheckboxGroup label="Suplementos que utiliza *" options={suplementosOpcoes} value={userData.suplementos} onChange={(v) => u("suplementos", v)} columns={2} />
            </div>
            <AdvanceButton />
          </motion.div>
        )}

        {/* ESTILO DE VIDA */}
        {step === "estilo_vida" && (
          <motion.div key="estilo_vida" {...stepMotion} className="max-w-lg w-full space-y-5 pb-8">
            <SectionHeader icon={Coffee} title="Mente e Recuperação" subtitle="Seu estilo de vida fora da arena" />
            <div className="space-y-4">
              <div><Label className="text-muted-foreground text-xs">Horário de dormir e acordar <span className="text-primary">*</span></Label><Input className={fc} value={userData.horario_sono} onChange={(e) => u("horario_sono", e.target.value)} placeholder="Ex: Durmo 23h, acordo 06h" /></div>
              <div>
                <Label className="text-muted-foreground text-xs">Qualidade do sono <span className="text-primary">*</span></Label>
                <Select value={userData.qualidade_sono} onValueChange={(v) => u("qualidade_sono", v)}>
                  <SelectTrigger className={fc}><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ruim">Ruim</SelectItem><SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="bom">Bom</SelectItem><SelectItem value="otimo">Ótimo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label className="text-muted-foreground text-xs">Alimentos que quer diariamente na dieta (mín. 3) <span className="text-primary">*</span></Label><Textarea className={fc} value={userData.alimentos_diarios} onChange={(e) => u("alimentos_diarios", e.target.value)} placeholder="Seja sincero..." rows={2} /></div>
              <div><Label className="text-muted-foreground text-xs">Alimentos que NÃO come de jeito nenhum <span className="text-primary">*</span></Label><Textarea className={fc} value={userData.alimentos_nao_come} onChange={(e) => u("alimentos_nao_come", e.target.value)} rows={2} /></div>
              <div>
                <Label className="text-muted-foreground text-xs">Litros de água por dia <span className="text-primary">*</span></Label>
                <Select value={userData.agua} onValueChange={(v) => u("agua", v)}>
                  <SelectTrigger className={fc}><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>{aguaOpcoes.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-muted-foreground text-xs">Toma líquido junto das refeições? <span className="text-primary">*</span></Label>
                <Select value={userData.liquido_refeicao} onValueChange={(v) => u("liquido_refeicao", v)}>
                  <SelectTrigger className={fc}><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent><SelectItem value="sim">Sim</SelectItem><SelectItem value="nao">Não</SelectItem></SelectContent>
                </Select>
              </div>
              {userData.liquido_refeicao === "sim" && (
                <div><Label className="text-muted-foreground text-xs">Qual líquido?</Label><Input className={fc} value={userData.liquido_qual} onChange={(e) => u("liquido_qual", e.target.value)} /></div>
              )}
              <div>
                <Label className="text-muted-foreground text-xs">Disponibilidade de investir na dieta <span className="text-primary">*</span></Label>
                <Select value={userData.investimento_dieta} onValueChange={(v) => u("investimento_dieta", v)}>
                  <SelectTrigger className={fc}><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent><SelectItem value="pouco">Pouco</SelectItem><SelectItem value="medio">Médio</SelectItem><SelectItem value="muito">Muito</SelectItem></SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-muted-foreground text-xs">Faixa salarial mensal (opcional)</Label>
                <Select value={userData.faixa_salarial} onValueChange={(v) => u("faixa_salarial", v)}>
                  <SelectTrigger className={fc}><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>{faixasSalariais.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <AdvanceButton label="CONSULTAR O ORÁCULO" />
          </motion.div>
        )}

        {/* QUIZ */}
        {step === "quiz" && (
          <motion.div key={`quiz-${currentQuestion}`} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }} className="max-w-lg w-full mt-10">
            <p className="text-muted-foreground text-xs uppercase tracking-widest mb-2 font-cinzel">
              Oráculo — Pergunta {currentQuestion + 1} de {quizQuestions.length}
            </p>
            <h2 className="font-cinzel text-xl md:text-2xl font-bold text-foreground mb-6">{quizQuestions[currentQuestion].question}</h2>
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
          <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }} className="text-center max-w-md mt-10">
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
          <motion.div key="ignite" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="text-center max-w-md mt-10">
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
