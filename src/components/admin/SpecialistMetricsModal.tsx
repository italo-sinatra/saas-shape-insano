import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Flag, Clock, Star, Users, TrendingUp, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from "recharts";

type FlagColor = "green" | "yellow" | "red" | "black";

interface SpecialistData {
  id: number;
  name: string;
  role: string;
  avatar: string;
  users: number;
  maxUsers: number;
  metrics: {
    avgFirstDelivery: number;
    avgFollowupDelivery: number;
    onTimeRate: number;
    satisfaction: number;
    retention: number;
    adherence: number;
    yellowFlags: number;
    isRedFlag: boolean;
    monthsInRed: number;
    flagHistory: { month: string; flag: FlagColor }[];
  };
}

const flagConfig: Record<FlagColor, { label: string; className: string }> = {
  green: { label: "Green", className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  yellow: { label: "Yellow", className: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  red: { label: "Red", className: "bg-destructive/20 text-destructive border-destructive/30" },
  black: { label: "Black", className: "bg-foreground/10 text-foreground border-foreground/20" },
};

const monthlyData = [
  { month: "Set", onTime: 88, satisfaction: 4.5 },
  { month: "Out", onTime: 91, satisfaction: 4.6 },
  { month: "Nov", onTime: 85, satisfaction: 4.4 },
  { month: "Dez", onTime: 90, satisfaction: 4.7 },
  { month: "Jan", onTime: 82, satisfaction: 4.3 },
  { month: "Fev", onTime: 78, satisfaction: 4.2 },
];

interface Props {
  specialist: SpecialistData;
  open: boolean;
  onClose: () => void;
}

const MetricCard = ({ label, value, sub, icon: Icon, alert }: { label: string; value: string; sub?: string; icon: any; alert?: boolean }) => (
  <div className={`p-3 rounded-lg border ${alert ? "border-destructive/30 bg-destructive/5" : "border-border bg-secondary/30"}`}>
    <div className="flex items-center gap-2 mb-1">
      <Icon size={14} className={alert ? "text-destructive" : "text-muted-foreground"} />
      <span className="text-[11px] text-muted-foreground">{label}</span>
    </div>
    <p className={`text-lg font-bold ${alert ? "text-destructive" : "text-foreground"}`}>{value}</p>
    {sub && <p className="text-[10px] text-muted-foreground">{sub}</p>}
  </div>
);

const SpecialistMetricsModal = ({ specialist, open, onClose }: Props) => {
  const m = specialist.metrics;
  const currentFlag = m.monthsInRed >= 1 ? "black" : m.isRedFlag ? "red" : m.yellowFlags > 0 ? "yellow" : "green";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xl">
              {specialist.avatar}
            </div>
            <div>
              <DialogTitle className="font-cinzel text-lg">{specialist.name}</DialogTitle>
              <p className="text-xs text-muted-foreground">{specialist.role}</p>
            </div>
            <Badge className={`ml-auto border ${flagConfig[currentFlag].className}`}>
              <Flag size={10} className="mr-1" /> {flagConfig[currentFlag].label} Flag
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-5 mt-4">
          {/* SLA Metrics */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <Clock size={14} /> SLAs de Entrega
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <MetricCard
                icon={Clock}
                label="1ª Análise (meta: 72h)"
                value={`${m.avgFirstDelivery}h`}
                sub={m.avgFirstDelivery > 72 ? "⚠ Acima da meta" : "✓ Dentro da meta"}
                alert={m.avgFirstDelivery > 72}
              />
              <MetricCard
                icon={Clock}
                label="Análises seguintes (meta: 24h)"
                value={`${m.avgFollowupDelivery}h`}
                sub={m.avgFollowupDelivery > 24 ? "⚠ Acima da meta" : "✓ Dentro da meta"}
                alert={m.avgFollowupDelivery > 24}
              />
            </div>
          </div>

          {/* Performance */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <TrendingUp size={14} /> Performance
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <MetricCard icon={TrendingUp} label="Entregas no prazo" value={`${m.onTimeRate}%`} alert={m.onTimeRate < 80} />
              <MetricCard icon={Star} label="Satisfação" value={`${m.satisfaction}`} alert={m.satisfaction < 4.0} />
              <MetricCard icon={Users} label="Retenção" value={`${m.retention}%`} alert={m.retention < 80} />
              <MetricCard icon={TrendingUp} label="Adesão média" value={`${m.adherence}%`} alert={m.adherence < 70} />
            </div>
          </div>

          {/* Chart */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">📊 Entregas no Prazo (últimos 6 meses)</h4>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Bar dataKey="onTime" name="No prazo %" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Flag Timeline */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <AlertTriangle size={14} /> Sistema de Flags
            </h4>
            <div className="p-3 rounded-lg bg-secondary/30 border border-border space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Yellow Flags acumuladas:</span>
                <span className="font-bold text-foreground">{m.yellowFlags}/3</span>
              </div>
              <Progress value={(m.yellowFlags / 3) * 100} className="h-2" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Red Flag ativa:</span>
                <span className={`font-bold ${m.isRedFlag ? "text-destructive" : "text-emerald-400"}`}>{m.isRedFlag ? "Sim" : "Não"}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Meses em Red:</span>
                <span className="font-bold text-foreground">{m.monthsInRed}</span>
              </div>
              <div className="pt-2 border-t border-border">
                <p className="text-[10px] text-muted-foreground mb-2">Histórico de flags (últimos 3 meses):</p>
                <div className="flex gap-2">
                  {m.flagHistory.map((h, i) => (
                    <div key={i} className={`flex-1 text-center p-2 rounded border ${flagConfig[h.flag].className}`}>
                      <p className="text-[10px] font-medium">{h.month}</p>
                      <Flag size={12} className="mx-auto mt-1" />
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground italic">
                Yellow: métrica abaixo do limite · 3 Yellow → Red · 1 mês Red sem melhoria → Black (fora do time)
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SpecialistMetricsModal;
