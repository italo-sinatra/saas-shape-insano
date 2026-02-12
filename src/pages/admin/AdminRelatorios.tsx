import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell,
} from "recharts";
import { TrendingUp, DollarSign, Users, Activity, Target } from "lucide-react";

const revenueData = [
  { month: "Set", receita: 45000, meta: 40000 },
  { month: "Out", receita: 52000, meta: 48000 },
  { month: "Nov", receita: 58000, meta: 55000 },
  { month: "Dez", receita: 61000, meta: 60000 },
  { month: "Jan", receita: 67000, meta: 65000 },
  { month: "Fev", receita: 72000, meta: 70000 },
];

const retentionData = [
  { month: "Set", retention: 82 },
  { month: "Out", retention: 79 },
  { month: "Nov", retention: 84 },
  { month: "Dez", retention: 81 },
  { month: "Jan", retention: 85 },
  { month: "Fev", retention: 87 },
];

const acquisitionData = [
  { source: "Orgânico", value: 40, color: "hsl(43,76%,53%)" },
  { source: "Indicação", value: 25, color: "hsl(0,100%,27%)" },
  { source: "Social", value: 20, color: "hsl(210,70%,50%)" },
  { source: "Pago", value: 15, color: "hsl(280,60%,50%)" },
];

const churnReasons = [
  { reason: "Falta de tempo", pct: 32 },
  { reason: "Preço", pct: 24 },
  { reason: "Lesão/Saúde", pct: 18 },
  { reason: "Falta de motivação", pct: 15 },
  { reason: "Outros", pct: 11 },
];

// Marketing data from anamnese
const objectiveData = [
  { name: "Ganhar massa", value: 38, color: "hsl(0,100%,27%)" },
  { name: "Perder peso", value: 28, color: "hsl(43,76%,53%)" },
  { name: "Performance", value: 20, color: "hsl(210,70%,50%)" },
  { name: "Saúde geral", value: 14, color: "hsl(140,60%,40%)" },
];

const ageData = [
  { faixa: "18-24", total: 420 },
  { faixa: "25-34", total: 980 },
  { faixa: "35-44", total: 760 },
  { faixa: "45-54", total: 410 },
  { faixa: "55+", total: 180 },
];

const experienceData = [
  { name: "Iniciante", value: 45, color: "hsl(43,76%,53%)" },
  { name: "Intermediário", value: 35, color: "hsl(210,70%,50%)" },
  { name: "Avançado", value: 20, color: "hsl(0,100%,27%)" },
];

const restricoesData = [
  { restricao: "Sem Lactose", pct: 24 },
  { restricao: "Sem Glúten", pct: 18 },
  { restricao: "Vegetariano", pct: 12 },
  { restricao: "Low Carb", pct: 10 },
  { restricao: "Vegano", pct: 6 },
  { restricao: "Sem restrição", pct: 30 },
];

const desistenciaData = [
  { motivo: "Falta de tempo", pct: 34 },
  { motivo: "Não ver resultados", pct: 26 },
  { motivo: "Rotina pesada", pct: 18 },
  { motivo: "Falta de motivação", pct: 14 },
  { motivo: "Problemas financeiros", pct: 8 },
];

const AdminRelatorios = () => {
  const tooltipStyle = {
    contentStyle: { background: "hsl(0,0%,10%)", border: "1px solid hsl(0,0%,16%)", borderRadius: 8 },
    labelStyle: { color: "hsl(43,30%,85%)" },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-cinzel text-2xl font-bold text-foreground">Relatórios & Análises</h1>
        <p className="text-sm text-muted-foreground">Performance do negócio e métricas da plataforma</p>
      </div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "MRR", value: "R$ 72.000", icon: DollarSign, change: "+7.5%" },
          { label: "LTV Médio", value: "R$ 1.240", icon: TrendingUp, change: "+12%" },
          { label: "CAC", value: "R$ 85", icon: Users, change: "-8%" },
          { label: "Churn Rate", value: "4.2%", icon: Activity, change: "-0.5%" },
        ].map((k) => (
          <Card key={k.label} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <k.icon size={16} className="text-muted-foreground" />
                <span className="text-xs text-emerald-400">{k.change}</span>
              </div>
              <p className="text-xl font-bold text-foreground">{k.value}</p>
              <p className="text-xs text-muted-foreground">{k.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="financeiro" className="space-y-4">
        <TabsList className="bg-secondary">
          <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
          <TabsTrigger value="retencao">Retenção</TabsTrigger>
          <TabsTrigger value="aquisicao">Aquisição</TabsTrigger>
          <TabsTrigger value="marketing">Marketing / Qualificação</TabsTrigger>
        </TabsList>

        <TabsContent value="financeiro">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Receita vs Meta (6 meses)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,16%)" />
                  <XAxis dataKey="month" stroke="hsl(43,10%,55%)" fontSize={12} />
                  <YAxis stroke="hsl(43,10%,55%)" fontSize={12} tickFormatter={(v) => `${v / 1000}k`} />
                  <Tooltip {...tooltipStyle} />
                  <Bar dataKey="receita" fill="hsl(43,76%,53%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="meta" fill="hsl(0,0%,25%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retencao" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Retenção Mensal (%)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={retentionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,16%)" />
                    <XAxis dataKey="month" stroke="hsl(43,10%,55%)" fontSize={12} />
                    <YAxis stroke="hsl(43,10%,55%)" fontSize={12} domain={[70, 100]} />
                    <Tooltip {...tooltipStyle} />
                    <Line type="monotone" dataKey="retention" stroke="hsl(43,76%,53%)" strokeWidth={2} dot={{ fill: "hsl(43,76%,53%)" }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Motivos de Churn</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {churnReasons.map((r) => (
                  <div key={r.reason} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{r.reason}</span>
                      <span className="text-foreground font-medium">{r.pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${r.pct}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="aquisicao">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Canais de Aquisição</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col lg:flex-row items-center gap-6">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={acquisitionData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value">
                    {acquisitionData.map((e, i) => (<Cell key={i} fill={e.color} />))}
                  </Pie>
                  <Tooltip {...tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3 w-full lg:w-auto">
                {acquisitionData.map((a) => (
                  <div key={a.source} className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full" style={{ background: a.color }} />
                    <span className="text-sm text-foreground">{a.source}</span>
                    <span className="ml-auto text-sm font-bold text-foreground">{a.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* NEW: Marketing / Qualificação tab */}
        <TabsContent value="marketing" className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "Leads Qualificados", value: "1,847", change: "+22%" },
              { label: "Objetivo #1", value: "Ganhar Massa", change: "38%" },
              { label: "Faixa Etária #1", value: "25-34 anos", change: "35%" },
              { label: "Iniciantes", value: "45%", change: "do total" },
            ].map((k) => (
              <Card key={k.label} className="bg-card border-border">
                <CardContent className="p-4">
                  <Target size={16} className="text-muted-foreground mb-2" />
                  <p className="text-lg font-bold text-foreground">{k.value}</p>
                  <p className="text-xs text-muted-foreground">{k.label}</p>
                  <span className="text-xs text-emerald-400">{k.change}</span>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Objectives pie */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Distribuição de Objetivos</CardTitle></CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={objectiveData} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={3} dataKey="value">
                      {objectiveData.map((e, i) => (<Cell key={i} fill={e.color} />))}
                    </Pie>
                    <Tooltip {...tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-3 justify-center">
                  {objectiveData.map((o) => (
                    <div key={o.name} className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: o.color }} />
                      <span className="text-xs text-foreground">{o.name} ({o.value}%)</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Age distribution */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Faixas Etárias</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={ageData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,16%)" />
                    <XAxis dataKey="faixa" stroke="hsl(43,10%,55%)" fontSize={12} />
                    <YAxis stroke="hsl(43,10%,55%)" fontSize={12} />
                    <Tooltip {...tooltipStyle} />
                    <Bar dataKey="total" fill="hsl(43,76%,53%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Experience level pie */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Nível de Experiência</CardTitle></CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={experienceData} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={3} dataKey="value">
                      {experienceData.map((e, i) => (<Cell key={i} fill={e.color} />))}
                    </Pie>
                    <Tooltip {...tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-3 justify-center">
                  {experienceData.map((o) => (
                    <div key={o.name} className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: o.color }} />
                      <span className="text-xs text-foreground">{o.name} ({o.value}%)</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Dietary restrictions */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Restrições Alimentares</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {restricoesData.map((r) => (
                  <div key={r.restricao} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{r.restricao}</span>
                      <span className="text-foreground font-medium">{r.pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full rounded-full bg-accent" style={{ width: `${r.pct}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Desistência risks */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Motivos de Desistência (da anamnese)</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={desistenciaData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,16%)" />
                  <XAxis type="number" stroke="hsl(43,10%,55%)" fontSize={12} tickFormatter={(v) => `${v}%`} />
                  <YAxis type="category" dataKey="motivo" stroke="hsl(43,10%,55%)" fontSize={11} width={140} />
                  <Tooltip {...tooltipStyle} />
                  <Bar dataKey="pct" fill="hsl(0,100%,27%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminRelatorios;
