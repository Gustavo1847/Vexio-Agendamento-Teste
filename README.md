# Sistema de Cadastro de Pacientes - Dental Office

Sistema completo de gestão de pacientes inspirado no Dental Office, desenvolvido com React, TypeScript, Material-UI e Supabase.

## 🚀 Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript
- **UI**: Material-UI (MUI) v5
- **Backend**: Supabase (PostgreSQL)
- **HTTP Client**: Axios
- **Estilização**: Material-UI Components

## 📋 Funcionalidades

- ✅ Cadastro completo de pacientes com validação
- ✅ Listagem e busca de pacientes
- ✅ Edição e exclusão de pacientes
- ✅ Interface responsiva (desktop e mobile)
- ✅ Validação de CPF e email
- ✅ Formatação automática de campos (CPF, CEP, telefone)
- ✅ Mensagens de sucesso e erro
- ✅ Loading states
- ✅ Interface em português (pt-BR)

## 🗃️ Estrutura do Banco de Dados

### Tabela: pacientes

```sql
- id: serial PRIMARY KEY
- registro_antigo: text
- data_cadastro: timestamp DEFAULT now()
- nome_completo: text NOT NULL
- observacoes: text
- sexo: text CHECK (sexo IN ('Masculino', 'Feminino', 'Outro'))
- cirurgiao_dentista: text
- data_nascimento: date
- estado_civil: text
- telefone_residencial: text
- celular: text
- telefone_comercial: text
- email: text
- endereco: text
- numero: text
- complemento: text
- bairro: text
- cidade: text
- estado: text
- cep: text
- cpf: text
- rg: text
- convenio: text
- plano: text
- especialidades: text[] -- array com especialidades
- indicacao: text
```

## 🛠️ Configuração

### 1. Configurar Supabase

1. Crie uma conta no [Supabase](https://supabase.com)
2. Crie um novo projeto
3. Execute o script SQL que está em `SUPABASE_SCHEMA.sql` no SQL Editor do Supabase
4. Obtenha a URL e chave API do seu projeto

### 2. Configurar Variáveis de Ambiente

Edite o arquivo `.env` na raiz do projeto:

```env
REACT_APP_SUPABASE_URL=sua_url_do_supabase
REACT_APP_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

### 3. Instalar Dependências

```bash
npm install
```

### 4. Executar o Projeto

```bash
npm start
```

O projeto será executado em `http://localhost:3000`

## 📱 Interface

### Desktop
- **Layout em duas colunas**: Formulário à esquerda, tabela à direita
- **Formulário completo** com todos os campos organizados por seções
- **Tabela responsiva** com paginação e busca

### Mobile
- **Layout adaptativo** com formulário em modal fullscreen
- **Cards responsivos** para listagem de pacientes
- **Floating Action Button** para adicionar novos pacientes

## 🔧 Estrutura do Projeto

```
src/
├── components/
│   ├── Dashboard.tsx       # Componente principal
│   ├── PatientForm.tsx     # Formulário de pacientes
│   └── PatientTable.tsx    # Tabela de pacientes
├── services/
│   ├── supabase.ts         # Cliente Supabase
│   └── patientService.ts   # Serviços CRUD
├── types/
│   └── Patient.ts          # Interfaces TypeScript
└── utils/
    └── validation.ts       # Funções de validação
```

## 🎯 Funcionalidades Específicas

### Validações
- **CPF**: Validação completa do algoritmo do CPF
- **Email**: Validação de formato de email
- **Campos obrigatórios**: Nome completo é obrigatório

### Formatação
- **CPF**: Formatação automática (xxx.xxx.xxx-xx)
- **CEP**: Formatação automática (xxxxx-xxx)
- **Telefones**: Formatação automática com DDD

### Campos Especiais
- **Especialidades**: Seleção múltipla com chips
- **Estados**: Dropdown com UFs do Brasil
- **Estado Civil**: Dropdown com opções pré-definidas
- **Sexo**: Dropdown com opções

## 📝 Scripts Disponíveis

- `npm start`: Executa o projeto em modo desenvolvimento
- `npm run build`: Cria build de produção
- `npm test`: Executa os testes
- `npm run eject`: Ejeta as configurações do Create React App

## 🔒 Segurança

O projeto usa Row Level Security (RLS) do Supabase. Para produção, configure políticas mais restritivas de acordo com suas necessidades de autenticação.

## 📄 Licença

Este projeto é para fins educacionais e de demonstração.

---

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time.