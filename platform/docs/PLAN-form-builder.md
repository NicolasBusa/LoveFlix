# Plano de Implementação: Construtor de Sites LoveFlix (Formulário + Preview)

**Objetivo:** Criar um fluxo onde o usuário, após clicar em "Garantir meu acesso" nos planos, seja forçado a logar/cadastrar. Em seguida, ele será redirecionado para um ambiente de "Construtor" (`/builder` ou `/create`), contendo um formulário multi-step à esquerda para preencher os dados do site, e um Device Mockup (Celular) à direita exibindo um Preview em tempo real. O design deve seguir um estilo escuro, elegante (padrão Netflix) mantendo a identidade da landing page.

---

## 🛑 PORTÃO SOCRÁTICO (Perguntas em Aberto)

> **Revisão Necessária:** Por favor, responda a estas perguntas cruciais antes de prosseguirmos com a implementação. O plano poderá ser ajustado com base nas suas respostas.

1. **Momento do Pagamento (Checkout):**  
   Você mencionou que ao se cadastrar/logar o usuário vai direto para a tela de preenchimento do formulário. O usuário fará o pagamento *antes* de preencher o formulário (ou seja: Clica em Comprar -> Loga -> Paga no Stripe -> Volta e Preenche), ou ele preenche tudo de graça e na hora de "Publicar/Finalizar" o site é que cobramos (Clica em Comprar -> Loga -> Preenche -> Paga)?
2. **Atualização do Preview em Tempo Real:**  
   O modelo de site original (`LoveFlix`) é feito em HTML puro e o arquivo `couple.js` é estático. Para o preview em tempo real, a melhor abordagem é exibir o site dentro de um `<iframe>` (no lado direito) e enviar os dados do formulário via JavaScript (`postMessage`) para que o site de dentro do celular atualize instantaneamente sem recarregar. Você concorda com essa abordagem?
3. **Upload de Imagens:**  
   O formulário exigirá várias imagens (Hero, Perfil, Momentos, Timeline). Como a conta já estará criada no Supabase, devemos fazer o upload dessas fotos diretamente para um *Storage (Bucket)* do Supabase no momento em que ele selecionar a imagem, ou salvar temporariamente no navegador e só enviar quando ele finalizar todo o formulário? (Fazer upload imediato ao selecionar é mais seguro para não perder o progresso).

---

## 📝 FASES DA IMPLEMENTAÇÃO

### Fase 1: Ajuste de Fluxo e Redirecionamento (Auth)
- Modificar o link "Garantir meu acesso" da página de planos para apontar para a página de Login/Cadastro, passando um parâmetro na URL (ex: `?next=/builder`).
- Garantir que o Middleware e o fluxo de autenticação preservem esse parâmetro e levem o usuário para `/builder` após sucesso no login.

### Fase 2: Layout do Construtor (Split Screen)
- Criar a página `/builder/page.tsx` com layout dividido (50/50 em Desktop, em cascata no Mobile).
- Lado Esquerdo: Container escuro, elegante (border sutis, fundos com transparência, glow vermelho/rosa).
- Lado Direito: Frame de Mockup de um iPhone para acomodar o `iframe`.

### Fase 3: Formulário Multi-Step (Lado Esquerdo)
- Desenvolver um gerenciador de estados (`useState` complexo ou contexto) para abrigar o equivalente ao `COUPLE_CONFIG`.
- Dividir em passos lógicos:
  1. **Nomes & Título:** (person1, person2, coupleTitle, tagline, startDate).
  2. **Textos Principais:** (bio, badges).
  3. **História e Abas:** (historia, momentos, abraços e beijos, carta de amor, detalhes do casal).
  4. **Upload de Imagens:** (Hero, Profile).
  5. **Momentos e Timeline:** Adição dinâmica de fotos e datas.
- Navegação entre passos com botões estilizados (Avançar, Voltar, Concluir).

### Fase 4: Sincronização do Preview (Lado Direito)
- Criar uma rota interna (ex: `/preview-template`) baseada nos estáticos do LoveFlix.
- Modificar o `couple.js` (ou injetar um script no `index.html` do template) para escutar eventos `window.postMessage` que irão sobrescrever a variável `COUPLE_CONFIG` e re-renderizar o DOM virtualmente no preview.
- Cada tecla digitada no React enviará um evento para o Iframe, atualizando a visualização na hora.

### Fase 5: Integração de Dados e Conclusão
- Ao clicar em "Salvar/Publicar", os dados JSON coletados serão inseridos no banco de dados (`tabela: sites`).
- Após sucesso, o usuário é direcionado para o Dashboard ("Meus Presentes") – ou para a tela de checkout (Dependendo da resposta 1).

---

## 🔒 VERIFICAÇÃO

- Garantir que a responsividade funcione (em celulares, o mockup será uma aba separada ou um botão "Ver Preview").
- Nenhum usuário não-autenticado pode acessar a rota `/builder`.
- Garantir que não existam perdas de digitação.
