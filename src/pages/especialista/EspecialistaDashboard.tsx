import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, AlertTriangle, ClipboardCheck, Flame } from "lucide-react";

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

const EspecialistaDashboard = () => (
  <div className="space-y-6">
    <div>
      <h1 className="font-cinzel text-2xl font-bold text-foreground">Dashboard do Especialista</h1>
      <p className="text-sm text-muted-foreground">Visão geral dos seus alunos e pendências</p>
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
