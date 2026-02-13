import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, AlertTriangle, ClipboardCheck, Flame, Clock, TrendingUp, Timer } from "lucide-react";

const alerts = [
  { name: "Pedro Almeida", issue: "Chama apagada há 7 dias", severity: "high" },
  { name: "Lucas Mendes", issue: "Chama crítica (8%)", severity: "medium" },
  { name: "Isabela Nunes", issue: "Adesão abaixo de 35%", severity: "medium" },
];

const pendingReviews = [
  { name: "Julia Santos", type: "Plano de treino", dueIn: "2 dias" },
  { name: "Fernanda Lima", type: "Dieta semanal", dueIn: "Hoje" },
  { name: "Gabriel Rocha", type: "Reavaliação mensal", dueIn: "3 dias" },
];

const pendingAnamneses = [
  { name: "Marcus Vinícius", type: "Acompanhamento", submittedAt: "2025-02-12T10:00:00", isFirst: false, hoursLeft: 18 },
  { name: "Julia Santos", type: "Primeira anamnese", submittedAt: "2025-02-11T14:00:00", isFirst: true, hoursLeft: 42 },
  { name: "Ana Carolina", type: "Acompanhamento", submittedAt: "2025-02-13T08:00:00", isFirst: false, hoursLeft: 22 },
];

const slaStats = { delivered: 18, total: 21, percentage: 86 };

const EspecialistaDashboard = () => (
  <div className="space-y-6">
    <div>
      <h1 className="font-cinzel text-2xl font-bold text-foreground">Dashboard do Especialista</h1>
      <p className="text-sm text-muted-foreground">Visão geral dos seus alunos, SLAs e pendências</p>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {[
        { label: "Meus Alunos", value: "24", icon: Users },
        { label: "Em Alerta", value: "3", icon: AlertTriangle },
        { label: "Revisões Pendentes", value: "5", icon: ClipboardCheck },
        { label: "Chama Média", value: "72%", icon: Flame },
      ].map((k) => (
        <Card key={k.label} className="bg-card border-border">
          <CardContent className="p-4">
            <k.icon size={16} className="text-muted-foreground mb-2" />
            <p className="text-2xl font-bold text-foreground">{k.value}</p>
            <p className="text-xs text-muted-foreground">{k.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>

    {/* SLA Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <TrendingUp size={14} /> Entregas no Prazo (este mês)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-3 mb-2">
            <p className="text-3xl font-bold text-foreground">{slaStats.percentage}%</p>
            <p className="text-sm text-muted-foreground mb-1">{slaStats.delivered}/{slaStats.total} entregas</p>
          </div>
          <Progress value={slaStats.percentage} className="h-2" />
          {slaStats.percentage < 80 && (
            <p className="text-xs text-destructive mt-2 flex items-center gap-1">
              <AlertTriangle size={12} /> Abaixo da meta de 80% — risco de Yellow Flag
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Timer size={14} /> Análises para Entregar
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {pendingAnamneses.map((a) => {
            const urgent = a.hoursLeft <= 6;
            const warning = a.hoursLeft <= 12;
            return (
              <div key={a.name} className={`flex items-center justify-between p-2.5 rounded-lg ${urgent ? "bg-destructive/10 border border-destructive/20" : "bg-secondary/30"}`}>
                <div>
                  <p className="text-sm font-medium text-foreground">{a.name}</p>
                  <p className="text-[10px] text-muted-foreground">{a.type} · SLA: {a.isFirst ? "72h" : "24h"}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={12} className={urgent ? "text-destructive" : warning ? "text-amber-400" : "text-muted-foreground"} />
                  <span className={`text-xs font-bold ${urgent ? "text-destructive" : warning ? "text-amber-400" : "text-foreground"}`}>
                    {a.hoursLeft}h restantes
                  </span>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="bg-card border-border">
        <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">⚠ Alertas</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {alerts.map((a) => (
            <div key={a.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
              <div>
                <p className="text-sm font-medium text-foreground">{a.name}</p>
                <p className="text-xs text-muted-foreground">{a.issue}</p>
              </div>
              <Badge variant={a.severity === "high" ? "destructive" : "outline"} className="text-xs">
                {a.severity === "high" ? "Crítico" : "Atenção"}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">📋 Revisões Pendentes</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {pendingReviews.map((r) => (
            <div key={r.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
              <div>
                <p className="text-sm font-medium text-foreground">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.type}</p>
              </div>
              <span className={`text-xs font-medium ${r.dueIn === "Hoje" ? "text-destructive" : "text-muted-foreground"}`}>{r.dueIn}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  </div>
);

export default EspecialistaDashboard;
