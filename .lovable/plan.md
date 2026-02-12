

# Fix: Tela Branca - Tema Escuro Nao Aplicado

## Problema

O Tailwind esta configurado com `darkMode: ["class"]` no `tailwind.config.ts`, o que exige a classe `dark` no elemento `<html>` para ativar o tema escuro. Porem o `index.html` nao tem essa classe, entao o navegador usa fundo branco padrao mesmo com as variaveis CSS definindo cores escuras.

## Solucao

Uma unica alteracao em um arquivo:

**`index.html`** - Adicionar `class="dark"` na tag `<html>`:

```html
<html lang="pt-BR" class="dark">
```

Isso faz o Tailwind reconhecer que o tema escuro esta ativo e aplicar `bg-background` como a cor escura definida nas variaveis CSS (`--background: 0 0% 4%` = quase preto).

## Resultado

O app volta a ter o fundo escuro com a estetica romana correta (obsidian/marble), textos dourados e vermelhos visiveis.
