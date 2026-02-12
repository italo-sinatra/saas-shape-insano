

# Enviar Anamnese para Google Sheets

## Objetivo
Ao finalizar o onboarding, todos os dados preenchidos pelo aluno serao enviados automaticamente para uma planilha no Google Sheets, criando uma nova linha com todas as respostas.

## Abordagem Escolhida: Google Apps Script (gratuito, sem dependencias)

A forma mais simples e gratuita de conectar o app ao Google Sheets e usar um Google Apps Script como "ponte". Funciona assim:

```text
Aluno preenche onboarding
        |
        v
App envia dados via fetch (POST)
        |
        v
Google Apps Script recebe os dados
        |
        v
Insere nova linha na planilha
```

Nao precisa de Supabase, Zapier, nem chaves de API no projeto.

---

## O que voce precisa fazer (unica vez)

1. Criar uma planilha no Google Sheets com os cabecalhos (nome, email, telefone, etc.)
2. Ir em **Extensoes > Apps Script**, colar um script que eu vou fornecer pronto
3. Publicar o script como "Web App" (acesso: qualquer pessoa)
4. Copiar a URL gerada e colar no app

Vou fornecer o script do Google Apps Script pronto para copiar e colar.

---

## Mudancas no Codigo

### 1. Criar `src/lib/submitAnamnese.ts`
- Funcao que recebe os dados do `userData` e a URL do webhook
- Filtra apenas campos de texto (ignora arquivos `File` por enquanto, pois Google Sheets nao aceita binarios)
- Faz `fetch` POST com `mode: "no-cors"` para o endpoint do Apps Script
- Retorna sucesso/erro

### 2. Alterar `src/pages/Onboarding.tsx`
- Na etapa "ignite" (Chama de Vesta), ao clicar no botao final, chamar `submitAnamnese()` antes de `onComplete()`
- Adicionar a URL do webhook como constante (ou campo configuravel no admin futuramente)
- Exibir toast de confirmacao ao enviar com sucesso
- Incluir a classe resultante do quiz (Gladius/Velite/Centurio) nos dados enviados

### 3. Criar `src/pages/onboarding/googleSheetsScript.ts`
- Arquivo com o codigo do Google Apps Script como comentario/documentacao para o usuario copiar
- Facilitara a consulta sem sair do projeto

---

## Dados Enviados para a Planilha

Todos os campos de texto do formulario, organizados em colunas:
- Data/hora do envio
- Nome, Email, Telefone, Nascimento, CPF, Cidade/Estado
- Sexo, Faixa etaria, Tempo acompanha, Altura, Peso
- Fatores de escolha, Indicacao, Nome/Telefone indicacao
- Objetivo, Fisiculturismo, Influenciador
- Pratica musculacao, Local treino, Dias semana, Frequencia, Horario, Tempo treino/cardio
- Grupos prioritarios, Dores, Exercicios que nao gosta, Maquinas que nao tem
- Doencas, Historico familiar, Medicamentos, Alergias
- Nivel atividade, Passos, Cardio, Refeicoes, Calorias, Restricoes, Frutas, Suplementos
- Sono, Qualidade sono, Alimentos diarios/nao come, Agua, Liquido refeicao
- Investimento dieta, Faixa salarial
- **Classe do Oraculo** (resultado do quiz)

Fotos nao serao enviadas ao Sheets (sao binarios). Quando o Supabase for conectado, as fotos irao para o Storage.

---

## Secao Tecnica

### `submitAnamnese.ts`
```typescript
export async function submitAnamnese(userData: UserData, resultClass: string, webhookUrl: string)
```
- Serializa todos os campos string/array do userData
- Arrays (dias_semana, maquinas, frutas, etc.) sao convertidos em string separada por virgula
- Campos File sao ignorados
- POST com `mode: "no-cors"` e `Content-Type: text/plain` (contorno para CORS do Apps Script)

### Google Apps Script (fornecido ao usuario)
- Funcao `doPost(e)` que parseia o JSON recebido
- Insere uma linha na aba ativa da planilha
- Retorna `ContentService.createTextOutput("ok")`

### Fluxo no Onboarding
- O webhook URL sera uma constante no codigo por enquanto
- Quando nao houver URL configurada, os dados serao apenas logados no console
- Toast de sucesso/erro apos o envio

