import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { UserCog, Users, Star, MessageSquare, BarChart3 } from "lucide-react";

const specialists = [
  {
    id: 1,
    name: "Dr. Ana Costa",
    role: "Nutricionista",
    avatar: "🍎",
    users: 45,
    maxUsers: 60,
    rating: 4.8,
    responseTime: "2h",
    activePlans: 38,
    pendingReviews: 3,
    status: "online",
  },
  {
    id: 2,
    name: "Prof. Carlos Silva",
    role: "Preparador Físico",
    avatar: "💪",
    users: 52,
    maxUsers: 55,
    rating: 4.9,
    responseTime: "1h",
    activePlans: 48,
    pendingReviews: 7,
    status: "online",
  },
  {
    id: 3,
    name: "Dra. Maria Oliveira",
    role: "Psicóloga",
    avatar: "🧠",
    users: 38,
    maxUsers: 50,
    rating: 4.7,
    responseTime: "3h",
    activePlans: 30,
    pendingReviews: 2,
    status: "offline",
  },
  {
    id: 4,
    name: "Prof. Ricardo Pinto",
    role: "Preparador Físico",
    avatar: "🏋️",
    users: 41,
    maxUsers: 55,
    rating: 4.6,
    responseTime: "2h",
    activePlans: 35,
    pendingReviews: 5,
    status: "online",
  },
];

const AdminEspecialistas = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-cinzel text-2xl font-bold text-foreground">Especialistas</h1>
          <p className="text-sm text-muted-foreground">Gestão de profissionais e carga de trabalho</p>
        </div>
        <Button className="crimson-gradient text-foreground">+ Novo Especialista</Button>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total", value: specialists.length },
          { label: "Online", value: specialists.filter((s) => s.status === "online").length },
          { label: "Usuários Gerenciados", value: specialists.reduce((a, s) => a + s.users, 0) },
          { label: "Revisões Pendentes", value: specialists.reduce((a, s) => a + s.pendingReviews, 0) },
        ].map((s) => (
          <Card key={s.label} className="bg-card border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Specialist Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {specialists.map((spec) => (
          <Card key={spec.id} className="bg-card border-border">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-2xl">
                    {spec.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{spec.name}</p>
                    <p className="text-xs text-muted-foreground">{spec.role}</p>
                  </div>
                </div>
                <span className={`w-2.5 h-2.5 rounded-full ${spec.status === "online" ? "bg-emerald-400" : "bg-muted-foreground"}`} />
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

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-2 rounded-md bg-secondary/50">
                    <div className="flex items-center justify-center gap-1">
                      <Star size={12} className="text-gold" />
                      <span className="text-sm font-bold text-foreground">{spec.rating}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">Avaliação</p>
                  </div>
                  <div className="p-2 rounded-md bg-secondary/50">
                    <p className="text-sm font-bold text-foreground">{spec.responseTime}</p>
                    <p className="text-[10px] text-muted-foreground">Resposta</p>
                  </div>
                  <div className="p-2 rounded-md bg-secondary/50">
                    <p className="text-sm font-bold text-foreground">{spec.pendingReviews}</p>
                    <p className="text-[10px] text-muted-foreground">Pendentes</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1 text-xs gap-1">
                  <Users size={12} /> Usuários
                </Button>
                <Button variant="outline" size="sm" className="flex-1 text-xs gap-1">
                  <BarChart3 size={12} /> Métricas
                </Button>
                <Button variant="outline" size="sm" className="flex-1 text-xs gap-1">
                  <MessageSquare size={12} /> Mensagem
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminEspecialistas;
