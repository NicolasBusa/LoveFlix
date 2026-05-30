# Projeto Plataforma Landing Page & Hospedagem de Sites

Este documento é o plano principal (Phase 1) gerado pelo orquestrador para construir a plataforma de vendas e hospedagem de sites surpresa romântica.

## Visão Geral do Projeto
**Projeto Tipo:** WEB (Plataforma Multi-tenant / SaaS)
O sistema não será apenas uma Landing Page, mas uma plataforma completa (SaaS) que:
1. Funciona como Landing Page de vendas para as opções `projetoBase` e `projetoLoveFlix`.
2. Processa pagamentos e captura dados do formulário preenchido pelo cliente.
3. Recebe webhooks do gateway de pagamento.
4. Gera dinamicamente um subdomínio (ex: `joaoemaria.seudominio.com`) para hospedar o site personalizado de forma automática, com proteção por senha.

## Open Questions (Socratic Gate)
Antes de iniciar a implementação (Phase 2), precisamos definir alguns pontos cruciais de arquitetura para suportar um alto volume de usuários:

> [!IMPORTANT]
> **Responda estas perguntas para aprovarmos a arquitetura:**
> 1. **Arquitetura (Multi-tenant vs Deploy Manual):** Recomendo criar uma aplicação **única** (ex: Next.js) que usa *Wildcard Subdomains* (subdomínios curinga). Assim, o webhook apenas salva os dados no banco de dados e o site já está no ar, sem precisar fazer "deploy" manual de novos arquivos a cada venda. Você aprova essa abordagem escalável?
> 2. **Banco de Dados:** Para armazenar os dados dos clientes (textos, links de imagens, senhas de acesso), podemos usar **Supabase** (PostgreSQL) ou **Firebase**. Tem alguma preferência?
> 3. **Gateway de Pagamento:** Qual sistema de pagamento você pretende usar para enviar os webhooks? (ex: Stripe, MercadoPago, Kiwify, Hotmart)?
> 4. **Hospedagem das Imagens:** As imagens enviadas no formulário precisam ser salvas em algum lugar (ex: AWS S3, Cloudinary ou Supabase Storage). Qual abordagem prefere?

## Arquitetura Proposta (Solutioning)

### Tech Stack
- **Frontend/Backend:** Next.js (React) com App Router. Ideal para gerenciar rotas de subdomínios (Middleware) e rotas de API para o webhook.
- **Styling:** TailwindCSS (v4) / CSS Vanilla com design otimizado para mobile-first.
- **Banco de Dados & Storage:** Supabase (PostgreSQL + Object Storage) para guardar usuários, configurações de cada casal e imagens.
- **Hosting:** Vercel (possui suporte nativo e escalável para wildcard subdomains `*.dominio.com`).

### File Structure & System Flow
1. `Landing Page (Root Domain)`: Página principal focada em conversão e formulário de onboarding pós-venda.
2. `API Routes (Webhook)`: Rota `/api/webhook` aguardando a confirmação de pagamento.
3. `Middleware (Subdomain Router)`: Intercepta a requisição, lê o subdomínio, busca no banco de dados e renderiza o template LoveFlix ou Base preenchido com os dados do casal.
4. `Templates`: Componentes React que emulam perfeitamente o `projetoBase` e `projetoLoveFlix`.

## Task Breakdown (Implementação Fase 2)

Quando o plano for aprovado, orquestraremos os seguintes agentes:

### 1. Fundação & Banco de Dados (Agente: `database-architect`)
- `[ ]` **Task 1.1:** Configurar schema do banco de dados (Tabelas: `Casais`, `Templates`, `Transacoes`).
- `[ ]` **Task 1.2:** Configurar bucket de Storage para imagens.

### 2. Backend & Webhooks (Agente: `backend-specialist`)
- `[ ]` **Task 2.1:** Implementar endpoint do Webhook para receber pagamento.
- `[ ]` **Task 2.2:** Criar lógica para gerar o registro do casal, senha e gerar URL do subdomínio.
- `[ ]` **Task 2.3:** Implementar Middleware do Next.js para roteamento de subdomínios.

### 3. Frontend Landing Page (Agente: `frontend-specialist`)
- `[ ]` **Task 3.1:** Desenvolver Landing Page responsiva focada em conversão.
- `[ ]` **Task 3.2:** Integrar o formulário de personalização do casal.

### 4. Integração dos Projetos Vendidos (Agente: `frontend-specialist`)
- `[ ]` **Task 4.1:** Converter `projetoBase` para um template renderizável via React/Next.js.
- `[ ]` **Task 4.2:** Converter `projetoLoveFlix` para um template renderizável via React/Next.js (adaptando o atual `couple.js` para ler do banco).

### 5. Segurança & Testes (Agentes: `security-auditor` & `test-engineer`)
- `[ ]` **Task 5.1:** Garantir que as senhas dos subdomínios estejam protegidas.
- `[ ]` **Task 5.2:** Executar scripts de verificação (Security, UX, Lighthouse).

## Phase X: Verificação Final
- `[ ]` Executar `security_scan.py`
- `[ ]` Testar fluxo E2E: Comprar -> Preencher Formulário -> Acessar Subdomínio.
- `[ ]` Testar Mobile Responsiveness
