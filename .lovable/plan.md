

## Remover dependencia do banco de dados - voltar ao MVP frontend puro

### Objetivo
Tirar todas as chamadas ao banco de dados para que o app funcione 100% no frontend com dados mockados. O usuario abre o app e vai direto para o conteudo, sem login obrigatorio. Depois, quando tudo estiver validado visualmente e funcionalmente, reconectamos o banco com as requisicoes corretas.

### O que muda para o usuario
- Abrir o app vai direto para o Dashboard (sem login/cadastro obrigatorio)
- Todos os dados (XP, streak, dracmas, perfil) serao mockados localmente
- O onboarding ainda funciona, mas salva dados apenas em memoria local
- As paginas admin e especialista continuam acessiveis pelas rotas

### Detalhes tecnicos

**1. `src/contexts/AuthContext.tsx`**
- Remover todas as chamadas ao Supabase (signIn, signUp, getSession, onAuthStateChange)
- Criar um usuario "fake" fixo para simular sessao ativa
- `loading` comeca como `false`, `user` ja vem preenchido, `onboarded` comeca como `true`
- signIn/signUp/signOut viram funcoes vazias (no-op)

**2. `src/App.tsx`**
- Como o `user` sempre existe e `onboarded` e `true`, o app vai direto para as rotas do Dashboard
- Nenhuma tela preta, nenhum loading

**3. `src/hooks/useGamification.ts`**
- Remover chamadas ao Supabase
- Retornar dados mockados fixos (xp: 1250, streak: 5, dracmas: 340, level: 3, league: "legionario")

**4. `src/hooks/useProfile.ts`**
- Remover chamadas ao Supabase
- Retornar perfil mockado (nome, email, classe)

**5. `src/hooks/useGamification.ts` (useAddXpAndDracmas)**
- Mutation vira no-op (nao faz nada por enquanto)

**6. `src/pages/Onboarding.tsx`**
- Remover chamada ao Supabase para salvar no banco
- O `submitAnamnese` continua (se usa Google Sheets), mas a parte de `supabase.from("profiles").update(...)` e removida
- Apenas chama `onComplete()` no final

**7. `src/pages/BattleMode.tsx`**
- Remover chamadas diretas ao Supabase
- Manter a logica de UI, mas sem persistir no banco

**8. `src/pages/admin/AdminUsuarios.tsx`**
- Manter a UI com dados mockados em vez de buscar do banco

### O que NAO muda
- Todo o visual, animacoes, tema romano, componentes UI
- A estrutura de rotas e navegacao
- Os arquivos do Supabase (`client.ts`, `types.ts`) continuam existindo (nao tocamos neles)
- O banco continua la, so nao e usado por enquanto

### Resultado
App abre instantaneamente no Dashboard com dados de exemplo. Zero dependencia de rede. Perfeito para validar UI/UX antes de reconectar o backend.

