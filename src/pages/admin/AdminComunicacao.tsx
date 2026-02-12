import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send, Search, User, Clock } from "lucide-react";

const conversations = [
  { id: 1, user: "Marcus Vinícius", lastMsg: "Obrigado pelo ajuste no treino!", time: "10:30", unread: 0, specialist: "Prof. Carlos" },
  { id: 2, user: "Julia Santos", lastMsg: "Posso trocar a batata doce por inhame?", time: "09:15", unread: 2, specialist: "Dr. Ana Costa" },
  { id: 3, user: "Pedro Almeida", lastMsg: "Estou voltando, desculpa a ausência", time: "Ontem", unread: 1, specialist: "Dr. Ana Costa" },
  { id: 4, user: "Ana Carolina", lastMsg: "Senti dor no joelho ontem", time: "Ontem", unread: 3, specialist: "Prof. Carlos" },
  { id: 5, user: "Lucas Mendes", lastMsg: "Quando posso aumentar a carga?", time: "2 dias", unread: 0, specialist: "Dra. Maria" },
];

const chatMessages = [
  { from: "user", text: "Oi, posso trocar a batata doce por inhame no jantar?", time: "09:10" },
  { from: "specialist", text: "Olá Julia! Sim, pode trocar sem problemas. O inhame tem valores nutricionais muito similares. Só mantenha a porção de 150g.", time: "09:12" },
  { from: "user", text: "Perfeito! E posso adicionar azeite?", time: "09:14" },
  { from: "specialist", text: "Pode sim! 1 colher de sopa de azeite extra virgem. Vou atualizar o plano.", time: "09:15" },
];

const AdminComunicacao = () => {
  const [selectedConv, setSelectedConv] = useState(2);
  const [msg, setMsg] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-cinzel text-2xl font-bold text-foreground">Comunicação</h1>
        <p className="text-sm text-muted-foreground">Interação entre especialistas e usuários</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[600px]">
        {/* Conversation List */}
        <Card className="bg-card border-border overflow-hidden">
          <CardHeader className="pb-2 px-3 pt-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar conversa..." className="pl-9 h-8 text-xs bg-secondary border-border" />
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConv(conv.id)}
                className={`w-full text-left p-3 border-b border-border/50 hover:bg-secondary/30 transition-colors ${selectedConv === conv.id ? "bg-secondary/50" : ""}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <User size={14} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{conv.user}</p>
                      <p className="text-[10px] text-muted-foreground">{conv.specialist}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] text-muted-foreground">{conv.time}</span>
                    {conv.unread > 0 && (
                      <span className="w-4 h-4 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center font-bold">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1 truncate">{conv.lastMsg}</p>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2 bg-card border-border flex flex-col overflow-hidden">
          <CardHeader className="pb-2 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-medium">Julia Santos</CardTitle>
                <p className="text-xs text-muted-foreground">Centurio · Legionários · Dr. Ana Costa</p>
              </div>
              <Badge variant="outline" className="text-xs">Nutricional</Badge>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "specialist" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[70%] p-3 rounded-lg text-sm ${
                    m.from === "specialist"
                      ? "bg-primary/20 text-foreground"
                      : "bg-secondary text-foreground"
                  }`}
                >
                  <p>{m.text}</p>
                  <p className="text-[10px] text-muted-foreground mt-1 text-right">{m.time}</p>
                </div>
              </div>
            ))}
          </CardContent>

          <div className="p-3 border-t border-border">
            <div className="flex gap-2">
              <Input
                placeholder="Digite uma mensagem..."
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                className="bg-secondary border-border text-sm"
              />
              <Button size="icon" className="crimson-gradient shrink-0">
                <Send size={16} />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminComunicacao;
