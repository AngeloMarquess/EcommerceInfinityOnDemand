-- Execute este script no SQL Editor do seu painel Supabase

-- Cria a tabela de capturas (leads)
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  data_cadastro TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilita Row Level Security (RLS) para segurança
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Permite que qualquer visitante insira (adicione) leads de forma anônima
CREATE POLICY "Permitir inserções anônimas" 
ON leads FOR INSERT 
TO anon
WITH CHECK (true);

-- Permite que você leia (Selecione) todos os leads carregados na tela local usando a key anônima
CREATE POLICY "Permitir leitura pública" 
ON leads FOR SELECT 
TO anon 
USING (true);

-- Permite que você delete leads pelo botão de Lixeira no Admin
CREATE POLICY "Permitir deletar leads"
ON leads FOR DELETE
TO anon
USING (true);
