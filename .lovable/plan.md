
# Melhorias: Dashboard Responsivo, Mentores, e Coliseu com Ligas

## 1. Dashboard Responsivo (Mobile vs Desktop)

**Mobile** (atual): layout vertical em coluna unica, como esta hoje -- sera mantido e polido.

**Desktop** (novo): quando a tela for >= 768px, o dashboard muda para um layout de grid com multiplas colunas, mais proximo de um painel administrativo real:
- Header com logo + stats em barra horizontal
- Grid de 3 colunas: Chama de Vesta + Stats na esquerda, Grafico de performance + AI Insight no centro, XP/Liga + Atalhos na direita
- Cards maiores com mais espaco e informacoes visiveis
- Usar o hook `useIsMobile()` ja existente para alternar layouts

## 2. Mentores -- Botao de Voltar

- Adicionar um botao de voltar explicito (icone de seta) no header do chat quando um mentor esta selecionado
- Substituir o "Toque para voltar" por um botao `ArrowLeft` claro e clicavel, separado do header do mentor

## 3. Coliseu -- Ligas Separadas

Logica atual esta errada: mostra todos os jogadores juntos e permite filtrar livremente. A correcao:

- O usuario pertence a UMA liga (ex: "equites") baseado no seu XP
- Ao entrar no Coliseu, o usuario ve APENAS a sua liga com os jogadores dessa liga
- Acima, mostra uma visualizacao de progressao das ligas (Plebe -> Equites -> Legionarios -> Pretorianos) com a liga atual destacada
- Remover o botao "TODAS" e os filtros de outras ligas
- Adicionar faixas de XP para cada liga (ex: Plebe 0-5000, Equites 5001-10000, etc.)
- Mostrar quanto XP falta para a proxima liga
- Adicionar secao de "Bonus de Promocao" que mostra as recompensas de subir de liga (ex: +500 Dracmas, Skin exclusiva, titulo especial)

## Detalhes Tecnicos

### Dashboard Responsivo
- Arquivo: `src/pages/Dashboard.tsx`
- Importar `useIsMobile` de `@/hooks/use-mobile`
- Renderizar condicionalmente: `isMobile ? <MobileLayout /> : <DesktopLayout />`
- Desktop usa `grid grid-cols-3 gap-6` com cards maiores
- Mobile mantem o layout vertical atual

### Mentores
- Arquivo: `src/pages/Mentores.tsx`
- Adicionar icone `ArrowLeft` do lucide-react
- Botao dedicado no header do chat que chama `setSelectedMentor(null)`

### Coliseu
- Arquivo: `src/pages/Coliseu.tsx`
- Definir `userLeague = "equites"` e `userXP = 8450` (mock)
- Definir faixas: `{ plebe: [0, 5000], equites: [5001, 10000], legionarios: [10001, 15000], pretorianos: [15001, Infinity] }`
- Filtrar `mockPlayers` para mostrar apenas os da mesma liga do usuario
- Adicionar barra de progresso mostrando XP atual vs proximo nivel de liga
- Adicionar card de "Bonus de Promocao" com recompensas da proxima liga
- Adicionar visualizacao horizontal de progressao entre ligas com a atual destacada
