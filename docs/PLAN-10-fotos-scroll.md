# Plano de Implementação: Fotos e Scroll (LoveFlix)

O objetivo desta implementação é expandir a capacidade de exibição de fotos no template LoveFlix e atualizar o portal de criação para suportar essa nova demanda.

## 🔴 User Review Required
> [!IMPORTANT]
> - **Quantidade de Etapas no Construtor**: Como passaremos a permitir até 10 fotos em 3 seções diferentes (totalizando até 30 fotos e formulários), a experiência no `BuilderForm` pode ficar cansativa se tudo ficar na mesma tela. Propomos separar em 3 passos diferentes no construtor: "Em Alta", "Melhores Momentos" e "Linha do Tempo". Você concorda com essa divisão?
> - **Comportamento das Setas**: As setas de rolagem aparecerão nas extremidades esquerdas e direitas da fileira apenas no Desktop, quando o usuário passar o mouse por cima (padrão Netflix). No celular, o usuário continua arrastando com o dedo livremente.

## 🛠 Proposed Changes

### Template LoveFlix (`projetoLoveFlix/LoveFlix`)

#### [MODIFY] `home.html`
- Emvolver as seções `<div class="lf-row">` dentro de um contêiner (ex: `<div class="lf-row-wrapper">`).
- Adicionar os botões de seta (`<button class="lf-scroll-left">` e `<button class="lf-scroll-right">`) dentro de cada contêiner.

#### [MODIFY] `css/home.css`
- Criar os estilos para o `lf-row-wrapper` (como `position: relative`).
- Estilizar os botões de scroll: absolutos nas laterais, fundo semi-transparente escuro, ícones visíveis, escondidos por padrão e aparecendo apenas no `:hover` do contêiner (apenas em telas maiores via `@media (min-width: 768px)`).
- Adicionar transições suaves para a exibição das setas.

#### [MODIFY] `js/home.js`
- Adicionar event listeners nos botões de scroll recém-criados para capturar o clique e disparar `element.scrollBy({ left: +/- offset, behavior: 'smooth' })`.
- Adicionar lógica para ocultar a seta da esquerda quando o scroll estiver no início, e ocultar a seta da direita quando chegar ao final (opcional, refinamento de UX).
- Certificar-se de que a função `renderRow` não renderize elementos vazios, caso eles cheguem no `COUPLE_CONFIG`.

### Construtor de Sites (`platform/src/app/builder/components/BuilderForm.tsx`)

#### [MODIFY] `BuilderForm.tsx`
- **Etapas (STEPS)**: Adicionar novos passos para incluir as configurações das seções "Em Alta" e "Linha do Tempo", que atualmente não são editadas no construtor.
- **Campos de Entrada**: Expandir a geração dos campos de 5 para 10 posições em cada uma das seções. Para a "Linha do Tempo", incluir também inputs de título, data e descrição.
- **Filtro de Vazios (Auto-Clean)**: Modificar a função `onFinish` (ou o estado de envio) para varrer os arrays `config.hot`, `config.moments` e `config.timeline` e **remover** completamente qualquer item cujo `src` não tenha sido modificado (ex: não tenha uma imagem real carregada). Isso garante que o JSON salvo não gere espaços fantasmas no site final.

## ✅ Verification Plan

### Testes Manuais
1. **No Construtor (`platform`)**:
   - Abrir o formulário de criação.
   - Preencher apenas 3 fotos na seção de 10 fotos.
   - Finalizar o processo e checar o payload enviado/configuração gerada para garantir que as outras 7 não estão inclusas na configuração final.
2. **No Site Final (`projetoLoveFlix`)**:
   - Inserir as configurações com várias fotos.
   - Acessar pelo Desktop: verificar se as setas aparecem e executam a rolagem corretamente sem quebrar o layout dos cards que usam `scale()` no hover.
   - Acessar pelo Mobile: confirmar se as setas ficam escondidas e a rolagem por toque segue funcionando.
