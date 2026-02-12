
# Ativar conta italogusta242@gmail.com sem triagem

## Problema
A conta foi criada mas o email nao foi confirmado automaticamente (email_confirmed_at = null), impedindo o login. Alem disso, o campo `onboarded` esta como `false`.

## Solucao
Executar uma migracao SQL para:
1. Confirmar o email do usuario (atualizar `email_confirmed_at` na tabela `auth.users`)
2. Marcar `onboarded = true` na tabela `profiles`
3. Preencher dados basicos no perfil (nome)

### SQL a executar:
```sql
-- Confirmar email
UPDATE auth.users 
SET email_confirmed_at = now(), 
    updated_at = now()
WHERE email = 'italogusta242@gmail.com';

-- Marcar como onboarded e preencher nome
UPDATE public.profiles 
SET onboarded = true, 
    nome = 'Italo Gusta'
WHERE id = 'b7bb9a75-634f-4429-836a-5e32964a2c7b';
```

Apos a migracao, o usuario podera fazer login com `italogusta242@gmail.com` / `Wall9969` e ira direto para o Dashboard, sem passar pelo onboarding.
