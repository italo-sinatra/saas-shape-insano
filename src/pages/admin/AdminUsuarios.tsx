import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Search, Filter, Flame, Eye, MessageSquare,
  ChevronDown, ChevronUp, User, Dumbbell, Apple, Brain, Shield,
} from "lucide-react";

const mockUsers = [
  {
    id: 1, name: "Marcus Vinícius", email: "marcus@email.com", league: "Pretorianos", xp: 17500, flame: 95, streak: 42, class: "Gladius", specialist: "Dr. Ana Costa", status: "ativo", lastActive: "Hoje", adherence: 94,
    cadastro: { telefone: "(11) 98765-4321", nascimento: "1995-03-15", genero: "Masculino" },
    fisico: { peso: "82kg", altura: "178cm", objetivo: "Ganhar massa", experiencia: "Avançado", frequencia: "6-7x", lesoes: "Nenhuma", esporte: "Musculação" },
    nutricional: { restricoes: ["Sem Lactose"], refeicoes: "5-6", suplementos: "Whey, Creatina", hidratacao: "2-3L", alcool: "Nunca" },
    psicologico: { estresse: 2, sono_qualidade: "Bom", sono_horas: "7-8h", dificuldade: "Organização", desistencia: "Estagnação" },
  },
  {
    id: 2, name: "Julia Santos", email: "julia@email.com", league: "Legionários", xp: 12300, flame: 45, streak: 12, class: "Centurio", specialist: "Prof. Carlos", status: "alerta", lastActive: "3 dias", adherence: 67,
    cadastro: { telefone: "(21) 99876-5432", nascimento: "1998-07-22", genero: "Feminino" },
    fisico: { peso: "65kg", altura: "165cm", objetivo: "Performance", experiencia: "Intermediário", frequencia: "4-5x", lesoes: "Tendinite ombro", esporte: "CrossFit" },
    nutricional: { restricoes: ["Vegetariana", "Sem Glúten"], refeicoes: "3-4", suplementos: "Whey vegano", hidratacao: "1-2L", alcool: "Social" },
    psicologico: { estresse: 4, sono_qualidade: "Regular", sono_horas: "5-6h", dificuldade: "Tempo", desistencia: "Rotina pesada" },
  },
  {
    id: 3, name: "Pedro Almeida", email: "pedro@email.com", league: "Plebe", xp: 2100, flame: 0, streak: 0, class: "Velite", specialist: "Dr. Ana Costa", status: "inativo", lastActive: "7 dias", adherence: 23,
    cadastro: { telefone: "(31) 97654-3210", nascimento: "2000-11-08", genero: "Masculino" },
    fisico: { peso: "72kg", altura: "175cm", objetivo: "Perder peso", experiencia: "Iniciante", frequencia: "2-3x", lesoes: "Hérnia L4-L5", esporte: "Nenhum" },
    nutricional: { restricoes: [], refeicoes: "1-2", suplementos: "Nenhum", hidratacao: "Menos de 1L", alcool: "Frequente" },
    psicologico: { estresse: 5, sono_qualidade: "Ruim", sono_horas: "Menos de 5h", dificuldade: "Motivação", desistencia: "Sem resultados rápidos" },
  },
  {
    id: 4, name: "Ana Carolina", email: "ana@email.com", league: "Pretorianos", xp: 16800, flame: 78, streak: 30, class: "Gladius", specialist: "Prof. Carlos", status: "ativo", lastActive: "Hoje", adherence: 88,
    cadastro: { telefone: "(11) 91234-5678", nascimento: "1993-05-10", genero: "Feminino" },
    fisico: { peso: "58kg", altura: "162cm", objetivo: "Ganhar massa", experiencia: "Avançado", frequencia: "4-5x", lesoes: "Nenhuma", esporte: "Pilates" },
    nutricional: { restricoes: ["Low Carb"], refeicoes: "5-6", suplementos: "Whey, Creatina", hidratacao: "2-3L", alcool: "Social" },
    psicologico: { estresse: 2, sono_qualidade: "Ótimo", sono_horas: "7-8h", dificuldade: "Organização", desistencia: "Desmotivação" },
  },
  {
    id: 5, name: "Lucas Mendes", email: "lucas@email.com", league: "Equites", xp: 8450, flame: 8, streak: 2, class: "Velite", specialist: "Dra. Maria", status: "alerta", lastActive: "4 dias", adherence: 45,
    cadastro: { telefone: "(11) 98888-7777", nascimento: "1997-09-14", genero: "Masculino" },
    fisico: { peso: "78kg", altura: "180cm", objetivo: "Performance", experiencia: "Intermediário", frequencia: "4-5x", lesoes: "Entorse tornozelo", esporte: "Futebol" },
    nutricional: { restricoes: [], refeicoes: "3-4", suplementos: "BCAA", hidratacao: "1-2L", alcool: "Social" },
    psicologico: { estresse: 3, sono_qualidade: "Regular", sono_horas: "5-6h", dificuldade: "Tempo", desistencia: "Agenda cheia" },
  },
];

const statusColor: Record<string, string> = {
  ativo: "bg-emerald-500/20 text-emerald-400",
  alerta: "bg-amber-500/20 text-amber-400",
  inativo: "bg-destructive/20 text-destructive",
};

const SectionBlock = ({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2 text-primary">
      <Icon size={16} />
      <h4 className="font-cinzel text-sm font-bold">{title}</h4>
    </div>
    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">{children}</div>
  </div>
);

const Field = ({ label, value }: { label: string; value: string }) => (
  <div><p className="text-xs text-muted-foreground">{label}</p><p className="text-foreground font-medium">{value}</p></div>
);

const AdminUsuarios = () => {
  const [search, setSearch] = useState("");
  const [expandedUser, setExpandedUser] = useState<number | null>(null);

  const filtered = mockUsers.filter(
    (u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-cinzel text-2xl font-bold text-foreground">Gestão de Usuários</h1>
        <p className="text-sm text-muted-foreground">Visão consolidada de todos os guerreiros da plataforma</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total", value: "2,847" },
          { label: "Ativos", value: "2,534" },
          { label: "Em Alerta", value: "190" },
          { label: "Inativos", value: "123" },
        ].map((s) => (
          <Card key={s.label} className="bg-card border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar por nome ou email..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-card border-border" />
        </div>
        <Button variant="outline" size="icon"><Filter size={16} /></Button>
      </div>

      <Card className="bg-card border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 text-muted-foreground font-medium">Usuário</th>
                <th className="text-left p-3 text-muted-foreground font-medium hidden md:table-cell">Liga</th>
                <th className="text-left p-3 text-muted-foreground font-medium hidden lg:table-cell">Chama</th>
                <th className="text-left p-3 text-muted-foreground font-medium hidden lg:table-cell">Adesão</th>
                <th className="text-left p-3 text-muted-foreground font-medium">Status</th>
                <th className="text-left p-3 text-muted-foreground font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <>
                  <tr key={user.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="p-3">
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.class} · {user.email}</p>
                      </div>
                    </td>
                    <td className="p-3 hidden md:table-cell"><Badge variant="outline" className="text-xs">{user.league}</Badge></td>
                    <td className="p-3 hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        <Flame size={14} className={user.flame > 50 ? "text-gold" : user.flame > 0 ? "text-orange-400" : "text-muted-foreground"} />
                        <span className="text-foreground">{user.flame}%</span>
                      </div>
                    </td>
                    <td className="p-3 hidden lg:table-cell">
                      <div className="flex items-center gap-2 min-w-[100px]">
                        <Progress value={user.adherence} className="h-2 flex-1" />
                        <span className="text-xs text-muted-foreground">{user.adherence}%</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[user.status]}`}>{user.status}</span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8"><Eye size={14} /></Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-card border-border">
                            <DialogHeader>
                              <DialogTitle className="font-cinzel text-lg">Resumo Completo — {user.name}</DialogTitle>
                              <div className="flex gap-2 mt-1">
                                <Badge variant="outline">{user.class}</Badge>
                                <Badge variant="outline">{user.league}</Badge>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[user.status]}`}>{user.status}</span>
                              </div>
                            </DialogHeader>
                            <div className="space-y-5 mt-4">
                              <SectionBlock icon={User} title="Dados Pessoais">
                                <Field label="Email" value={user.email} />
                                <Field label="Telefone" value={user.cadastro.telefone} />
                                <Field label="Nascimento" value={user.cadastro.nascimento} />
                                <Field label="Gênero" value={user.cadastro.genero} />
                                <Field label="Especialista" value={user.specialist} />
                              </SectionBlock>
                              <div className="border-t border-border" />
                              <SectionBlock icon={Dumbbell} title="Perfil Físico">
                                <Field label="Peso" value={user.fisico.peso} />
                                <Field label="Altura" value={user.fisico.altura} />
                                <Field label="Objetivo" value={user.fisico.objetivo} />
                                <Field label="Experiência" value={user.fisico.experiencia} />
                                <Field label="Frequência" value={user.fisico.frequencia} />
                                <Field label="Lesões" value={user.fisico.lesoes} />
                                <Field label="Esporte" value={user.fisico.esporte} />
                              </SectionBlock>
                              <div className="border-t border-border" />
                              <SectionBlock icon={Apple} title="Perfil Nutricional">
                                <Field label="Restrições" value={user.nutricional.restricoes.length > 0 ? user.nutricional.restricoes.join(", ") : "Nenhuma"} />
                                <Field label="Refeições/dia" value={user.nutricional.refeicoes} />
                                <Field label="Suplementos" value={user.nutricional.suplementos} />
                                <Field label="Hidratação" value={user.nutricional.hidratacao} />
                                <Field label="Álcool" value={user.nutricional.alcool} />
                              </SectionBlock>
                              <div className="border-t border-border" />
                              <SectionBlock icon={Brain} title="Perfil Psicológico">
                                <Field label="Estresse" value={`${user.psicologico.estresse}/5`} />
                                <Field label="Qualidade do sono" value={user.psicologico.sono_qualidade} />
                                <Field label="Horas de sono" value={user.psicologico.sono_horas} />
                                <Field label="Dificuldade" value={user.psicologico.dificuldade} />
                                <Field label="Risco desistência" value={user.psicologico.desistencia} />
                              </SectionBlock>
                              <div className="border-t border-border" />
                              <SectionBlock icon={Shield} title="Gamificação">
                                <Field label="XP Total" value={user.xp.toLocaleString()} />
                                <Field label="Liga" value={user.league} />
                                <Field label="Classe" value={user.class} />
                                <Field label="Streak" value={`${user.streak} dias`} />
                                <Field label="Chama" value={`${user.flame}%`} />
                                <Field label="Adesão" value={`${user.adherence}%`} />
                              </SectionBlock>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><MessageSquare size={14} /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setExpandedUser(expandedUser === user.id ? null : user.id)}>
                          {expandedUser === user.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </Button>
                      </div>
                    </td>
                  </tr>
                  {expandedUser === user.id && (
                    <tr key={`detail-${user.id}`} className="bg-secondary/20">
                      <td colSpan={6} className="p-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                          <div><p className="text-muted-foreground">XP Total</p><p className="font-bold text-foreground text-lg">{user.xp.toLocaleString()}</p></div>
                          <div><p className="text-muted-foreground">Streak</p><p className="font-bold text-foreground text-lg">{user.streak} dias</p></div>
                          <div><p className="text-muted-foreground">Especialista</p><p className="font-medium text-foreground">{user.specialist}</p></div>
                          <div><p className="text-muted-foreground">Última Atividade</p><p className="font-medium text-foreground">{user.lastActive}</p></div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminUsuarios;
