-- ==========================================
-- Schema Database SaaS Landing Page (Supabase)
-- ==========================================

-- Tabela de Templates disponíveis
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL UNIQUE, -- 'projetoBase' ou 'projetoLoveFlix'
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Casais / Sites Hospedados
CREATE TABLE couples (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subdomain VARCHAR(100) NOT NULL UNIQUE, -- ex: 'joaoemaria'
  password VARCHAR(255) NOT NULL, -- Senha de acesso ao site
  template_id UUID REFERENCES templates(id),
  access_token VARCHAR(255) UNIQUE, -- Token seguro para acessar o site
  
  
  -- Informações Genéricas do Casal
  couple_title VARCHAR(255), -- Ex: "João & Maria"
  hero_image_url TEXT,
  profile_image_url TEXT,
  
  -- Dados específicos em formato JSONB para facilitar flexibilidade
  -- Ex: configurações específicas do LoveFlix (vídeos, histórias adicionais)
  custom_data JSONB DEFAULT '{}'::jsonb,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index para busca rápida por subdomínio (Usado no Middleware)
CREATE INDEX idx_couples_subdomain ON couples(subdomain);

-- Tabela de Transações / Webhook Stripe
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id VARCHAR(255) UNIQUE NOT NULL,
  couple_id UUID REFERENCES couples(id),
  amount_total INTEGER NOT NULL, -- Em centavos
  currency VARCHAR(10) DEFAULT 'BRL',
  payment_status VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- Inserção de Dados Iniciais
-- ==========================================
INSERT INTO templates (name, description) VALUES
('projetoBase', 'Template Clássico Elegante'),
('projetoLoveFlix', 'Template Temático Netflix Romântico');
