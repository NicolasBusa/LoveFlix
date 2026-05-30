# Melhorias no Construtor de Sites (Builder)

## 📌 Visão Geral do Projeto
Resolver problemas críticos de usabilidade no Construtor de Sites (Form Builder): sincronização em tempo real quebrada, layout mobile inacessível, e falta de navegação no mockup.

**Projeto Tipo:** WEB

## ✅ Decisões do Usuário (Socratic Gate — Resolvido)
1. **Mobile:** Ocultar o mockup por padrão. Exibir somente quando clicar em "Ver Demonstração".
2. **Desktop:** Diminuir o tamanho do mockup. Reduzir para tamanho proporcional.
3. **localStorage:** Aprovado para persistir rascunho do formulário.

---

## 📋 Task Breakdown (6 Tasks)

### Task 1: Corrigir Sincronização em Tempo Real (postMessage)
- MODIFY: `preview-template/index.html` — Adicionar listener postMessage
- MODIFY: `preview-template/login.html` — Adicionar listener postMessage
- MODIFY: `PreviewMockup.tsx` — Re-enviar config no onLoad do iframe

### Task 2: Refatorar Layout Desktop — Diminuir o Mockup
- MODIFY: `page.tsx` — Trocar w-1/2 por w-[60%]/w-[40%]
- MODIFY: `PreviewMockup.tsx` — Reduzir max-w do mockup

### Task 3: Refatorar Layout Mobile — Mockup Oculto com Modal
- MODIFY: `page.tsx` — Substituir translate-x por modal overlay

### Task 4: Navegador de Páginas do Mockup
- MODIFY: `PreviewMockup.tsx` — Botões Perfil/Login/Home abaixo do mockup

### Task 5: Persistência do Rascunho no localStorage
- MODIFY: `page.tsx` — Salvar/carregar config do localStorage com debounce

### Task 6: Bypass de Auth no Modo Preview
- MODIFY: `js/utils.js` — Pular requireAuth() quando ?preview=1

---

Ver plano detalhado no artifact: `implementation_plan.md`
