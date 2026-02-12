

# Configurar URL do Webhook do Google Sheets

## O que sera feito
Atualizar a constante `WEBHOOK_URL` no arquivo `src/lib/submitAnamnese.ts` com a URL completa do Google Apps Script fornecida pelo usuario.

## Mudanca

### Arquivo: `src/lib/submitAnamnese.ts`
- Linha 4: substituir `const WEBHOOK_URL = "";` por:
  `const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzbNR7eLxtYFtHqv0TigXyqFypKqYYlVK0VzV3aHdoO76Ii6ch2SslwMEK-A7lVEcZXAg/exec";`

Apos isso, toda vez que um aluno finalizar o onboarding, os dados serao enviados automaticamente para sua planilha no Google Sheets.

