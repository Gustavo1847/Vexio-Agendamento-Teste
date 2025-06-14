import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Alert,
  Snackbar,
  CircularProgress,
  Paper,
  useTheme,
  useMediaQuery,
  Fab,
  Dialog,
  DialogContent
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { Patient, PatientFormData } from '../types/Patient';
import { PatientService } from '../services/patientService';
import { PatientForm } from './PatientForm';
import { PatientTable } from './PatientTable';

export const Dashboard: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [showMobileForm, setShowMobileForm] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const loadPatients = async () => {
    try {
      setLoading(true);
      const data = await PatientService.getAllPatients();
      setPatients(data);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar pacientes';
      setError(errorMessage);
      console.error('Error loading patients:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleCreatePatient = async (patientData: PatientFormData) => {
    try {
      const newPatient = await PatientService.createPatient(patientData);
      setPatients(prev => [newPatient, ...prev]);
      setSuccess('Paciente cadastrado com sucesso!');
      if (isMobile) {
        setShowMobileForm(false);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao cadastrar paciente';
      setError(errorMessage);
      console.error('Error creating patient:', err);
      throw err; // Re-throw to handle in form
    }
  };

  const handleUpdatePatient = async (patientData: PatientFormData) => {
    if (!editingPatient?.id) return;

    try {
      const updatedPatient = await PatientService.updatePatient(editingPatient.id, patientData);
      setPatients(prev => 
        prev.map(patient => 
          patient.id === editingPatient.id ? updatedPatient : patient
        )
      );
      setSuccess('Paciente atualizado com sucesso!');
      setEditingPatient(null);
      if (isMobile) {
        setShowMobileForm(false);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar paciente';
      setError(errorMessage);
      console.error('Error updating patient:', err);
      throw err; // Re-throw to handle in form
    }
  };

  const handleDeletePatient = async (id: number) => {
    try {
      await PatientService.deletePatient(id);
      setPatients(prev => prev.filter(patient => patient.id !== id));
      setSuccess('Paciente excluído com sucesso!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao excluir paciente';
      setError(errorMessage);
      console.error('Error deleting patient:', err);
      throw err; // Re-throw to handle in table
    }
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    if (isMobile) {
      setShowMobileForm(true);
    }
  };

  const handleCancelEdit = () => {
    setEditingPatient(null);
    if (isMobile) {
      setShowMobileForm(false);
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
    setSuccess(null);
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sistema de Cadastro de Pacientes
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Gerenciamento completo de informações dos pacientes
        </Typography>
      </Box>

      {isMobile ? (
        // Mobile Layout
        <Box>
          <PatientTable
            patients={patients}
            onEdit={handleEditPatient}
            onDelete={handleDeletePatient}
            loading={loading}
          />

          {/* Floating Action Button */}
          <Fab
            color="primary"
            aria-label="adicionar paciente"
            sx={{
              position: 'fixed',
              bottom: 16,
              right: 16,
            }}
            onClick={() => {
              setEditingPatient(null);
              setShowMobileForm(true);
            }}
          >
            <AddIcon />
          </Fab>

          {/* Mobile Form Dialog */}
          <Dialog
            open={showMobileForm}
            onClose={handleCancelEdit}
            fullScreen
            sx={{
              '& .MuiDialog-paper': {
                m: 0,
                maxHeight: '100vh',
              },
            }}
          >
            <DialogContent sx={{ p: 0 }}>
              <Container maxWidth="md" sx={{ py: 2 }}>
                <PatientForm
                  patient={editingPatient}
                  onSubmit={editingPatient ? handleUpdatePatient : handleCreatePatient}
                  onCancel={handleCancelEdit}
                  isEditing={!!editingPatient}
                />
              </Container>
            </DialogContent>
          </Dialog>
        </Box>
      ) : (
        // Desktop Layout
        <Grid container spacing={3}>
          {/* Form Column */}
          <Grid item xs={12} lg={5}>
            <PatientForm
              patient={editingPatient}
              onSubmit={editingPatient ? handleUpdatePatient : handleCreatePatient}
              onCancel={editingPatient ? handleCancelEdit : undefined}
              isEditing={!!editingPatient}
            />
          </Grid>

          {/* Table Column */}
          <Grid item xs={12} lg={7}>
            <PatientTable
              patients={patients}
              onEdit={handleEditPatient}
              onDelete={handleDeletePatient}
              loading={loading}
            />
          </Grid>
        </Grid>
      )}

      {/* Error/Success Snackbars */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" variant="filled">
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!success}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" variant="filled">
          {success}
        </Alert>
      </Snackbar>
    </Container>
  );
};