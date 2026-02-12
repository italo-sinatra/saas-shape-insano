

# Banco de Dados e Persistencia Completa - Shape Insano

## Resumo
Configurar o Lovable Cloud (Supabase) para persistir todos os dados do app: autenticacao real, dados do onboarding/anamnese, gamificacao (XP, streak, liga, classe, dracmas), treinos/batalhas, e paineis admin/especialista.

---

## Fase 1: Ativar Lovable Cloud e Autenticacao

### 1.1 Ativar Lovable Cloud
- Habilitar o backend integrado do Lovable Cloud no projeto

### 1.2 Tabelas de base
Criar as seguintes tabelas via migracao SQL:

**profiles** - Dados do usuario apos onboarding
- `id` (uuid, FK para auth.users)
- `nome`, `email`, `telefone`, `nascimento`, `cpf`, `cidade_estado`, `sexo`
- `faixa_etaria`, `altura`, `peso`
- `tempo_acompanha`, `fatores_escolha`
- `indicacao`, `indicacao_nome`, `indicacao_telefone`
- `classe` (gladius/velite/centurio)
- `onboarded` (boolean)
- `created_at`

**user_roles** - Roles separados (admin, especialista, user)
- `id`, `user_id` (FK auth.users), `role` (enum)

**gamification** - Estado de gamificacao
- `user_id` (FK auth.users, PK)
- `xp`, `level`, `league`, `streak`, `max_streak`, `dracmas`
- `flame_percent`, `updated_at`

**anamnese** - Dados completos da anamnese
- `user_id` (FK auth.users)
- Todos os campos textuais do onboarding (objetivo, treino, saude, nutricional, estilo de vida)
- `created_at`

**workouts** - Historico de treinos/batalhas
- `id`, `user_id`, `started_at`, `finished_at`, `duration_seconds`
- `exercises` (jsonb), `xp_earned`, `dracmas_earned`

**achievements** - Conquistas desbloqueadas
- `id`, `user_id`, `achievement_key`, `unlocked_at`

### 1.3 Storage bucket
- Criar bucket `photos` para fotos do onboarding (postural, poses)
- Politicas RLS: usuario pode fazer upload/leitura das proprias fotos

### 1.4 RLS Policies
- profiles: usuario le/atualiza apenas o proprio perfil; admins podem ler todos
- gamification: usuario le/atualiza o proprio; todos podem ler para ranking
- anamnese: usuario le a propria; especialistas e admins podem ler dos seus alunos
- workouts: usuario CRUD proprio
- user_roles: funcao `has_role()` com security definer

---

## Fase 2: Autenticacao Real

### 2.1 AuthPage.tsx
- Substituir o `onAuth()` fake por chamadas reais ao Supabase Auth (`signUp`, `signInWithPassword`)
- Adicionar tratamento de erros e loading states

### 2.2 Contexto de Auth
- Criar `AuthProvider` com `onAuthStateChange` + `getSession`
- Proteger rotas com verificacao de sessao
- Verificar se usuario completou onboarding (campo `onboarded` no profile)

### 2.3 App.tsx
- Remover estados locais `authenticated`/`onboarded`
- Usar o AuthProvider para controlar fluxo

---

## Fase 3: Onboarding com Persistencia

### 3.1 Onboarding.tsx
- Ao finalizar o onboarding:
  1. Upload das fotos para o bucket `photos`
  2. Salvar dados do profile na tabela `profiles`
  3. Salvar dados detalhados na tabela `anamnese`
  4. Salvar classe resultado na tabela `profiles.classe`
  5. Criar registro inicial em `gamification` (XP=0, streak=0, liga=plebe)
  6. Manter envio para Google Sheets (ja funcionando)
  7. Marcar `profiles.onboarded = true`

---

## Fase 4: Dashboard e Gamificacao com Dados Reais

### 4.1 Dashboard.tsx
- Buscar dados de `gamification` e `profiles` do usuario logado
- Streak, XP, nivel, liga, dracmas vem do banco
- Frases estoicas podem permanecer hardcoded (sao conteudo estatico)

### 4.2 Perfil.tsx
- Carregar dados do perfil do banco
- Exibir classe, liga, XP, conquistas reais
- Permitir edicao de dados basicos

### 4.3 Coliseu.tsx
- Buscar ranking real dos usuarios por XP
- Calcular liga baseado em faixas de XP

### 4.4 BattleMode.tsx
- Ao completar batalha, salvar registro em `workouts`
- Incrementar XP e dracmas em `gamification`
- Atualizar streak

---

## Fase 5: Paineis Admin e Especialista

### 5.1 Admin
- AdminUsuarios: buscar usuarios reais de `profiles` + `gamification`
- AdminDashboard: KPIs calculados a partir dos dados reais
- Proteger rotas com verificacao de role `admin`

### 5.2 Especialista
- Buscar alunos atribuidos ao especialista
- Visualizar anamnese e dados dos alunos
- Proteger rotas com verificacao de role `especialista`

---

## Detalhes Tecnicos

### Estrutura de arquivos novos
```text
src/
  contexts/AuthContext.tsx        -- Provider de autenticacao
  hooks/useAuth.ts                -- Hook para acessar auth
  hooks/useProfile.ts             -- Hook para dados do perfil
  hooks/useGamification.ts        -- Hook para XP/streak/liga
  lib/supabase.ts                 -- Cliente Supabase (ja criado pelo Cloud)
  components/ProtectedRoute.tsx   -- Wrapper de rota protegida
```

### Ordem de implementacao
1. Ativar Lovable Cloud
2. Migracoes SQL (tabelas + RLS + funcoes)
3. AuthContext + AuthPage real
4. Onboarding com persistencia
5. Dashboard/Perfil/Coliseu com dados reais
6. BattleMode com persistencia
7. Paineis admin/especialista com dados reais

