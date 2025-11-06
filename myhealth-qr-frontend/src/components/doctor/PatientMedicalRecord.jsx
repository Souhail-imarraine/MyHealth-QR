import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  Calendar,
  Phone,
  Mail,
  FileText,
  Activity,
  Pill,
  Stethoscope,
  AlertCircle,
  Loader2,
  Plus,
  Clock,
  Building2
} from 'lucide-react';
import { doctorService } from '../../services/doctorService';
import toast from 'react-hot-toast';

const PatientMedicalRecord = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddRecord, setShowAddRecord] = useState(false);

  useEffect(() => {
    loadPatientRecord();
  }, [patientId]);

  const loadPatientRecord = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await doctorService.getPatientMedicalRecord(patientId);
      setPatient(response.data);
    } catch (err) {
      console.error('Erreur chargement dossier:', err);
      setError(err.response?.data?.message || 'Erreur lors du chargement du dossier médical');
      toast.error('Impossible de charger le dossier médical');
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return 'N/A';
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="card text-center py-12">
          <Loader2 className="w-12 h-12 text-accent-600 animate-spin mx-auto mb-4" />
          <p className="text-secondary-600">Chargement du dossier médical...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="card text-center py-12">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-red-600 font-semibold mb-2">{error}</p>
          <div className="flex gap-3 justify-center mt-4">
            <button onClick={() => navigate('/doctor/patients')} className="btn btn-outline">
              Retour aux patients
            </button>
            <button onClick={loadPatientRecord} className="btn btn-primary">
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!patient) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header avec bouton retour */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/doctor/patients')}
          className="btn btn-outline p-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-secondary-900">
          Dossier Médical
        </h1>
      </div>

      {/* Informations du patient */}
      <div className="card bg-gradient-to-br from-accent-50 to-emerald-50">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
            {patient.user?.firstName?.charAt(0) || 'P'}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-secondary-900 mb-2">
              {patient.user?.firstName} {patient.user?.lastName}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-secondary-600">
                <User className="w-4 h-4" />
                <span className="text-sm">
                  {calculateAge(patient.birthDate)} ans
                  {patient.gender && ` • ${patient.gender === 'male' ? 'Homme' : patient.gender === 'female' ? 'Femme' : 'Autre'}`}
                </span>
              </div>
              <div className="flex items-center gap-2 text-secondary-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">
                  Né(e) le {patient.birthDate ? new Date(patient.birthDate).toLocaleDateString('fr-FR') : 'N/A'}
                </span>
              </div>
              {patient.user?.phone && (
                <div className="flex items-center gap-2 text-secondary-600">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{patient.user.phone}</span>
                </div>
              )}
              {patient.user?.email && (
                <div className="flex items-center gap-2 text-secondary-600">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{patient.user.email}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Informations supplémentaires */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-100 rounded-lg">
              <Activity className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="font-semibold text-secondary-900">Groupe Sanguin</h3>
          </div>
          <p className="text-2xl font-bold text-accent-600">
            {patient.bloodType || 'Non renseigné'}
          </p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="font-semibold text-secondary-900">Allergies</h3>
          </div>
          <p className="text-sm text-secondary-600">
            {patient.allergies || 'Aucune allergie connue'}
          </p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Pill className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-secondary-900">Maladies Chroniques</h3>
          </div>
          <p className="text-sm text-secondary-600">
            {patient.chronicDiseases || 'Aucune maladie chronique'}
          </p>
        </div>
      </div>

      {/* Historique médical */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-accent-100 rounded-xl">
              <FileText className="w-6 h-6 text-accent-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-secondary-900">
                Historique Médical
              </h2>
              <p className="text-sm text-secondary-600">
                {patient.medicalRecords?.length || 0} consultation(s)
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAddRecord(true)}
            className="btn bg-gradient-to-r from-accent-500 to-emerald-500 hover:from-accent-600 hover:to-emerald-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter
          </button>
        </div>

        {/* Liste des consultations */}
        {!patient.medicalRecords || patient.medicalRecords.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-secondary-400" />
            </div>
            <p className="text-secondary-500">Aucun dossier médical pour le moment</p>
            <p className="text-secondary-400 text-sm mt-2">
              Ajoutez une consultation pour commencer
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {patient.medicalRecords.map((record) => (
              <div
                key={record.id}
                className="border border-secondary-200 rounded-xl p-4 hover:bg-secondary-50 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <Stethoscope className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900">
                        {record.diagnosis || 'Consultation'}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-secondary-500 mt-1">
                        <Clock className="w-3 h-3" />
                        {new Date(record.visitDate).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {record.symptoms && (
                  <div className="mb-3">
                    <p className="text-sm font-semibold text-secondary-700 mb-1">
                      Symptômes:
                    </p>
                    <p className="text-sm text-secondary-600">{record.symptoms}</p>
                  </div>
                )}

                {record.treatment && (
                  <div className="mb-3">
                    <p className="text-sm font-semibold text-secondary-700 mb-1">
                      Traitement:
                    </p>
                    <p className="text-sm text-secondary-600">{record.treatment}</p>
                  </div>
                )}

                {record.notes && (
                  <div>
                    <p className="text-sm font-semibold text-secondary-700 mb-1">
                      Notes:
                    </p>
                    <p className="text-sm text-secondary-600">{record.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientMedicalRecord;
