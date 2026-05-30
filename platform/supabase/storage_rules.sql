-- ==========================================
-- Configuração de Storage e RLS (Supabase)
-- ==========================================

-- 1. Criar o bucket "couple-images" (deve ser feito via Painel, mas as regras podem ser SQL)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('couple-images', 'couple-images', true);

-- 2. Políticas de Segurança (Row Level Security - RLS)

-- Habilitar RLS
ALTER TABLE couples ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

-- Templates: Leitura Pública
CREATE POLICY "Templates são públicos para leitura"
ON templates FOR SELECT
TO public
USING (true);

-- Couples: Leitura apenas via API (Service Role) no Middleware
-- O Middleware do Next.js usará a Service Key (não anon key) para ler os dados do subdomínio
CREATE POLICY "Couples podem ser lidos pela Service Role"
ON couples FOR SELECT
TO service_role
USING (true);

-- Storage: Imagens públicas para leitura
CREATE POLICY "Imagens do casal são públicas"
ON storage.objects FOR SELECT
TO public
USING ( bucket_id = 'couple-images' );

-- Storage: Upload via API do Next.js (Service Role)
CREATE POLICY "Apenas a API autenticada pode fazer upload"
ON storage.objects FOR INSERT
TO service_role
WITH CHECK ( bucket_id = 'couple-images' );
