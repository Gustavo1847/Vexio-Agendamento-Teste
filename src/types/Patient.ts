export interface Patient {
  id?: number;
  registro_antigo?: string;
  data_cadastro?: string;
  nome_completo: string;
  observacoes?: string;
  sexo?: 'Masculino' | 'Feminino' | 'Outro';
  cirurgiao_dentista?: string;
  data_nascimento?: string;
  estado_civil?: string;
  telefone_residencial?: string;
  celular?: string;
  telefone_comercial?: string;
  email?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  cpf?: string;
  rg?: string;
  convenio?: string;
  plano?: string;
  especialidades?: string[];
  indicacao?: string;
}

export interface PatientFormData extends Omit<Patient, 'id' | 'data_cadastro'> {}

export interface PatientListResponse {
  data: Patient[] | null;
  error: any;
}