import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, User } from "lucide-react";

const conversations = [
  { id: 1, name: "Marcus Vinícius", class: "Gladius", lastMessage: "Beleza, vou seguir o plano!", time: "10:32", unread: 0 },
  { id: 2, name: "Julia Santos", class: "Centurio", lastMessage: "Meu ombro está doendo de novo...", time: "09:15", unread: 2 },
  { id: 3, name: "Pedro Almeida", class: "Velite", lastMessage: "Vou tentar voltar essa semana", time: "Ontem", unread: 0 },
  { id: 4, name: "Gabriel Rocha", class: "Gladius", lastMessage: "Posso trocar o exercício B3?", time: "Ontem", unread: 1 },
];

const mockMessages = [
  { from: "aluno", text: "Meu ombro está doendo de novo depois do treino de ontem", time: "09:10" },
  { from: "aluno", text: "Acho que forcei demais no supino inclinado", time: "09:12" },
  { from: "especialista", text: "Entendi Julia. Vamos reduzir a carga do supino e substituir por crucifixo com cabos essa semana.", time: "09:20" },
  { from: "especialista", text: "Aplique gelo por 15min após o treino. Se persistir, vamos encaminhar.", time: "09:21" },
];

const EspecialistaChat = () => {
  const [selected, setSelected] = useState(2);
  const [msg, setMsg] = useState("");

  const selectedConv = conversations.find((c) => c.id === selected);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-cinzel text-2xl font-bold text-foreground">Chat com Alunos</h1>
        <p className="text-sm text-muted-foreground">Comunicação direta com seus guerreiros</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-200px)]">
        {/* Conversations list */}
        <Card className="bg-card border-border lg:col-span-1 overflow-hidden">
          <CardContent className="p-0">
            {conversations.map((c) => (
              <button key={c.id} onClick={() => setSelected(c.id)} className={`w-full text-left p-4 border-b border-border/50 hover:bg-secondary/30 transition-colors ${selected === c.id ? "bg-secondary/50" : ""}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center"><User size={16} className="text-muted-foreground" /></div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{c.name}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[160px]">{c.lastMessage}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{c.time}</p>
                    {c.unread > 0 && <span className="inline-block mt-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">{c.unread}</span>}
                  </div>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Chat area */}
        <Card className="bg-card border-border lg:col-span-2 flex flex-col overflow-hidden">
          <CardHeader className="pb-2 border-b border-border">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              {selectedConv?.name} <Badge variant="outline" className="text-xs">{selectedConv?.class}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
            {mockMessages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "especialista" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] p-3 rounded-xl text-sm ${m.from === "especialista" ? "bg-primary/20 text-foreground" : "bg-secondary text-foreground"}`}>
                  <p>{m.text}</p>
                  <p className="text-xs text-muted-foreground mt-1">{m.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
          <div className="p-3 border-t border-border flex gap-2">
            <Input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Digite sua mensagem..." className="bg-secondary border-border" />
            <Button size="icon" className="shrink-0"><Send size={16} /></Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EspecialistaChat;
