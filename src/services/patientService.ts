import { supabase } from './supabase';
import { Patient, PatientFormData } from '../types/Patient';

export class PatientService {
  static async getAllPatients(): Promise<Patient[]> {
    try {
      const { data, error } = await supabase
        .from('pacientes')
        .select('*')
        .order('data_cadastro', { ascending: false });

      if (error) {
        console.error('Error fetching patients:', error);
        throw new Error(`Erro ao buscar pacientes: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      console.error('Service error:', error);
      throw error;
    }
  }

  static async getPatientById(id: number): Promise<Patient | null> {
    try {
      const { data, error } = await supabase
        .from('pacientes')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching patient:', error);
        throw new Error(`Erro ao buscar paciente: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Service error:', error);
      throw error;
    }
  }

  static async createPatient(patientData: PatientFormData): Promise<Patient> {
    try {
      const { data, error } = await supabase
        .from('pacientes')
        .insert([patientData])
        .select()
        .single();

      if (error) {
        console.error('Error creating patient:', error);
        throw new Error(`Erro ao criar paciente: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Service error:', error);
      throw error;
    }
  }

  static async updatePatient(id: number, patientData: Partial<PatientFormData>): Promise<Patient> {
    try {
      const { data, error } = await supabase
        .from('pacientes')
        .update(patientData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating patient:', error);
        throw new Error(`Erro ao atualizar paciente: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Service error:', error);
      throw error;
    }
  }

  static async deletePatient(id: number): Promise<void> {
    try {
      const { error } = await supabase
        .from('pacientes')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting patient:', error);
        throw new Error(`Erro ao excluir paciente: ${error.message}`);
      }
    } catch (error) {
      console.error('Service error:', error);
      throw error;
    }
  }

  static async searchPatients(searchTerm: string): Promise<Patient[]> {
    try {
      const { data, error } = await supabase
        .from('pacientes')
        .select('*')
        .or(`nome_completo.ilike.%${searchTerm}%,cpf.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`)
        .order('data_cadastro', { ascending: false });

      if (error) {
        console.error('Error searching patients:', error);
        throw new Error(`Erro ao buscar pacientes: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      console.error('Service error:', error);
      throw error;
    }
  }
}