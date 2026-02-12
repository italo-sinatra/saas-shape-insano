

# Tres Acessos + Anamnese Completa do Aluno

## Visao Geral

Reestruturar a plataforma em 3 areas distintas com dados ricos do aluno que alimentam especialistas e marketing.

---

## 1. Anamnese Completa no Onboarding do Aluno

O onboarding atual tem apenas 5 perguntas de classificacao de classe. Vamos expandir com etapas adicionais ANTES e DEPOIS do quiz do Oraculo:

**Etapa 1 - Cadastro Basico** (nova)
- Nome completo
- Email
- Telefone/WhatsApp
- Data de nascimento
- Genero

**Etapa 2 - Anamnese Fisica** (nova)
- Peso atual (kg)
- Altura (cm)
- Objetivo principal (perder peso / ganhar massa / performance / saude geral)
- Nivel de experiencia com treino (iniciante / intermediario / avancado)
- Frequencia semanal desejada (2-3x / 4-5x / 6-7x)
- Lesoes ou restricoes fisicas (campo texto)
- Pratica algum esporte? Qual?

**Etapa 3 - Anamnese Nutricional** (nova)
- Restricoes alimentares (vegetariano, vegano, lactose, gluten, etc - multi-select)
- Quantas refeicoes por dia?
- Usa suplementos? Quais?
- Nivel de hidratacao diaria
- Consumo de alcool (nunca / social / frequente)

**Etapa 4 - Perfil Psicologico/Comportamental** (nova)
- Nivel de estresse atual (1-5)
- Qualidade do sono (ruim / regular / bom / otimo)
- Horas de sono por noite
- Maior dificuldade com consistencia (falta de tempo / motivacao / organizacao / outro)
- O que te faria desistir? (campo texto)

**Etapa 5 - Quiz do Oraculo** (existente, mantido)
- As 5 perguntas de classificacao de classe

**Etapa 6 - Resultado + Chama de Vesta** (existente, mantido)

O fluxo sera um stepper visual com progresso, cada etapa em uma tela animada como ja esta hoje.

---

## 2. Painel do Especialista (nova area /especialista)

Uma area separada com layout proprio (similar ao admin mas focada no trabalho do especialista). Acessivel em `/especialista`.

**Layout**: Sidebar com navegacao propria + conteudo principal

**Paginas**:

- **Dashboard do Especialista** (`/especialista`): Resumo dos seus alunos atribuidos, alertas, pendencias de revisao
- **Meus Alunos** (`/especialista/alunos`): Lista dos alunos com filtros por status, liga, chama. Ao clicar num aluno abre o resumo completo
- **Resumo do Aluno** (dentro de Meus Alunos): Card expandido mostrando TODOS os dados da anamnese organizados por categoria (dados pessoais, fisico, nutricional, psicologico, classe, XP, liga). Isso e o que o especialista usa para montar dieta/treino/acompanhamento
- **Editor de Planos** (`/especialista/planos`): Interface para ajustar treinos e dietas (similar ao AdminPlanos atual mas filtrado para os alunos do especialista)
- **Chat** (`/especialista/chat`): Comunicacao direta com alunos atribuidos
- **Meu Perfil** (`/especialista/perfil`): Dados do especialista

---

## 3. Painel Admin/Gerenciador (area /admin existente, expandida)

O admin atual sera expandido com:

- **Resumos de Marketing**: Nova secao nos relatorios com dados agregados da anamnese (distribuicao de objetivos, faixas etarias, restricoes alimentares mais comuns, motivos de desistencia). Esses dados vem das respostas do onboarding e servem para qualificar leads e segmentar campanhas
- **Gestao de Especialistas melhorada**: Atribuicao de alunos, visualizacao da carga de cada especialista
- **Visao do aluno pelo admin**: Admin pode ver o resumo completo de qualquer aluno (mesma view do especialista)

---

## Detalhes Tecnicos

### Onboarding (src/pages/Onboarding.tsx)
- Expandir o state `step` para incluir: `"welcome" | "cadastro" | "fisico" | "nutricional" | "psicologico" | "quiz" | "result" | "ignite"`
- Cada etapa renderiza um formulario com campos adequados (Input, Select, Slider, Checkbox)
- Armazenar respostas em um objeto `userData` no state
- Stepper visual no topo mostrando progresso (8 etapas total)
- Animacoes de transicao entre etapas mantidas com framer-motion

### Painel Especialista
- Novo arquivo `src/components/especialista/EspecialistaLayout.tsx` (sidebar + outlet)
- Novos arquivos em `src/pages/especialista/`:
  - `EspecialistaDashboard.tsx`
  - `EspecialistaAlunos.tsx`
  - `EspecialistaPlanos.tsx`
  - `EspecialistaChat.tsx`
  - `EspecialistaPerfil.tsx`
- Novas rotas em `src/App.tsx` com `EspecialistaLayout` wrapper
- Bypass do onboarding para rotas `/especialista` (mesmo pattern do `/admin`)

### Admin - Resumos de Marketing
- Expandir `src/pages/admin/AdminRelatorios.tsx` com nova tab "Marketing/Qualificacao"
- Graficos de distribuicao: objetivos, faixas etarias, restricoes, nivel de experiencia
- Esses dados vem dos mock de anamnese (futuramente do banco)

### Admin - Visao do Aluno
- Expandir `src/pages/admin/AdminUsuarios.tsx`: ao clicar "Ver" no aluno, abre um modal/drawer com o resumo completo da anamnese

### Routing (src/App.tsx)
- Adicionar rotas `/especialista/*` com layout proprio
- Atualizar a condicao de bypass do onboarding: `!isAdmin && !isEspecialista`

