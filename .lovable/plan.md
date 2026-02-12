

# Dashboard do Aluno - Melhorias Visuais e Funcionais

## Resumo

Quatro melhorias no dashboard do aluno: icones corretos na navegacao, insights de IA vinculados aos mentores (Mars, Ceres, Seneca), versao "Modo Desonra" do dashboard quando a chama esta apagada, e frases estoicas que rotacionam automaticamente.

---

## 1. Icones da Navegacao (BottomNav)

- **Arena** (rota `/`): trocar `LayoutDashboard` por `Dumbbell` (haltere, referencia a academia/treino)
- **Coliseu** (rota `/coliseu`): trocar `Trophy` por `Landmark` (icone do Lucide que representa um edificio classico com colunas, estilo coliseu romano)
- **Mentores** permanece com `Swords`, **Perfil** permanece com `User`

## 2. Insights de IA por Mentor

Substituir o card generico "Insight da IA" por um sistema que mostra insights vinculados aos 3 mentores, cada um com sua cor e identidade:

- **Mars** (treino): icone `Sword`, cores vermelhas (`text-red-400`, `bg-red-900/30`, borda vermelha)
- **Ceres** (nutricao): icone `Leaf`, cores verdes (`text-green-400`, `bg-green-900/30`, borda verde)
- **Seneca** (mental): icone `Building2`, cores ambar (`text-amber-400`, `bg-amber-900/30`, borda ambar)

Array de insights mockados com campo `mentor` para identificar qual agente fala. O insight exibido rotaciona automaticamente ou e selecionado aleatoriamente a cada render. Cada card mostra o nome do mentor, seu icone e usa as cores correspondentes.

## 3. Frases Estoicas com Rotacao Automatica

Ao inves de selecionar uma frase aleatoria so no carregamento da pagina, implementar um `useEffect` com `setInterval` que troca a frase a cada 30 segundos com animacao de fade (usando `AnimatePresence` do framer-motion). Expandir a lista de citacoes para mais variedade.

## 4. Dashboard "Chama Apagada" (Modo Desonra Visual)

Adicionar uma prop ou estado que simula a chama apagada (ex: `streak = 0` ou `chamaAtiva = false`). Quando a chama estiver apagada:

- O componente `ChamaDeVesta` mostra a chama cinza/apagada (cor muted em vez de gold/accent)
- O card de XP e stats usam cores dessaturadas
- Um banner de alerta aparece no topo: "Tua chama se apagou. Treina hoje para reacende-la." com visual vermelho/crimson
- O botao "INICIAR BATALHA" pulsa com mais intensidade (urgencia)
- O fundo geral ganha uma leve overlay escura

Isso nao e o "Modo Desonra" completo (grayscale total), mas uma versao intermediaria que alerta visualmente o usuario antes de chegar ao grayscale.

---

## Detalhes Tecnicos

### Arquivos modificados:
- `src/components/BottomNav.tsx` — trocar icones
- `src/pages/Dashboard.tsx` — insights por mentor, frases rotativas, estado chama apagada
- `src/components/ChamaDeVesta.tsx` — suporte visual para chama apagada (prop `isActive`)

### Dependencias: nenhuma nova, usa apenas `lucide-react`, `framer-motion` e `react` ja instalados.

### Estrutura do insight por mentor:
```text
aiInsights = [
  { mentor: "mars", text: "...", icon: Sword, colors: red },
  { mentor: "ceres", text: "...", icon: Leaf, colors: green },
  { mentor: "seneca", text: "...", icon: Building2, colors: amber },
]
```

### Logica da chama apagada:
```text
const chamaAtiva = streak > 0;

Se !chamaAtiva:
  - ChamaDeVesta recebe isActive=false (chama cinza)
  - Banner de alerta no topo
  - Stats com opacity reduzida
  - Botao batalha com animacao mais intensa
```

