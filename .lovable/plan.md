

## Timeout no AuthContext para evitar tela de loading infinita

### Problema
Quando o backend demora ou falha para responder, o app fica preso na tela de loading para sempre.

### Solucao
Adicionar um timeout de 5 segundos no `AuthContext`. Se o backend nao responder nesse tempo, o `loading` sera forçado para `false`, permitindo que o usuario veja a tela de login.

Alem disso, adicionar uma mensagem amigavel na tela de loading que aparece apos 3 segundos, informando que esta demorando, e um botao de "Tentar novamente" apos o timeout.

### Detalhes tecnicos

**Arquivo: `src/contexts/AuthContext.tsx`**
- Adicionar um `setTimeout` de 5 segundos no `useEffect` que inicializa a sessao
- Se apos 5s o `loading` ainda for `true`, forçar `loading = false`
- Limpar o timeout quando a sessao resolver normalmente

**Arquivo: `src/App.tsx` (LoadingScreen)**
- Adicionar estado para controlar exibicao de mensagem de "demora"
- Apos 3 segundos, mostrar texto: "Isso esta demorando mais que o normal..."
- Apos 5 segundos, mostrar botao "Tentar novamente" que recarrega a pagina

