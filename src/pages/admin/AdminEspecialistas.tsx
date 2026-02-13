import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { UserCog, Users, Star, MessageSquare, BarChart3, Flag, AlertTriangle, Clock, TrendingUp } from "lucide-react";
import SpecialistMetricsModal from "@/components/admin/SpecialistMetricsModal";

type FlagColor = "green" | "yellow" | "red" | "black";

interface SpecialistMetrics {
  avgFirstDelivery: number; // hours
  avgFollowupDelivery: number; // hours
  onTimeRate: number; // %
  satisfaction: number; // 0-5
  retention: number; // %
  adherence: number; // %
  yellowFlags: number;
  isRedFlag: boolean;
  monthsInRed: number;
  flagHistory: { month: string; flag: FlagColor }[];
}

const computeFlag = (m: SpecialistMetrics): FlagColor => {
  if (m.monthsInRed >= 1) return "black";
  if (m.isRedFlag) return "red";
  if (m.yellowFlags > 0) return "yellow";
  return "green";
};

const flagConfig: Record<FlagColor, { label: string; className: string }> = {
  green: { label: "Green", className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  yellow: { label: "Yellow", className: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  red: { label: "Red", className: "bg-destructive/20 text-destructive border-destructive/30" },
  black: { label: "Black", className: "bg-foreground/10 text-foreground border-foreground/20" },
};

const specialists = [
  {
    id: 1, name: "Dr. Ana Costa", role: "Nutricionista", avatar: "🍎",
    users: 45, maxUsers: 60, rating: 4.8, responseTime: "2h", activePlans: 38, pendingReviews: 3, status: "online",
    metrics: {
      avgFirstDelivery: 48, avgFollowupDelivery: 18, onTimeRate: 92, satisfaction: 4.8,
      retention: 94, adherence: 87, yellowFlags: 0, isRedFlag: false, monthsInRed: 0,
      flagHistory: [{ month: "Dez", flag: "green" as FlagColor }, { month: "Jan", flag: "green" as FlagColor }, { month: "Fev", flag: "green" as FlagColor }],
    },
  },
  {
    id: 2, name: "Prof. Carlos Silva", role: "Preparador Físico", avatar: "💪",
    users: 52, maxUsers: 55, rating: 4.9, responseTime: "1h", activePlans: 48, pendingReviews: 7, status: "online",
    metrics: {
      avgFirstDelivery: 36, avgFollowupDelivery: 12, onTimeRate: 97, satisfaction: 4.9,
      retention: 96, adherence: 91, yellowFlags: 0, isRedFlag: false, monthsInRed: 0,
      flagHistory: [{ month: "Dez", flag: "green" as FlagColor }, { month: "Jan", flag: "green" as FlagColor }, { month: "Fev", flag: "green" as FlagColor }],
    },
  },
  {
    id: 3, name: "Dra. Maria Oliveira", role: "Psicóloga", avatar: "🧠",
    users: 38, maxUsers: 50, rating: 4.7, responseTime: "3h", activePlans: 30, pendingReviews: 2, status: "offline",
    metrics: {
      avgFirstDelivery: 68, avgFollowupDelivery: 22, onTimeRate: 78, satisfaction: 4.2,
      retention: 85, adherence: 72, yellowFlags: 2, isRedFlag: false, monthsInRed: 0,
      flagHistory: [{ month: "Dez", flag: "green" as FlagColor }, { month: "Jan", flag: "yellow" as FlagColor }, { month: "Fev", flag: "yellow" as FlagColor }],
    },
  },
  {
    id: 4, name: "Prof. Ricardo Pinto", role: "Preparador Físico", avatar: "🏋️",
    users: 41, maxUsers: 55, rating: 4.6, responseTime: "2h", activePlans: 35, pendingReviews: 5, status: "online",
    metrics: {
      avgFirstDelivery: 74, avgFollowupDelivery: 28, onTimeRate: 65, satisfaction: 3.8,
      retention: 78, adherence: 68, yellowFlags: 3, isRedFlag: true, monthsInRed: 0,
      flagHistory: [{ month: "Dez", flag: "yellow" as FlagColor }, { month: "Jan", flag: "yellow" as FlagColor }, { month: "Fev", flag: "red" as FlagColor }],
    },
  },
];

const AdminEspecialistas = () => {
  const [metricsOpen, setMetricsOpen] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-cinzel text-2xl font-bold text-foreground">Especialistas</h1>
          <p className="text-sm text-muted-foreground">Gestão de profissionais, métricas e sistema de flags</p>
        </div>
        <Button className="crimson-gradient text-foreground">+ Novo Especialista</Button>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total", value: specialists.length, icon: Users },
          { label: "Online", value: specialists.filter((s) => s.status === "online").length, icon: TrendingUp },
          { label: "Yellow Flags", value: specialists.filter((s) => computeFlag(s.metrics) === "yellow").length, icon: Flag },
          { label: "Red/Black Flags", value: specialists.filter((s) => ["red", "black"].includes(computeFlag(s.metrics))).length, icon: AlertTriangle },
        ].map((s) => (
          <Card key={s.label} className="bg-card border-border">
            <CardContent className="p-4">
              <s.icon size={16} className="text-muted-foreground mb-2" />
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Specialist Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {specialists.map((spec) => {
          const flag = computeFlag(spec.metrics);
          const fc = flagConfig[flag];
          return (
            <Card key={spec.id} className="bg-card border-border">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-2xl">
                      {spec.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{spec.name}</p>
                      <p className="text-xs text-muted-foreground">{spec.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`text-[10px] border ${fc.className}`}>
                      <Flag size={10} className="mr-1" /> {fc.label}
                    </Badge>
                    <span className={`w-2.5 h-2.5 rounded-full ${spec.status === "online" ? "bg-emerald-400" : "bg-muted-foreground"}`} />
                  </div>
                </div>

                {/* Flag history */}
                <div className="flex items-center gap-1 mb-3">
                  <span className="text-[10px] text-muted-foreground mr-1">Histórico:</span>
                  {spec.metrics.flagHistory.map((h, i) => (
                    <span key={i} className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${flagConfig[h.flag].className}`}>
                      {h.month}
                    </span>
                  ))}
                  {spec.metrics.yellowFlags > 0 && (
                    <span className="text-[10px] text-amber-400 ml-auto">⚠ {spec.metrics.yellowFlags} yellow</span>
                  )}
                </div>

                {/* Workload */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Carga de trabalho</span>
                      <span className="text-foreground">{spec.users}/{spec.maxUsers}</span>
                    </div>
                    <Progress value={(spec.users / spec.maxUsers) * 100} className="h-2" />
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="p-2 rounded-md bg-secondary/50">
                      <div className="flex items-center justify-center gap-1">
                        <Star size={10} className="text-gold" />
                        <span className="text-xs font-bold text-foreground">{spec.metrics.satisfaction}</span>
                      </div>
                      <p className="text-[9px] text-muted-foreground">Satisfação</p>
                    </div>
                    <div className="p-2 rounded-md bg-secondary/50">
                      <span className="text-xs font-bold text-foreground">{spec.metrics.onTimeRate}%</span>
                      <p className="text-[9px] text-muted-foreground">No prazo</p>
                    </div>
                    <div className="p-2 rounded-md bg-secondary/50">
                      <span className="text-xs font-bold text-foreground">{spec.metrics.retention}%</span>
                      <p className="text-[9px] text-muted-foreground">Retenção</p>
                    </div>
                    <div className="p-2 rounded-md bg-secondary/50">
                      <div className="flex items-center justify-center gap-1">
                        <Clock size={10} className="text-muted-foreground" />
                        <span className="text-xs font-bold text-foreground">{spec.metrics.avgFollowupDelivery}h</span>
                      </div>
                      <p className="text-[9px] text-muted-foreground">Entrega</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1 text-xs gap-1">
                    <Users size={12} /> Usuários
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-xs gap-1" onClick={() => setMetricsOpen(spec.id)}>
                    <BarChart3 size={12} /> Métricas
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-xs gap-1">
                    <MessageSquare size={12} /> Mensagem
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {metricsOpen && (
        <SpecialistMetricsModal
          specialist={specialists.find((s) => s.id === metricsOpen)!}
          open={!!metricsOpen}
          onClose={() => setMetricsOpen(null)}
        />
      )}
    </div>
  );
};

export default AdminEspecialistas;
