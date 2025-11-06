import { Users, Search, User, Calendar, FileText, Eye } from 'lucide-react';
import { useTranslation } from '../../utils/useTranslation';

const DoctorPatients = () => {
  const { t } = useTranslation();

  // Exemple de données (à remplacer par des vraies données de l'API)
  const patients = [
    {
      id: 1,
      name: 'Ahmed Benali',
      age: 45,
      lastVisit: '2024-01-15',
      status: 'active',
    },
    {
      id: 2,
      name: 'Fatima Zahra',
      age: 32,
      lastVisit: '2024-01-10',
      status: 'active',
    },
  ];

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
          <p className="text-3xl sm:text-4xl font-bold text-accent-600">0</p>
          <p className="text-xs sm:text-sm text-secondary-600 mt-1">Total</p>
        </div>
        <div className="card bg-gradient-to-br from-emerald-50 to-white text-center">
          <p className="text-3xl sm:text-4xl font-bold text-emerald-600">0</p>
          <p className="text-xs sm:text-sm text-secondary-600 mt-1">Actifs</p>
        </div>
        <div className="card bg-gradient-to-br from-purple-50 to-white text-center">
          <p className="text-3xl sm:text-4xl font-bold text-purple-600">0</p>
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
            />
          </div>
          <button className="btn btn-outline text-sm sm:text-base">
            Filtrer
          </button>
        </div>
      </div>

      {/* Patients List */}
      <div className="card">
        <h2 className="text-lg sm:text-xl font-bold text-secondary-900 mb-4">
          Liste des patients
        </h2>

        <div className="space-y-3">
          {patients.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 sm:w-10 sm:h-10 text-secondary-400" />
              </div>
              <p className="text-secondary-500 text-sm sm:text-base">
                Aucun patient pour le moment
              </p>
              <p className="text-secondary-400 text-xs sm:text-sm mt-2">
                Scannez un QR code pour ajouter votre premier patient
              </p>
            </div>
          ) : (
            patients.map((patient) => (
              <div
                key={patient.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-secondary-200 rounded-xl hover:bg-secondary-50 hover:border-accent-300 transition-all cursor-pointer active:scale-[0.98]"
              >
                <div className="flex items-start gap-3 mb-3 sm:mb-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg">
                    {patient.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900 text-sm sm:text-base">
                      {patient.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-secondary-600 flex items-center gap-1 mt-1">
                      <User className="w-3 h-3 sm:w-4 sm:h-4" />
                      {patient.age} ans
                    </p>
                    <p className="text-xs text-secondary-500 flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      Dernière visite: {new Date(patient.lastVisit).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <button className="btn btn-outline text-xs sm:text-sm flex-1 sm:flex-none">
                    <FileText className="w-4 h-4 ltr:mr-1 rtl:ml-1" />
                    Dossier
                  </button>
                  <button className="btn bg-gradient-to-r from-accent-500 to-emerald-500 hover:from-accent-600 hover:to-emerald-600 text-white text-xs sm:text-sm flex-1 sm:flex-none">
                    <Eye className="w-4 h-4 ltr:mr-1 rtl:ml-1" />
                    Consulter
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorPatients;
