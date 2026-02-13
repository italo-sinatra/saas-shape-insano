
## Metricas de Especialistas, Anamnese de Acompanhamento e Importacao de Alunos

---

### 1. Sistema de Flags para Especialistas

**Arquivo:** `src/pages/admin/AdminEspecialistas.tsx`

Adicionar metricas de performance e sistema de flags ao card de cada especialista:

**Metricas novas por especialista (mockadas):**
- Tempo medio de entrega da 1a analise (meta: 72h)
- Tempo medio de entrega das analises seguintes (meta: 24h)
- Taxa de entregas no prazo (%)
- Satisfacao media dos alunos
- Taxa de retencao de alunos
- Adesao media dos alunos sob seu cuidado

**Sistema de Flags:**
- **Green** (padrao): Todas as metricas dentro do aceitavel
- **Yellow Flag**: Quando uma metrica fica abaixo do limite no mes (ex: entregas atrasadas > 20%, satisfacao < 4.0)
- **Red Flag**: Acumulo de 3 Yellow Flags 
- **Black Flag**: 1 mes com Red Flag sem melhoria = fora do time

Cada card de especialista mostra:
- Contador de flags (Yellow: 0, Red: false, meses em Red: 0)
- Badge visual colorido com a flag atual
- Historico de flags dos ultimos 3 meses

**Novo componente:** `src/components/admin/SpecialistMetricsModal.tsx`
- Modal ao clicar em "Metricas" no card do especialista
- Graficos de entrega no prazo, satisfacao, retencao
- Timeline de flags com datas
- SLAs: 72h primeira anamnese, 24h demais

---

### 2. Anamnese de Acompanhamento (a cada 30 dias)

**Arquivo:** `src/pages/especialista/EspecialistaAlunos.tsx`
- Adicionar indicador visual de "Anamnese pendente" por aluno (badge amarelo quando faltam <= 5 dias, vermelho quando passou dos 30 dias)
- Botao "Solicitar Anamnese" por aluno

**Arquivo:** `src/pages/especialista/EspecialistaDashboard.tsx`
- Adicionar secao "Anamneses Pendentes" com lista de alunos que precisam da anamnese mensal
- Mostrar prazo de entrega da analise (72h para primeira, 24h para as demais)
- Timer visual mostrando quanto tempo falta para o deadline da analise

**No lado do aluno (futuro):** O aluno receberia uma notificacao/card no Dashboard pedindo para preencher a anamnese mensal. Por enquanto, mockamos o estado como se ja tivesse sido preenchida.

---

### 3. Importacao de Alunos Existentes

**Novo arquivo:** `src/pages/admin/AdminImportarAlunos.tsx`
- Pagina dedicada para importar alunos de base existente
- Formulario completo com todos os campos do perfil (dados pessoais, fisico, nutricional, psicologico)
- Opcao de preencher individualmente OU importar via CSV/planilha
- Ao importar, o aluno ja entra com onboarding completo (skip da anamnese inicial)
- Atribuicao de especialista durante a importacao

**Arquivo:** `src/components/admin/AdminLayout.tsx`
- Adicionar item "Importar Alunos" no menu lateral

**Arquivo:** `src/App.tsx`
- Adicionar rota `/admin/importar`

**Arquivo:** `src/pages/admin/AdminUsuarios.tsx`
- Expandir o dialog "Nova Conta" para incluir mais campos alem de nome/email/senha
- Campos adicionais: telefone, nascimento, peso, altura, objetivo, experiencia, local de treino, especialista atribuido
- Toggle "Pular onboarding" que marca o aluno como ja onboardado

---

### 4. Metricas de SLA no Dashboard do Especialista

**Arquivo:** `src/pages/especialista/EspecialistaDashboard.tsx`

Adicionar cards de SLA:
- "Analises para entregar" com countdown (72h ou 24h conforme o caso)
- "Entregas no prazo este mes: X/Y (Z%)"
- Alerta visual quando esta perto de estourar um prazo

---

### Arquivos impactados (resumo)

| Arquivo | Mudanca |
|---------|---------|
| `src/pages/admin/AdminEspecialistas.tsx` | Metricas de performance + sistema de flags |
| `src/components/admin/SpecialistMetricsModal.tsx` | **Novo** - modal com metricas detalhadas |
| `src/pages/admin/AdminImportarAlunos.tsx` | **Novo** - importacao de alunos existentes |
| `src/pages/admin/AdminUsuarios.tsx` | Expandir formulario de criacao de conta |
| `src/components/admin/AdminLayout.tsx` | Nova rota no menu lateral |
| `src/App.tsx` | Rota `/admin/importar` |
| `src/pages/especialista/EspecialistaDashboard.tsx` | SLAs, anamneses pendentes, deadlines |
| `src/pages/especialista/EspecialistaAlunos.tsx` | Indicador de anamnese + botao solicitar |

### O que NAO muda
- Tema visual, cores, fontes
- Dashboard do aluno, BattleMode, Dieta
- Hooks mockados, AuthContext
- Componentes UI base
