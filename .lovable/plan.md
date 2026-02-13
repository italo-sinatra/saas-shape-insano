

## Plano Completo: Redefinir Dashboard e Funcionalidades Core

Este plano cobre todas as mudancas solicitadas em um unico bloco: toggle da chama, registro de treino detalhado, estado mental, metas/dieta, chat do especialista e definicao dos indicadores da barra superior.

---

### 1. Toggle da Chama (dev/preview)

Adicionar um botao temporario (visivel apenas em dev) no Dashboard que alterna `chamaAtiva` entre true/false via estado local, permitindo visualizar os dois modos do dashboard sem depender do streak real.

**Arquivo:** `src/pages/Dashboard.tsx`
- Adicionar `const [forceDishonor, setForceDishonor] = useState(false)` 
- A variavel `chamaAtiva` passa a ser `streak > 0 && !forceDishonor`
- Clicar na area da Chama de Vesta (ou no icone de fogo no header) alterna `forceDishonor`

---

### 2. Barra Superior - Definicao de cada indicador

Referencia da imagem: `[coracao] 86/100 | [haltere] HIIT 45min | [fogo] 1.250/2.400 | [cerebro] Focado | [chama] 5 dias | [moeda] 340`

| Indicador | O que representa | Fonte dos dados |
|-----------|-----------------|-----------------|
| Coracao 86/100 | **Performance Score** - media ponderada de adesao ao treino, progressao de carga e consistencia | Calculado a partir do historico de treinos registrados |
| Haltere HIIT 45min | **Treino do Dia** - tipo e duracao estimada do treino agendado | Plano de treino gerado pelo especialista/IA |
| Fogo 1.250/2.400 | **Calorias** - consumidas vs meta diaria | Input manual do aluno (futuro: smartwatch) |
| Cerebro Focado | **Estado Mental** - mood do dia | Check-in diario + calculo automatico |
| Chama 5 dias | **Streak** - dias consecutivos de treino | Contagem automatica |
| Moeda 340 | **Dracmas** - moeda do jogo | Sistema de gamificacao |

**Arquivo:** `src/pages/Dashboard.tsx`
- Separar a barra superior em componente proprio `StatsBar`
- Tornar cada indicador clicavel/interativo quando relevante

---

### 3. Modo Batalha com Registro Detalhado (serie por serie)

**Arquivo:** `src/pages/BattleMode.tsx` - Reescrever a logica de exercicios

Cada exercicio tera:
- Lista de series expandivel (ex: 4 series)
- Para cada serie: campo de **carga (kg)** e **reps realizadas**
- Botao de confirmar serie (marca como feita)
- Espaco reservado para **video de execucao** (placeholder com icone de play, futuro: link para video demonstrativo)
- Treino so completa quando TODAS as series de TODOS os exercicios forem confirmadas

Estrutura de dados:

```text
exercicio: {
  name: "Supino Inclinado",
  videoUrl: null,  // futuro: URL do video demonstrativo
  sets: [
    { targetReps: 10, actualReps: null, weight: null, done: false },
    { targetReps: 10, actualReps: null, weight: null, done: false },
    ...
  ]
}
```

O score de performance sera calculado a partir desses dados (progressao de carga vs treino anterior).

---

### 4. Estado Mental - Check-in Diario

**Novo arquivo:** `src/components/DailyCheckIn.tsx`

Modal/drawer que aparece ao abrir o app (1x por dia):
- 3 perguntas rapidas com emojis/icones:
  1. "Como voce dormiu?" (ruim / ok / bem / otimo)
  2. "Como esta sua energia hoje?" (baixa / media / alta)
  3. "Nivel de estresse?" (alto / medio / baixo)
- Resultado combinado com dados automaticos (streak, adesao a dieta, frequencia) gera o estado: Focado, Neutro, Cansado, Desanimado, etc.

**Arquivo:** `src/pages/Dashboard.tsx`
- Exibir o estado calculado no indicador "Mental" da barra superior

---

### 5. Metas Diarias + Acesso a Dieta

**Arquivo:** `src/pages/Dashboard.tsx` - Secao "Metas Diarias"

- Metas de proteina, agua, sono, passos continuam como estao
- Adicionar botao "Ver Dieta Completa" que navega para nova pagina
- Os dados virao do plano alimentar (mockado por enquanto)

**Novo arquivo:** `src/pages/Dieta.tsx`
- Exibe o plano alimentar do dia (refeicoes, macros, horarios)
- Dados mockados inicialmente (futuro: gerado por IA ou especialista)
- Rota: `/dieta`

---

### 6. Chat do Especialista - Toggle Agente IA

**Arquivo:** `src/pages/especialista/EspecialistaChat.tsx`

- Adicionar botao toggle no header do chat: "Agente IA" liga/desliga
- Quando ligado: IA pode sugerir respostas automaticas ao especialista
- Quando desligado: chat puro humano sem interferencia
- Visual: switch com icone de robo/cerebro
- Estado inicial: desligado (humano por padrao)

---

### 7. Volume Semanal

**Arquivo:** `src/pages/Dashboard.tsx` - Secao "Volume Semanal"

Volume = soma de (carga x reps x series) de todos os exercicios da semana. Com o registro detalhado do Modo Batalha (item 3), esses dados passam a existir. Por enquanto, manter mockado mas com a formula correta para quando os dados reais estiverem disponiveis.

---

### 8. Calorias

O indicador de calorias (1.250/2.400) fica como input manual por enquanto. Adicionar campo simples na secao de metas diarias para o aluno registrar calorias consumidas. No futuro, integrar com smartwatch.

---

### Arquivos impactados (resumo)

| Arquivo | Mudanca |
|---------|---------|
| `src/pages/Dashboard.tsx` | Toggle chama, barra superior refatorada, link dieta, check-in |
| `src/pages/BattleMode.tsx` | Registro serie por serie com carga/reps + placeholder video |
| `src/components/DailyCheckIn.tsx` | **Novo** - modal de check-in diario |
| `src/pages/Dieta.tsx` | **Novo** - pagina de dieta |
| `src/pages/especialista/EspecialistaChat.tsx` | Toggle agente IA |
| `src/App.tsx` | Nova rota `/dieta` |

### O que NAO muda
- Tema visual, cores, fontes, animacoes existentes
- Estrutura de rotas e navegacao principal
- Hooks mockados (useGamification, useProfile)
- Componente ChamaDeVesta
- Paginas admin

