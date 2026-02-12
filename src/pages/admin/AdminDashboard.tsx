import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users, Flame, TrendingUp, TrendingDown, AlertTriangle,
  Crown, Shield, Swords, Activity,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";

const kpiData = [
  { label: "Usuários Ativos", value: "2,847", change: "+12%", up: true, icon: Users },
  { label: "Chama Acesa", value: "89%", change: "+3%", up: true, icon: Flame },
  { label: "Retenção 30d", value: "76%", change: "-2%", up: false, icon: TrendingUp },
  { label: "Alertas", value: "23", change: "+5", up: false, icon: AlertTriangle },
];

const engagementData = [
  { day: "Seg", ativos: 2100, treinos: 1800, batalhas: 900 },
  { day: "Ter", ativos: 2250, treinos: 1950, batalhas: 1050 },
  { day: "Qua", ativos: 2400, treinos: 2100, batalhas: 1200 },
  { day: "Qui", ativos: 2300, treinos: 2000, batalhas: 1100 },
  { day: "Sex", ativos: 2600, treinos: 2300, batalhas: 1400 },
  { day: "Sáb", ativos: 2800, treinos: 2500, batalhas: 1600 },
  { day: "Dom", ativos: 2100, treinos: 1700, batalhas: 800 },
];

const leagueDistribution = [
  { name: "Plebe", value: 1200, color: "hsl(0, 0%, 50%)" },
  { name: "Equites", value: 800, color: "hsl(210, 70%, 50%)" },
  { name: "Legionários", value: 520, color: "hsl(280, 60%, 50%)" },
  { name: "Pretorianos", value: 327, color: "hsl(43, 76%, 53%)" },
];

const recentAlerts = [
  { user: "Marcus V.", type: "inatividade", days: 5, league: "Equites", flame: 12 },
  { user: "Julia S.", type: "queda", days: 3, league: "Legionários", flame: 45 },
  { user: "Pedro A.", type: "inatividade", days: 7, league: "Plebe", flame: 0 },
  { user: "Ana C.", type: "queda", days: 2, league: "Pretorianos", flame: 78 },
  { user: "Lucas M.", type: "inatividade", days: 4, league: "Equites", flame: 8 },
];

const topUsers = [
  { name: "Spartacus_BR", xp: 18750, league: "Pretorianos", streak: 45 },
  { name: "CenturiãoFit", xp: 17200, league: "Pretorianos", streak: 38 },
  { name: "GladiadoraX", xp: 16800, league: "Pretorianos", streak: 42 },
  { name: "ImperadorZ", xp: 15900, league: "Legionários", streak: 30 },
  { name: "VelitePower", xp: 14500, league: "Legionários", streak: 28 },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-cinzel text-2xl font-bold text-foreground">Quartel General</h1>
        <p className="text-sm text-muted-foreground">Visão consolidada da plataforma INVICTUS</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.label} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <kpi.icon size={18} className="text-muted-foreground" />
                <span className={`text-xs font-medium flex items-center gap-1 ${kpi.up ? "text-emerald-400" : "text-destructive"}`}>
                  {kpi.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {kpi.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Engagement Chart */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Engajamento Semanal</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,16%)" />
                <XAxis dataKey="day" stroke="hsl(43,10%,55%)" fontSize={12} />
                <YAxis stroke="hsl(43,10%,55%)" fontSize={12} />
                <Tooltip
                  contentStyle={{ background: "hsl(0,0%,10%)", border: "1px solid hsl(0,0%,16%)", borderRadius: 8 }}
                  labelStyle={{ color: "hsl(43,30%,85%)" }}
                />
                <Area type="monotone" dataKey="ativos" stroke="hsl(43,76%,53%)" fill="hsl(43,76%,53%,0.15)" strokeWidth={2} />
                <Area type="monotone" dataKey="treinos" stroke="hsl(0,100%,27%)" fill="hsl(0,100%,27%,0.1)" strokeWidth={2} />
                <Area type="monotone" dataKey="batalhas" stroke="hsl(210,70%,50%)" fill="hsl(210,70%,50%,0.1)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gold" /> Ativos</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-crimson" /> Treinos</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: "hsl(210,70%,50%)" }} /> Batalhas</span>
            </div>
          </CardContent>
        </Card>

        {/* League Distribution */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Distribuição por Liga</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={leagueDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {leagueDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(0,0%,10%)", border: "1px solid hsl(0,0%,16%)", borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-2 w-full">
              {leagueDistribution.map((l) => (
                <div key={l.name} className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                  <span className="text-muted-foreground">{l.name}</span>
                  <span className="ml-auto font-medium text-foreground">{l.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Alerts */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <AlertTriangle size={16} className="text-destructive" />
              Alertas de Inatividade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAlerts.map((alert, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-md bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Users size={14} className="text-crimson" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{alert.user}</p>
                      <p className="text-xs text-muted-foreground">{alert.days} dias sem atividade</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">{alert.league}</Badge>
                    <div className="flex items-center gap-1 text-xs">
                      <Flame size={12} className={alert.flame > 50 ? "text-gold" : alert.flame > 0 ? "text-orange-400" : "text-muted-foreground"} />
                      <span className="text-muted-foreground">{alert.flame}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Users */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <Crown size={16} className="text-gold" />
              Top Guerreiros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topUsers.map((user, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-md bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-gold w-5 text-center">{i + 1}</span>
                    <div>
                      <p className="text-sm font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.xp.toLocaleString()} XP</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">{user.league}</Badge>
                    <div className="flex items-center gap-1 text-xs">
                      <Flame size={12} className="text-gold" />
                      <span className="text-muted-foreground">{user.streak}d</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
