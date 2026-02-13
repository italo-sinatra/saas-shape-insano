

## Remover timeout e mensagens de problemas de conexao

### O que sera feito

Remover o mecanismo de timeout de 5 segundos e as mensagens de "problemas de conexao" que foram adicionados recentemente.

### Detalhes tecnicos

**Arquivo: `src/contexts/AuthContext.tsx`**
- Remover o `setTimeout` de 5 segundos e toda a logica de `resolved`/`markResolved`
- Manter apenas o fluxo normal: listener `onAuthStateChange` + `getSession()` inicial
- O loading so sera `false` quando o backend responder naturalmente

**Arquivo: `src/App.tsx`**
- Simplificar o `LoadingScreen`: remover os estados `slow` e `timedOut`
- Remover os timers e as mensagens "Isso esta demorando..." e "Problemas de conexao detectados"
- Remover o botao "Tentar novamente"
- Manter apenas o logo animado como tela de loading

