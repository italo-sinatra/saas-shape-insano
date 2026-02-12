import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, Star } from "lucide-react";

const EspecialistaPerfil = () => (
  <div className="space-y-6 max-w-2xl">
    <div>
      <h1 className="font-cinzel text-2xl font-bold text-foreground">Meu Perfil</h1>
      <p className="text-sm text-muted-foreground">Seus dados como especialista da plataforma</p>
    </div>

    <Card className="bg-card border-border">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
            <User size={28} className="text-muted-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Dr. Ana Costa</h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline">Nutricionista</Badge>
              <div className="flex items-center gap-1">
                <Star size={12} className="text-gold fill-gold" />
                <span className="text-xs text-muted-foreground">4.9</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><Label className="text-muted-foreground text-xs">Nome</Label><Input className="bg-secondary border-border" defaultValue="Dr. Ana Costa" /></div>
            <div><Label className="text-muted-foreground text-xs">Email</Label><Input className="bg-secondary border-border" defaultValue="ana.costa@invictus.com" /></div>
            <div><Label className="text-muted-foreground text-xs">Especialidade</Label><Input className="bg-secondary border-border" defaultValue="Nutrição Esportiva" /></div>
            <div><Label className="text-muted-foreground text-xs">CRN</Label><Input className="bg-secondary border-border" defaultValue="CRN-3 12345" /></div>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">24</p>
              <p className="text-xs text-muted-foreground">Alunos ativos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">156</p>
              <p className="text-xs text-muted-foreground">Planos criados</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">4.9</p>
              <p className="text-xs text-muted-foreground">Avaliação</p>
            </div>
          </div>
          <Button className="w-full mt-4">Salvar Alterações</Button>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default EspecialistaPerfil;
