

# Reestruturacao da Anamnese baseada no Google Forms

## Resumo

Reescrever completamente o `src/pages/Onboarding.tsx` para refletir todas as perguntas do formulario Google Forms do "1o Mes Anamnese | Clube Anti-Falhas", mantendo a estetica romana e o fluxo imersivo existente (stepper, animacoes, quiz do Oraculo e Chama de Vesta no final).

---

## Nova Estrutura de Etapas

O formulario original tem muitas perguntas. Para manter a experiencia mobile-friendly sem sobrecarregar o usuario, as etapas serao reorganizadas assim:

```text
1. welcome        - Tela de boas-vindas (manter)
2. cadastro       - Dados pessoais (expandido)
3. fotos          - Upload de fotos para analise postural (NOVO)
4. objetivo       - Objetivo, fisiculturismo (NOVO)
5. treino         - Rotina de treino (expandido do antigo "fisico")
6. academia       - Maquinas da academia, dores, exercicios (NOVO)
7. saude          - Doencas, medicamentos, alergias (NOVO)
8. nutricional    - Nutricao completa (expandido)
9. estilo_vida    - Sono, agua, atividade, cardio (NOVO, absorve parte do antigo "psicologico")
10. quiz          - Oraculo das classes (manter)
11. result        - Resultado da classe (manter)
12. ignite        - Chama de Vesta (manter)
```

---

## Campos por Etapa (baseados no Google Forms)

### Etapa 2 - Cadastro (Dados do Legionario)
- Nome completo (text, obrigatorio)
- Email mais utilizado (email, obrigatorio)
- Telefone/WhatsApp (text, obrigatorio)
- Data de nascimento (date, obrigatorio)
- CPF (text, obrigatorio)
- Cidade/Estado (text, obrigatorio)
- Sexo (select: Masculino, Feminino)
- Faixa etaria (select: as 9 faixas do forms)
- Indicacao (select: Sim/Nao) + campos condicionais (nome e telefone de quem indicou)

### Etapa 3 - Fotos (Analise Postural) - NOVO
- Instrucoes visuais de como tirar as fotos (texto do forms)
- 5 campos de upload: frente, costas, lado direito, lado esquerdo, perfil
- Nota: uploads serao placeholders visuais por enquanto (sem backend), com botao de selecionar arquivo e preview

### Etapa 4 - Objetivo - NOVO
- Objetivo principal (select: Ganho de massa, Perda de gordura, Deixo para profissionais, Outro)
- Campo condicional "Outro objetivo" (text)
- Pretende ser atleta de fisiculturismo? (select: Sim, Nao)
- Campos condicionais para fisiculturismo (3 uploads de poses)

### Etapa 5 - Treino (Rotina de Batalha)
- Ja pratica musculacao? (select: Sim, Nao irei comecar)
- Local de treino (select: Academia, Casa, Parte/parte)
- Campo condicional "maquinas/pesos em casa" (textarea)
- Dias da semana disponiveis (checkbox: Dom a Sab)
- Frequencia de compromisso (select: 2 a 7 dias)
- Horario de treino (text)
- Tempo disponivel para treino (select: <1h, 1h, 1h30, 2h, +2h)
- Tempo disponivel para cardio (select: <15min, 15-30, 30-45, 45-60, Nao tenho)
- Upload treino antigo (file, opcional)

### Etapa 6 - Academia e Corpo - NOVO
- Grupos musculares prioritarios (textarea)
- Dor/desconforto ao se movimentar? (select: Sim, Nao) + campo condicional
- Exercicios que nao gosta? (select: Sim, Nao) + campo condicional
- Maquinas que NAO tem na academia (checkbox com todas as ~30 opcoes do forms, incluindo "Tenho todas")

### Etapa 7 - Saude - NOVO
- Doencas (checkbox: Diabetes, Pressao alta, Colesterol, Cancer, Depressao, Ansiedade, Triglicerideos, Nenhuma, Outra)
- Campo condicional "outra doenca" (text)
- Historico familiar (select: Sim, Nao) + campo condicional
- Medicamentos controlados (text)
- Alergias/intolerancias (checkbox: Gluten, Lactose, Nenhuma, Outro) + campo condicional

### Etapa 8 - Nutricional (Combustivel de Batalha)
- Nivel de atividade no trabalho (select: Sedentario, Moderado, Ativo)
- Media de passos diarios / calorias gastas (text)
- Faz cardio? (select: Sim, Nao) + tempo condicional
- Quantas refeicoes por dia (select: 1-7)
- Horario e descricao das refeicoes (textarea)
- Faixa de calorias atual (select: as 7 opcoes do forms)
- Ha quanto tempo consome essa faixa (text)
- Restricoes alimentares (checkbox: Ovolacto, Lacto, Ovo, Vegano, Nao)
- Frutas preferidas (checkbox: 22 frutas do forms, minimo 5)
- Suplementos (checkbox: Whey, Creatina, Glutamina, Pre-treino, BCAA, Hipercalorico, Omega3, Beta-Alanina, Cafeina, Multivitaminico, Nenhum, Outro)

### Etapa 9 - Estilo de Vida (Mente e Recuperacao)
- Horario de dormir e acordar (text)
- Qualidade do sono (select)
- Alimentos que quer diariamente na dieta (textarea)
- Alimentos que nao come (textarea)
- Litros de agua por dia (select: <1L, 1L, 1.5L, 2L, 2.5L, 3L, 4L+)
- Toma liquido nas refeicoes? (select: Sim, Nao) + qual
- Disponibilidade de investimento em dieta (select: Pouco, Medio, Muito)
- Faixa salarial (select: as 8 faixas do forms, opcional)

### Etapas 10-12 - Quiz, Resultado e Chama (manter como estao)

---

## Detalhes Tecnicos

### Arquivo modificado:
- `src/pages/Onboarding.tsx` — reescrita completa do formulario

### O que muda:
- `Step` type expandido para incluir novas etapas (fotos, objetivo, academia, saude, estilo_vida)
- `userData` state expandido com todos os novos campos
- Novos arrays de opcoes para checkboxes (maquinas, doencas, frutas, suplementos)
- Campos condicionais renderizados com `&&` baseado em valores do state
- Upload de fotos como `<input type="file">` com preview local (sem backend por enquanto)
- Etapas longas (maquinas da academia) usam `ScrollArea` para scroll interno

### O que NAO muda:
- Estetica romana (fontes Cinzel, gradients crimson/gold, marble-texture)
- Animacoes de transicao entre etapas (framer-motion)
- Quiz do Oraculo e classes (Gladius, Velite, Centurio)
- Tela da Chama de Vesta final
- Estrutura geral do componente (steps array, stepper visual, botoes de avancar)

### Dependencias: nenhuma nova necessaria

