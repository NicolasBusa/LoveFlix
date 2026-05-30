# Planejamento: Checkout Stripe (LoveFlix)

Este plano detalha a implementação do fluxo de checkout do Stripe para a criação do site (LoveFlix), conectando o construtor do site ao webhook já existente (`api/webhook/stripe/route.ts`).

## User Review Required

> [!IMPORTANT]
> **Fluxo de Sessão de Checkout Dinâmica**
> Como o seu webhook espera receber `metadata.subdomain` e `metadata.template_id` no evento `checkout.session.completed`, **precisamos criar Sessões de Checkout dinâmicas** (via API) em vez de usar Payment Links estáticos. 
> 
> Dessa forma, quando o usuário preencher o formulário e clicar em "Pagar / Criar Site", enviaremos os dados do subdomínio para uma nova rota `/api/checkout`, que gerará a sessão no Stripe e redirecionará o usuário.

## Open Questions

> [!WARNING]
> Responda a estas questões (Socratic Gate) para que eu possa executar a configuração exata:
> 1. **Qual é o preço e a moeda** que devemos configurar no Stripe para a criação deste site? (Eu criarei o Produto e o Preço automaticamente via Stripe MCP durante a execução).
> 2. **Nome do Produto:** Qual será o nome oficial do produto no Stripe? (ex: "Criação de Site LoveFlix", "Surpresa Romântica").
> 3. **Redirecionamento:** Para onde o usuário deve ser redirecionado após o sucesso do pagamento? (Ex: `/sucesso` no seu domínio atual)

## Proposed Changes

### 1. Configuração do Stripe (Via MCP)
- Usarei `mcp_stripe_create_product` e `mcp_stripe_create_price` para criar o produto no Stripe com base nas suas respostas.
- O `price_id` gerado será salvo no `.env.local` da aplicação.

### 2. Backend (Next.js API)

#### [NEW] platform/src/app/api/checkout/route.ts
- Rota POST que recebe os dados do construtor (`subdomain`, `template_id`, etc).
- Inicializa o SDK do Stripe e chama `stripe.checkout.sessions.create()`.
- Passa os dados recebidos no objeto `metadata` da sessão para que o Webhook possa lê-los posteriormente.
- Retorna a `url` da sessão do Stripe.

### 3. Frontend (React / Construtor)

#### [MODIFY] Integração no Construtor de Sites
- (A definir baseado em onde o botão "Finalizar" está atualmente).
- Modificar o fluxo de finalização para:
  1. Validar os dados.
  2. Chamar `POST /api/checkout`.
  3. Redirecionar `window.location.href = sessionUrl`.

#### [NEW] platform/src/app/sucesso/page.tsx
- Criar uma tela de sucesso para onde o usuário volta após o pagamento. 
- Esta tela orientará o usuário a checar o e-mail ou aguardar a liberação do site (que é processada em background pelo webhook).

## Verification Plan

### Automated / Manual Verification
1. Verificarei a criação correta do produto no painel usando o Stripe MCP.
2. Usaremos o Stripe em modo de teste para simular o preenchimento do construtor, redirecionamento para o Checkout e preenchimento de um cartão de teste (ex: `4242 4242...`).
3. Validarei se o Webhook dispara corretamente e a linha é inserida na tabela `couples` com o `subdomain` e `access_token`.
