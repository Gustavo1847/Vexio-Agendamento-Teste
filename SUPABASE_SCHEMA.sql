-- Supabase SQL Schema for Dental Office System
-- Execute this SQL in your Supabase SQL Editor

-- Create pacientes table
CREATE TABLE IF NOT EXISTS pacientes (
    id SERIAL PRIMARY KEY,
    registro_antigo TEXT,
    data_cadastro TIMESTAMP DEFAULT NOW(),
    nome_completo TEXT NOT NULL,
    observacoes TEXT,
    sexo TEXT CHECK (sexo IN ('Masculino', 'Feminino', 'Outro')),
    cirurgiao_dentista TEXT,
    data_nascimento DATE,
    estado_civil TEXT,
    telefone_residencial TEXT,
    celular TEXT,
    telefone_comercial TEXT,
    email TEXT,
    endereco TEXT,
    numero TEXT,
    complemento TEXT,
    bairro TEXT,
    cidade TEXT,
    estado TEXT,
    cep TEXT,
    cpf TEXT,
    rg TEXT,
    convenio TEXT,
    plano TEXT,
    especialidades TEXT[], -- array with specialties
    indicacao TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_pacientes_nome ON pacientes(nome_completo);
CREATE INDEX IF NOT EXISTS idx_pacientes_cpf ON pacientes(cpf);
CREATE INDEX IF NOT EXISTS idx_pacientes_data_cadastro ON pacientes(data_cadastro);

-- Enable Row Level Security (RLS)
ALTER TABLE pacientes ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for authenticated users
-- Note: In production, you should create more restrictive policies
CREATE POLICY "Allow all operations for authenticated users" ON pacientes
    FOR ALL USING (auth.role() = 'authenticated');

-- Allow public access (remove this in production and use proper authentication)
CREATE POLICY "Allow all operations for anonymous users" ON pacientes
    FOR ALL USING (true);