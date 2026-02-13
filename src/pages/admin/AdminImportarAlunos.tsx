import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Upload, UserPlus, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";

const specialists = [
  { id: "1", name: "Dr. Ana Costa" },
  { id: "2", name: "Prof. Carlos Silva" },
  { id: "3", name: "Dra. Maria Oliveira" },
  { id: "4", name: "Prof. Ricardo Pinto" },
];

const emptyForm = {
  nome: "", email: "", telefone: "", nascimento: "", genero: "",
  peso: "", altura: "", objetivo: "", experiencia: "", frequencia: "",
  localTreino: "", lesoes: "", restricoes: "", suplementos: "", hidratacao: "",
  estresse: "", sonoHoras: "", especialista: "", skipOnboarding: true,
};

const AdminImportarAlunos = () => {
  const [form, setForm] = useState(emptyForm);
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const set = (key: string, val: string | boolean) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmitIndividual = () => {
    if (!form.nome || !form.email) {
      toast.error("Nome e email são obrigatórios");
      return;
    }
    toast.success(`Aluno ${form.nome} importado com sucesso! (MVP - mockado)`);
    setForm(emptyForm);
  };

  const handleCsvUpload = () => {
    if (!csvFile) { toast.error("Selecione um arquivo CSV"); return; }
    toast.success(`Arquivo "${csvFile.name}" processado! 0 alunos importados (MVP - mockado)`);
    setCsvFile(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-cinzel text-2xl font-bold text-foreground">Importar Alunos</h1>
        <p className="text-sm text-muted-foreground">Traga alunos existentes da sua base atual para a plataforma</p>
      </div>

      <Tabs defaultValue="individual" className="w-full">
        <TabsList className="bg-secondary">
          <TabsTrigger value="individual" className="gap-2"><UserPlus size={14} /> Individual</TabsTrigger>
          <TabsTrigger value="csv" className="gap-2"><FileSpreadsheet size={14} /> CSV/Planilha</TabsTrigger>
        </TabsList>

        <TabsContent value="individual">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm">Cadastro Individual Completo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Dados Pessoais */}
              <div>
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Dados Pessoais</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Nome completo *</Label>
                    <Input value={form.nome} onChange={(e) => set("nome", e.target.value)} placeholder="Ex: Marcus Vinícius" className="bg-background border-border" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Email *</Label>
                    <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="email@exemplo.com" className="bg-background border-border" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Telefone</Label>
                    <Input value={form.telefone} onChange={(e) => set("telefone", e.target.value)} placeholder="(00) 00000-0000" className="bg-background border-border" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Nascimento</Label>
                    <Input type="date" value={form.nascimento} onChange={(e) => set("nascimento", e.target.value)} className="bg-background border-border" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Gênero</Label>
                    <Select value={form.genero} onValueChange={(v) => set("genero", v)}>
                      <SelectTrigger className="bg-background border-border"><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="masculino">Masculino</SelectItem>
                        <SelectItem value="feminino">Feminino</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Perfil Físico */}
              <div>
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Perfil Físico</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Peso (kg)</Label>
                    <Input value={form.peso} onChange={(e) => set("peso", e.target.value)} placeholder="82" className="bg-background border-border" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Altura (cm)</Label>
                    <Input value={form.altura} onChange={(e) => set("altura", e.target.value)} placeholder="178" className="bg-background border-border" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Objetivo</Label>
                    <Select value={form.objetivo} onValueChange={(v) => set("objetivo", v)}>
                      <SelectTrigger className="bg-background border-border"><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ganhar_massa">Ganhar massa</SelectItem>
                        <SelectItem value="perder_peso">Perder peso</SelectItem>
                        <SelectItem value="performance">Performance</SelectItem>
                        <SelectItem value="saude">Saúde geral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Experiência</Label>
                    <Select value={form.experiencia} onValueChange={(v) => set("experiencia", v)}>
                      <SelectTrigger className="bg-background border-border"><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="iniciante">Iniciante</SelectItem>
                        <SelectItem value="intermediario">Intermediário</SelectItem>
                        <SelectItem value="avancado">Avançado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Frequência</Label>
                    <Select value={form.frequencia} onValueChange={(v) => set("frequencia", v)}>
                      <SelectTrigger className="bg-background border-border"><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2x">1-2x/semana</SelectItem>
                        <SelectItem value="3-4x">3-4x/semana</SelectItem>
                        <SelectItem value="5-6x">5-6x/semana</SelectItem>
                        <SelectItem value="7x">Todos os dias</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Local de treino</Label>
                    <Input value={form.localTreino} onChange={(e) => set("localTreino", e.target.value)} placeholder="Academia XYZ" className="bg-background border-border" />
                  </div>
                </div>
                <div className="mt-3 space-y-1.5">
                  <Label className="text-xs">Lesões / Limitações</Label>
                  <Textarea value={form.lesoes} onChange={(e) => set("lesoes", e.target.value)} placeholder="Descreva lesões ou limitações..." className="bg-background border-border min-h-[60px]" />
                </div>
              </div>

              {/* Nutricional */}
              <div>
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Perfil Nutricional</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Restrições alimentares</Label>
                    <Input value={form.restricoes} onChange={(e) => set("restricoes", e.target.value)} placeholder="Vegetariano, Sem lactose, etc." className="bg-background border-border" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Suplementos</Label>
                    <Input value={form.suplementos} onChange={(e) => set("suplementos", e.target.value)} placeholder="Whey, Creatina, etc." className="bg-background border-border" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Hidratação diária</Label>
                    <Select value={form.hidratacao} onValueChange={(v) => set("hidratacao", v)}>
                      <SelectTrigger className="bg-background border-border"><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="menos1l">Menos de 1L</SelectItem>
                        <SelectItem value="1-2l">1-2L</SelectItem>
                        <SelectItem value="2-3l">2-3L</SelectItem>
                        <SelectItem value="mais3l">Mais de 3L</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Atribuição */}
              <div>
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Atribuição</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Especialista</Label>
                    <Select value={form.especialista} onValueChange={(v) => set("especialista", v)}>
                      <SelectTrigger className="bg-background border-border"><SelectValue placeholder="Atribuir especialista" /></SelectTrigger>
                      <SelectContent>
                        {specialists.map((s) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-3 pt-5">
                    <Switch checked={form.skipOnboarding} onCheckedChange={(v) => set("skipOnboarding", v)} />
                    <Label className="text-xs">Pular onboarding (aluno já tem dados completos)</Label>
                  </div>
                </div>
              </div>

              <Button onClick={handleSubmitIndividual} className="w-full crimson-gradient text-foreground">
                <UserPlus size={16} className="mr-2" /> Importar Aluno
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="csv">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm">Importação via Planilha</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload size={32} className="mx-auto text-muted-foreground mb-3" />
                <p className="text-sm text-foreground mb-1">Arraste um arquivo CSV ou clique para selecionar</p>
                <p className="text-xs text-muted-foreground mb-4">Formato: nome, email, telefone, nascimento, peso, altura, objetivo, experiência, frequência</p>
                <Input
                  type="file"
                  accept=".csv,.xlsx"
                  onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
                  className="max-w-xs mx-auto bg-background border-border"
                />
              </div>
              {csvFile && (
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet size={16} className="text-primary" />
                    <span className="text-sm text-foreground">{csvFile.name}</span>
                  </div>
                  <Button onClick={handleCsvUpload} size="sm">Processar</Button>
                </div>
              )}
              <div className="p-3 rounded-lg bg-secondary/20 border border-border">
                <p className="text-xs text-muted-foreground">
                  💡 <strong>Dica:</strong> Todos os alunos importados via CSV entrarão com onboarding completo e poderão ser atribuídos a um especialista após a importação.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminImportarAlunos;
