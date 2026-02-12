import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Search, Flame, ChevronDown, ChevronUp, User, Dumbbell, Apple, Brain, Shield } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const mockAlunos = [
  {
    id: 1, name: "Marcus Vinícius", email: "marcus@email.com", league: "Pretorianos", xp: 17500, flame: 95, streak: 42, class: "Gladius", status: "ativo",
    cadastro: { telefone: "(11) 98765-4321", nascimento: "1995-03-15", genero: "Masculino" },
    fisico: { peso: "82kg", altura: "178cm", objetivo: "Ganhar massa", experiencia: "Avançado", frequencia: "6-7x", lesoes: "Nenhuma", esporte: "Musculação" },
    nutricional: { restricoes: ["Sem Lactose"], refeicoes: "5-6", suplementos: "Whey, Creatina, BCAA", hidratacao: "2-3L", alcool: "Nunca" },
    psicologico: { estresse: 2, sono_qualidade: "Bom", sono_horas: "7-8h", dificuldade: "Organização", desistencia: "Estagnação nos resultados" },
  },
  {
    id: 2, name: "Julia Santos", email: "julia@email.com", league: "Legionários", xp: 12300, flame: 45, streak: 12, class: "Centurio", status: "alerta",
    cadastro: { telefone: "(21) 99876-5432", nascimento: "1998-07-22", genero: "Feminino" },
    fisico: { peso: "65kg", altura: "165cm", objetivo: "Performance", experiencia: "Intermediário", frequencia: "4-5x", lesoes: "Tendinite no ombro direito", esporte: "CrossFit" },
    nutricional: { restricoes: ["Vegetariana", "Sem Glúten"], refeicoes: "3-4", suplementos: "Whey vegano", hidratacao: "1-2L", alcool: "Social" },
    psicologico: { estresse: 4, sono_qualidade: "Regular", sono_horas: "5-6h", dificuldade: "Tempo", desistencia: "Rotina muito pesada no trabalho" },
  },
  {
    id: 3, name: "Pedro Almeida", email: "pedro@email.com", league: "Plebe", xp: 2100, flame: 0, streak: 0, class: "Velite", status: "inativo",
    cadastro: { telefone: "(31) 97654-3210", nascimento: "2000-11-08", genero: "Masculino" },
    fisico: { peso: "72kg", altura: "175cm", objetivo: "Perder peso", experiencia: "Iniciante", frequencia: "2-3x", lesoes: "Hérnia de disco L4-L5", esporte: "Nenhum" },
    nutricional: { restricoes: [], refeicoes: "1-2", suplementos: "Nenhum", hidratacao: "Menos de 1L", alcool: "Frequente" },
    psicologico: { estresse: 5, sono_qualidade: "Ruim", sono_horas: "Menos de 5h", dificuldade: "Motivação", desistencia: "Não ver resultados rápidos" },
  },
];

const statusColor: Record<string, string> = {
  ativo: "bg-emerald-500/20 text-emerald-400",
  alerta: "bg-amber-500/20 text-amber-400",
  inativo: "bg-destructive/20 text-destructive",
};

const Section = ({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2 text-primary">
      <Icon size={16} />
      <h4 className="font-cinzel text-sm font-bold">{title}</h4>
    </div>
    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">{children}</div>
  </div>
);

const Field = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="text-foreground font-medium">{value}</p>
  </div>
);

const EspecialistaAlunos = () => {
  const [search, setSearch] = useState("");
  const filtered = mockAlunos.filter((a) => a.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-cinzel text-2xl font-bold text-foreground">Meus Alunos</h1>
        <p className="text-sm text-muted-foreground">Visualize o perfil completo de cada guerreiro</p>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Buscar aluno..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-card border-border" />
      </div>

      <div className="space-y-3">
        {filtered.map((aluno) => (
          <Card key={aluno.id} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <User size={18} className="text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{aluno.name}</p>
                    <p className="text-xs text-muted-foreground">{aluno.class} · {aluno.league} · XP {aluno.xp.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Flame size={14} className={aluno.flame > 50 ? "text-gold" : aluno.flame > 0 ? "text-orange-400" : "text-muted-foreground"} />
                    <span className="text-sm text-foreground">{aluno.flame}%</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[aluno.status]}`}>{aluno.status}</span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-xs">Ver Resumo</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-card border-border">
                      <DialogHeader>
                        <DialogTitle className="font-cinzel text-lg">
                          Resumo Completo — {aluno.name}
                        </DialogTitle>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline">{aluno.class}</Badge>
                          <Badge variant="outline">{aluno.league}</Badge>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[aluno.status]}`}>{aluno.status}</span>
                        </div>
                      </DialogHeader>
                      <div className="space-y-5 mt-4">
                        <Section icon={User} title="Dados Pessoais">
                          <Field label="Email" value={aluno.email} />
                          <Field label="Telefone" value={aluno.cadastro.telefone} />
                          <Field label="Nascimento" value={aluno.cadastro.nascimento} />
                          <Field label="Gênero" value={aluno.cadastro.genero} />
                        </Section>
                        <div className="border-t border-border" />
                        <Section icon={Dumbbell} title="Perfil Físico">
                          <Field label="Peso" value={aluno.fisico.peso} />
                          <Field label="Altura" value={aluno.fisico.altura} />
                          <Field label="Objetivo" value={aluno.fisico.objetivo} />
                          <Field label="Experiência" value={aluno.fisico.experiencia} />
                          <Field label="Frequência" value={aluno.fisico.frequencia} />
                          <Field label="Lesões" value={aluno.fisico.lesoes} />
                          <Field label="Esporte" value={aluno.fisico.esporte} />
                        </Section>
                        <div className="border-t border-border" />
                        <Section icon={Apple} title="Perfil Nutricional">
                          <Field label="Restrições" value={aluno.nutricional.restricoes.length > 0 ? aluno.nutricional.restricoes.join(", ") : "Nenhuma"} />
                          <Field label="Refeições/dia" value={aluno.nutricional.refeicoes} />
                          <Field label="Suplementos" value={aluno.nutricional.suplementos} />
                          <Field label="Hidratação" value={aluno.nutricional.hidratacao} />
                          <Field label="Álcool" value={aluno.nutricional.alcool} />
                        </Section>
                        <div className="border-t border-border" />
                        <Section icon={Brain} title="Perfil Psicológico">
                          <Field label="Estresse" value={`${aluno.psicologico.estresse}/5`} />
                          <Field label="Qualidade do sono" value={aluno.psicologico.sono_qualidade} />
                          <Field label="Horas de sono" value={aluno.psicologico.sono_horas} />
                          <Field label="Dificuldade" value={aluno.psicologico.dificuldade} />
                          <Field label="Risco de desistência" value={aluno.psicologico.desistencia} />
                        </Section>
                        <div className="border-t border-border" />
                        <Section icon={Shield} title="Gamificação">
                          <Field label="XP Total" value={aluno.xp.toLocaleString()} />
                          <Field label="Liga" value={aluno.league} />
                          <Field label="Classe" value={aluno.class} />
                          <Field label="Streak" value={`${aluno.streak} dias`} />
                          <Field label="Chama" value={`${aluno.flame}%`} />
                        </Section>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EspecialistaAlunos;
