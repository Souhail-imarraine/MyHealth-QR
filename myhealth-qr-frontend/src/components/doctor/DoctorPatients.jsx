import { useState, useEffect } from 'react';
import { Users, Search, User, Calendar, FileText, Eye, Loader2, AlertCircle } from 'lucide-react';
import { useTranslation } from '../../utils/useTranslation';
import { useNavigate } from 'react-router-dom';
import { doctorService } from '../../services/doctorService';
import toast from 'react-hot-toast';

const DoctorPatients = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Charger la liste des patients
  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await doctorService.getMyPatients();
      setPatients(response.data || []);
    } catch (err) {
      console.error('Erreur chargement patients:', err);
      setError('Erreur lors du chargement des patients');
      toast.error('Impossible de charger la liste des patients');
    } finally {
      setLoading(false);
    }
  };

  // Filtrer les patients selon le terme de recherche
  const filteredPatients = patients.filter(patient => {
    if (!searchTerm) return true;
    const fullName = `${patient.user?.firstName} ${patient.user?.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  // Calculer l'âge à partir de la date de naissance
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

  // Naviguer vers le dossier médical du patient
  const viewPatientRecord = (patientId) => {
    navigate(`/doctor/patients/${patientId}`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="card bg-gradient-to-br from-accent-50 to-emerald-50">
        <div className="flex items-start gap-3">
          <div className="p-3 bg-white rounded-xl shadow-md">
            <Users className="w-6 h-6 sm:w-7 sm:h-7 text-accent-600" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-1 sm:mb-2">
              {t('myPatients')}
            </h1>
            <p className="text-sm sm:text-base text-secondary-600">
              Liste des patients dont vous avez accès au dossier médical
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <div className="card bg-gradient-to-br from-accent-50 to-white text-center">
          <p className="text-3xl sm:text-4xl font-bold text-accent-600">{patients.length}</p>
          <p className="text-xs sm:text-sm text-secondary-600 mt-1">Total</p>
        </div>
        <div className="card bg-gradient-to-br from-emerald-50 to-white text-center">
          <p className="text-3xl sm:text-4xl font-bold text-emerald-600">{patients.length}</p>
          <p className="text-xs sm:text-sm text-secondary-600 mt-1">Actifs</p>
        </div>
        <div className="card bg-gradient-to-br from-purple-50 to-white text-center">
          <p className="text-3xl sm:text-4xl font-bold text-purple-600">
            {patients.filter(p => {
              const lastVisit = new Date(p.updatedAt);
              const now = new Date();
              const diffTime = Math.abs(now - lastVisit);
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              return diffDays <= 30;
            }).length}
          </p>
          <p className="text-xs sm:text-sm text-secondary-600 mt-1">Ce mois</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
            <input
              type="text"
              placeholder="Rechercher un patient..."
              className="input ltr:pl-10 rtl:pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={loadPatients}
            className="btn btn-outline text-sm sm:text-base"
          >
            Actualiser
          </button>
        </div>
      </div>

      {/* Patients List */}
      <div className="card">
        <h2 className="text-lg sm:text-xl font-bold text-secondary-900 mb-4">
          Liste des patients ({filteredPatients.length})
        </h2>

        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="w-12 h-12 text-accent-600 animate-spin mx-auto mb-4" />
            <p className="text-secondary-600">Chargement des patients...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <p className="text-red-600 font-semibold mb-2">{error}</p>
            <button 
              onClick={loadPatients}
              className="btn btn-outline mt-4"
            >
              Réessayer
            </button>
          </div>
        ) : filteredPatients.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 sm:w-10 sm:h-10 text-secondary-400" />
            </div>
            <p className="text-secondary-500 text-sm sm:text-base">
              {searchTerm ? 'Aucun patient trouvé' : 'Aucun patient pour le moment'}
            </p>
            <p className="text-secondary-400 text-xs sm:text-sm mt-2">
              {searchTerm ? 'Essayez une autre recherche' : 'Scannez un QR code pour ajouter votre premier patient'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-secondary-200 rounded-xl hover:bg-secondary-50 hover:border-accent-300 transition-all cursor-pointer active:scale-[0.98]"
                onClick={() => viewPatientRecord(patient.id)}
              >
                <div className="flex items-start gap-3 mb-3 sm:mb-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg">
                    {patient.user?.firstName?.charAt(0) || 'P'}
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900 text-sm sm:text-base">
                      {patient.user?.firstName} {patient.user?.lastName}
                    </h3>
                    <p className="text-xs sm:text-sm text-secondary-600 flex items-center gap-1 mt-1">
                      <User className="w-3 h-3 sm:w-4 sm:h-4" />
                      {calculateAge(patient.birthDate)} ans
                    </p>
                    <p className="text-xs text-secondary-500 flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      Dernière activité: {new Date(patient.updatedAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      viewPatientRecord(patient.id);
                    }}
                    className="btn bg-gradient-to-r from-accent-500 to-emerald-500 hover:from-accent-600 hover:to-emerald-600 text-white text-xs sm:text-sm flex-1 sm:flex-none"
                  >
                    <Eye className="w-4 h-4 ltr:mr-1 rtl:ml-1" />
                    Consulter
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorPatients;
