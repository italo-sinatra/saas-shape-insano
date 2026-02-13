import { ArrowLeft, Leaf, Clock, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const meals = [
  {
    time: "07:00",
    name: "Café da Manhã",
    items: ["3 ovos mexidos", "2 fatias pão integral", "1 banana", "Café preto"],
    macros: { cal: 450, prot: 28, carb: 52, fat: 14 },
  },
  {
    time: "10:00",
    name: "Lanche da Manhã",
    items: ["Whey protein 30g", "1 maçã", "10 castanhas"],
    macros: { cal: 280, prot: 26, carb: 22, fat: 12 },
  },
  {
    time: "12:30",
    name: "Almoço",
    items: ["200g frango grelhado", "150g arroz integral", "Brócolis refogado", "Salada verde"],
    macros: { cal: 580, prot: 48, carb: 55, fat: 12 },
  },
  {
    time: "15:30",
    name: "Pré-treino",
    items: ["1 batata doce média", "30g whey", "1 colher pasta de amendoim"],
    macros: { cal: 380, prot: 30, carb: 42, fat: 10 },
  },
  {
    time: "18:30",
    name: "Pós-treino",
    items: ["Shake: whey + banana + aveia + leite"],
    macros: { cal: 420, prot: 35, carb: 48, fat: 8 },
  },
  {
    time: "20:00",
    name: "Jantar",
    items: ["200g carne vermelha", "Purê de batata", "Legumes grelhados"],
    macros: { cal: 520, prot: 42, carb: 38, fat: 18 },
  },
];

const totalMacros = meals.reduce(
  (acc, m) => ({
    cal: acc.cal + m.macros.cal,
    prot: acc.prot + m.macros.prot,
    carb: acc.carb + m.macros.carb,
    fat: acc.fat + m.macros.fat,
  }),
  { cal: 0, prot: 0, carb: 0, fat: 0 }
);

const Dieta = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-4 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6 pt-2">
        <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-2">
          <Leaf size={20} className="text-green-400" />
          <span className="font-cinzel font-bold text-foreground">PLANO ALIMENTAR</span>
        </div>
      </div>

      {/* Macros totais */}
      <Card className="bg-card border-border mb-4">
        <CardContent className="p-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Macros do Dia</p>
          <div className="grid grid-cols-4 gap-3 text-center">
            {[
              { label: "Calorias", value: totalMacros.cal, unit: "kcal", color: "text-accent" },
              { label: "Proteína", value: totalMacros.prot, unit: "g", color: "text-primary" },
              { label: "Carbs", value: totalMacros.carb, unit: "g", color: "text-blue-400" },
              { label: "Gordura", value: totalMacros.fat, unit: "g", color: "text-amber-400" },
            ].map((m) => (
              <div key={m.label}>
                <p className={`font-cinzel text-lg font-bold ${m.color}`}>{m.value}</p>
                <p className="text-[10px] text-muted-foreground">{m.unit}</p>
                <p className="text-[10px] text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Refeições */}
      <div className="space-y-3">
        {meals.map((meal, i) => (
          <Card key={i} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{meal.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Flame size={12} className="text-accent" />
                  <span className="text-xs font-semibold text-accent">{meal.macros.cal} kcal</span>
                </div>
              </div>
              <h3 className="font-cinzel text-sm font-bold text-foreground mb-2">{meal.name}</h3>
              <ul className="space-y-1">
                {meal.items.map((item, j) => (
                  <li key={j} className="text-xs text-muted-foreground">• {item}</li>
                ))}
              </ul>
              <div className="flex gap-3 mt-3 text-[10px] text-muted-foreground">
                <span>P: {meal.macros.prot}g</span>
                <span>C: {meal.macros.carb}g</span>
                <span>G: {meal.macros.fat}g</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dieta;
