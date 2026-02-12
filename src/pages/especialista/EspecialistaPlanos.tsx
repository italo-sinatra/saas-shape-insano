import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Edit, Check } from "lucide-react";

const mockPlanos = [
  { aluno: "Marcus Vinícius", tipo: "Treino", status: "ativo", lastUpdate: "Há 2 dias", aiSuggestion: true },
  { aluno: "Julia Santos", tipo: "Dieta", status: "pendente", lastUpdate: "Há 5 dias", aiSuggestion: true },
  { aluno: "Fernanda Lima", tipo: "Treino", status: "ativo", lastUpdate: "Hoje", aiSuggestion: false },
  { aluno: "Gabriel Rocha", tipo: "Dieta", status: "revisão", lastUpdate: "Há 1 dia", aiSuggestion: true },
];

const statusStyle: Record<string, string> = {
  ativo: "bg-emerald-500/20 text-emerald-400",
  pendente: "bg-amber-500/20 text-amber-400",
  revisão: "bg-blue-500/20 text-blue-400",
};

const EspecialistaPlanos = () => (
  <div className="space-y-6">
    <div>
      <h1 className="font-cinzel text-2xl font-bold text-foreground">Editor de Planos</h1>
      <p className="text-sm text-muted-foreground">Gerencie treinos e dietas dos seus alunos</p>
    </div>

    <Tabs defaultValue="todos" className="space-y-4">
      <TabsList className="bg-secondary">
        <TabsTrigger value="todos">Todos</TabsTrigger>
        <TabsTrigger value="treino">Treinos</TabsTrigger>
        <TabsTrigger value="dieta">Dietas</TabsTrigger>
      </TabsList>

      <TabsContent value="todos" className="space-y-3">
        {mockPlanos.map((p, i) => (
          <Card key={i} className="bg-card border-border">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <p className="font-medium text-foreground">{p.aluno}</p>
                  <p className="text-xs text-muted-foreground">{p.tipo} · Atualizado {p.lastUpdate}</p>
                </div>
                {p.aiSuggestion && (
                  <Badge className="bg-accent/20 text-accent text-xs gap-1">
                    <Sparkles size={10} /> Sugestão IA
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyle[p.status]}`}>{p.status}</span>
                <Button variant="outline" size="sm" className="text-xs gap-1"><Edit size={12} /> Editar</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </TabsContent>

      <TabsContent value="treino" className="space-y-3">
        {mockPlanos.filter((p) => p.tipo === "Treino").map((p, i) => (
          <Card key={i} className="bg-card border-border">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">{p.aluno}</p>
                <p className="text-xs text-muted-foreground">{p.tipo} · {p.lastUpdate}</p>
              </div>
              <Button variant="outline" size="sm" className="text-xs gap-1"><Edit size={12} /> Editar</Button>
            </CardContent>
          </Card>
        ))}
      </TabsContent>

      <TabsContent value="dieta" className="space-y-3">
        {mockPlanos.filter((p) => p.tipo === "Dieta").map((p, i) => (
          <Card key={i} className="bg-card border-border">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">{p.aluno}</p>
                <p className="text-xs text-muted-foreground">{p.tipo} · {p.lastUpdate}</p>
              </div>
              <Button variant="outline" size="sm" className="text-xs gap-1"><Edit size={12} /> Editar</Button>
            </CardContent>
          </Card>
        ))}
      </TabsContent>
    </Tabs>
  </div>
);

export default EspecialistaPlanos;
