import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  OutlinedInput,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material';
import { Patient, PatientFormData } from '../types/Patient';
import { validateCPF, validateEmail, formatCPF, formatCEP, formatPhone } from '../utils/validation';

interface PatientFormProps {
  patient?: Patient | null;
  onSubmit: (data: PatientFormData) => Promise<void>;
  onCancel?: () => void;
  isEditing?: boolean;
}

const ESPECIALIDADES = [
  'Ortodontia',
  'Endodontia',
  'Periodontia',
  'Implantodontia',
  'Prótese Dentária',
  'Cirurgia Oral',
  'Odontopediatria',
  'Dentística',
  'Radiologia Oral'
];

const ESTADOS_CIVIS = [
  'Solteiro(a)',
  'Casado(a)',
  'Divorciado(a)',
  'Viúvo(a)',
  'Separado(a)',
  'União Estável'
];

const ESTADOS_BRASIL = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

export const PatientForm: React.FC<PatientFormProps> = ({
  patient,
  onSubmit,
  onCancel,
  isEditing = false
}) => {
  const [formData, setFormData] = useState<PatientFormData>({
    nome_completo: '',
    observacoes: '',
    sexo: undefined,
    cirurgiao_dentista: '',
    data_nascimento: '',
    estado_civil: '',
    telefone_residencial: '',
    celular: '',
    telefone_comercial: '',
    email: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    cpf: '',
    rg: '',
    convenio: '',
    plano: '',
    especialidades: [],
    indicacao: '',
    registro_antigo: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (patient) {
      setFormData({
        nome_completo: patient.nome_completo || '',
        observacoes: patient.observacoes || '',
        sexo: patient.sexo,
        cirurgiao_dentista: patient.cirurgiao_dentista || '',
        data_nascimento: patient.data_nascimento || '',
        estado_civil: patient.estado_civil || '',
        telefone_residencial: patient.telefone_residencial || '',
        celular: patient.celular || '',
        telefone_comercial: patient.telefone_comercial || '',
        email: patient.email || '',
        endereco: patient.endereco || '',
        numero: patient.numero || '',
        complemento: patient.complemento || '',
        bairro: patient.bairro || '',
        cidade: patient.cidade || '',
        estado: patient.estado || '',
        cep: patient.cep || '',
        cpf: patient.cpf || '',
        rg: patient.rg || '',
        convenio: patient.convenio || '',
        plano: patient.plano || '',
        especialidades: patient.especialidades || [],
        indicacao: patient.indicacao || '',
        registro_antigo: patient.registro_antigo || ''
      });
    }
  }, [patient]);

  const handleInputChange = (field: keyof PatientFormData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let value = event.target.value;

    // Apply formatting for specific fields
    if (field === 'cpf') {
      value = formatCPF(value);
    } else if (field === 'cep') {
      value = formatCEP(value);
    } else if (field === 'telefone_residencial' || field === 'celular' || field === 'telefone_comercial') {
      value = formatPhone(value);
    }

    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSelectChange = (field: keyof PatientFormData) => (
    event: any
  ) => {
    setFormData(prev => ({ ...prev, [field]: event.target.value }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!formData.nome_completo.trim()) {
      newErrors.nome_completo = 'Nome completo é obrigatório';
    }

    // CPF validation
    if (formData.cpf && !validateCPF(formData.cpf)) {
      newErrors.cpf = 'CPF inválido';
    }

    // Email validation
    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
      if (!isEditing) {
        // Reset form for new entries
        setFormData({
          nome_completo: '',
          observacoes: '',
          sexo: undefined,
          cirurgiao_dentista: '',
          data_nascimento: '',
          estado_civil: '',
          telefone_residencial: '',
          celular: '',
          telefone_comercial: '',
          email: '',
          endereco: '',
          numero: '',
          complemento: '',
          bairro: '',
          cidade: '',
          estado: '',
          cep: '',
          cpf: '',
          rg: '',
          convenio: '',
          plano: '',
          especialidades: [],
          indicacao: '',
          registro_antigo: ''
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader 
        title={
          <Typography variant="h6" component="h2">
            {isEditing ? 'Editar Paciente' : 'Cadastro de Paciente'}
          </Typography>
        }
      />
      <CardContent>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Dados Pessoais */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" color="primary" gutterBottom>
                Dados Pessoais
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nome Completo *"
                value={formData.nome_completo}
                onChange={handleInputChange('nome_completo')}
                error={!!errors.nome_completo}
                helperText={errors.nome_completo}
                required
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Sexo</InputLabel>
                <Select
                  value={formData.sexo || ''}
                  onChange={handleSelectChange('sexo')}
                  label="Sexo"
                >
                  <MenuItem value="Masculino">Masculino</MenuItem>
                  <MenuItem value="Feminino">Feminino</MenuItem>
                  <MenuItem value="Outro">Outro</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Data de Nascimento"
                type="date"
                value={formData.data_nascimento}
                onChange={handleInputChange('data_nascimento')}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="CPF"
                value={formData.cpf}
                onChange={handleInputChange('cpf')}
                error={!!errors.cpf}
                helperText={errors.cpf}
                inputProps={{ maxLength: 14 }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="RG"
                value={formData.rg}
                onChange={handleInputChange('rg')}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Estado Civil</InputLabel>
                <Select
                  value={formData.estado_civil || ''}
                  onChange={handleSelectChange('estado_civil')}
                  label="Estado Civil"
                >
                  {ESTADOS_CIVIS.map(estado => (
                    <MenuItem key={estado} value={estado}>{estado}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Contato */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" color="primary" gutterBottom>
                Contato
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Telefone Residencial"
                value={formData.telefone_residencial}
                onChange={handleInputChange('telefone_residencial')}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Celular"
                value={formData.celular}
                onChange={handleInputChange('celular')}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Telefone Comercial"
                value={formData.telefone_comercial}
                onChange={handleInputChange('telefone_comercial')}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>

            {/* Endereço */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" color="primary" gutterBottom>
                Endereço
              </Typography>
            </Grid>

            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Endereço"
                value={formData.endereco}
                onChange={handleInputChange('endereco')}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="Número"
                value={formData.numero}
                onChange={handleInputChange('numero')}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="CEP"
                value={formData.cep}
                onChange={handleInputChange('cep')}
                inputProps={{ maxLength: 9 }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Complemento"
                value={formData.complemento}
                onChange={handleInputChange('complemento')}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Bairro"
                value={formData.bairro}
                onChange={handleInputChange('bairro')}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Cidade"
                value={formData.cidade}
                onChange={handleInputChange('cidade')}
              />
            </Grid>

            <Grid item xs={12} md={1}>
              <FormControl fullWidth>
                <InputLabel>UF</InputLabel>
                <Select
                  value={formData.estado || ''}
                  onChange={handleSelectChange('estado')}
                  label="UF"
                >
                  {ESTADOS_BRASIL.map(estado => (
                    <MenuItem key={estado} value={estado}>{estado}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Informações Profissionais */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" color="primary" gutterBottom>
                Informações Profissionais
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Cirurgião Dentista"
                value={formData.cirurgiao_dentista}
                onChange={handleInputChange('cirurgiao_dentista')}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Especialidades</InputLabel>
                <Select
                  multiple
                  value={formData.especialidades || []}
                  onChange={handleSelectChange('especialidades')}
                  input={<OutlinedInput label="Especialidades" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {(selected as string[]).map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {ESPECIALIDADES.map(esp => (
                    <MenuItem key={esp} value={esp}>{esp}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Convênio"
                value={formData.convenio}
                onChange={handleInputChange('convenio')}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Plano"
                value={formData.plano}
                onChange={handleInputChange('plano')}
              />
            </Grid>

            {/* Outras Informações */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" color="primary" gutterBottom>
                Outras Informações
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Registro Antigo"
                value={formData.registro_antigo}
                onChange={handleInputChange('registro_antigo')}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Indicação"
                value={formData.indicacao}
                onChange={handleInputChange('indicacao')}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Observações"
                multiline
                rows={3}
                value={formData.observacoes}
                onChange={handleInputChange('observacoes')}
              />
            </Grid>

            {/* Buttons */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                {onCancel && (
                  <Button variant="outlined" onClick={onCancel}>
                    Cancelar
                  </Button>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : undefined}
                >
                  {loading ? 'Salvando...' : (isEditing ? 'Atualizar' : 'Cadastrar')}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};