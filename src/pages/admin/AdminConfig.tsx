import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Settings, Brain, Trophy, Flame, Shield } from "lucide-react";

const AdminConfig = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-cinzel text-2xl font-bold text-foreground">Configurações</h1>
        <p className="text-sm text-muted-foreground">Parâmetros globais da IA e do sistema de gamificação</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* AI Config */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Brain size={16} className="text-gold" /> Parâmetros da IA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Nível de autonomia da IA</Label>
              <Slider defaultValue={[70]} max={100} step={10} className="w-full" />
              <p className="text-[10px] text-muted-foreground">70% — IA gera planos base, especialistas revisam</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground">Auto-ajuste de planos</p>
                <p className="text-[10px] text-muted-foreground">IA ajusta automaticamente baseado em feedback</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground">Insights proativos</p>
                <p className="text-[10px] text-muted-foreground">IA envia sugestões para especialistas</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground">Alertas de risco</p>
                <p className="text-[10px] text-muted-foreground">Notifica quando usuário pode churnar</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Gamification Config */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Trophy size={16} className="text-gold" /> Gamificação
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-3">
              <Label className="text-xs text-muted-foreground">Faixas de XP por Liga</Label>
              {[
                { league: "Plebe", range: "0 - 5.000", color: "bg-muted-foreground" },
                { league: "Equites", range: "5.001 - 10.000", color: "bg-blue-400" },
                { league: "Legionários", range: "10.001 - 15.000", color: "bg-purple-400" },
                { league: "Pretorianos", range: "15.001+", color: "bg-gold" },
              ].map((l) => (
                <div key={l.league} className="flex items-center justify-between p-2 rounded-md bg-secondary/50">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${l.color}`} />
                    <span className="text-sm text-foreground">{l.league}</span>
                  </div>
                  <Input defaultValue={l.range} className="w-32 h-7 text-xs bg-background border-border text-right" />
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">XP por treino completo</Label>
              <Input defaultValue="150" className="bg-background border-border" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Bônus de promoção (Dracmas)</Label>
              <Input defaultValue="500" className="bg-background border-border" />
            </div>
          </CardContent>
        </Card>

        {/* Chama de Vesta */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Flame size={16} className="text-gold" /> Chama de Vesta
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Decaimento diário (%)</Label>
              <Slider defaultValue={[5]} max={20} step={1} className="w-full" />
              <p className="text-[10px] text-muted-foreground">5% por dia sem atividade</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground">Modo Desonra</p>
                <p className="text-[10px] text-muted-foreground">UI em escala de cinza quando chama apaga</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Dias para reacender</Label>
              <Input defaultValue="3" className="bg-background border-border" />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield size={16} className="text-gold" /> Segurança
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground">2FA para Especialistas</p>
                <p className="text-[10px] text-muted-foreground">Autenticação de dois fatores obrigatória</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground">Logs de Auditoria</p>
                <p className="text-[10px] text-muted-foreground">Registrar todas as ações no painel</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground">Backup automático</p>
                <p className="text-[10px] text-muted-foreground">Backup diário dos dados</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button className="crimson-gradient text-foreground">Salvar Configurações</Button>
      </div>
    </div>
  );
};

export default AdminConfig;
