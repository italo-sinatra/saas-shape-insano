import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell,
} from "recharts";
import { TrendingUp, DollarSign, Users, Activity } from "lucide-react";

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
                    {acquisitionData.map((e, i) => (
                      <Cell key={i} fill={e.color} />
                    ))}
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
      </Tabs>
    </div>
  );
};

export default AdminRelatorios;
