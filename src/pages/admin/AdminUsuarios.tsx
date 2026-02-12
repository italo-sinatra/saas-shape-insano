import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Search, Filter, Flame, Shield, Eye, MessageSquare,
  ChevronDown, ChevronUp, Activity,
} from "lucide-react";

const mockUsers = [
  { id: 1, name: "Marcus Vinícius", email: "marcus@email.com", league: "Pretorianos", xp: 17500, flame: 95, streak: 42, class: "Gladius", specialist: "Dr. Ana Costa", status: "ativo", lastActive: "Hoje", adherence: 94 },
  { id: 2, name: "Julia Santos", email: "julia@email.com", league: "Legionários", xp: 12300, flame: 45, streak: 12, class: "Centurio", specialist: "Prof. Carlos", status: "alerta", lastActive: "3 dias", adherence: 67 },
  { id: 3, name: "Pedro Almeida", email: "pedro@email.com", league: "Plebe", xp: 2100, flame: 0, streak: 0, class: "Velite", specialist: "Dr. Ana Costa", status: "inativo", lastActive: "7 dias", adherence: 23 },
  { id: 4, name: "Ana Carolina", email: "ana@email.com", league: "Pretorianos", xp: 16800, flame: 78, streak: 30, class: "Gladius", specialist: "Prof. Carlos", status: "ativo", lastActive: "Hoje", adherence: 88 },
  { id: 5, name: "Lucas Mendes", email: "lucas@email.com", league: "Equites", xp: 8450, flame: 8, streak: 2, class: "Velite", specialist: "Dra. Maria", status: "alerta", lastActive: "4 dias", adherence: 45 },
  { id: 6, name: "Fernanda Lima", email: "fernanda@email.com", league: "Equites", xp: 7200, flame: 60, streak: 18, class: "Centurio", specialist: "Dra. Maria", status: "ativo", lastActive: "Hoje", adherence: 82 },
  { id: 7, name: "Gabriel Rocha", email: "gabriel@email.com", league: "Legionários", xp: 13500, flame: 88, streak: 25, class: "Gladius", specialist: "Dr. Ana Costa", status: "ativo", lastActive: "Ontem", adherence: 91 },
  { id: 8, name: "Isabela Nunes", email: "isabela@email.com", league: "Plebe", xp: 1800, flame: 15, streak: 3, class: "Velite", specialist: "Prof. Carlos", status: "alerta", lastActive: "5 dias", adherence: 34 },
];

const statusColor: Record<string, string> = {
  ativo: "bg-emerald-500/20 text-emerald-400",
  alerta: "bg-amber-500/20 text-amber-400",
  inativo: "bg-destructive/20 text-destructive",
};

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

      {/* Stats */}
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

      {/* Search */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>
        <Button variant="outline" size="icon"><Filter size={16} /></Button>
      </div>

      {/* Users Table */}
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
                    <td className="p-3 hidden md:table-cell">
                      <Badge variant="outline" className="text-xs">{user.league}</Badge>
                    </td>
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
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[user.status]}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MessageSquare size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setExpandedUser(expandedUser === user.id ? null : user.id)}
                        >
                          {expandedUser === user.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </Button>
                      </div>
                    </td>
                  </tr>
                  {expandedUser === user.id && (
                    <tr key={`detail-${user.id}`} className="bg-secondary/20">
                      <td colSpan={6} className="p-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                          <div>
                            <p className="text-muted-foreground">XP Total</p>
                            <p className="font-bold text-foreground text-lg">{user.xp.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Streak</p>
                            <p className="font-bold text-foreground text-lg">{user.streak} dias</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Especialista</p>
                            <p className="font-medium text-foreground">{user.specialist}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Última Atividade</p>
                            <p className="font-medium text-foreground">{user.lastActive}</p>
                          </div>
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
