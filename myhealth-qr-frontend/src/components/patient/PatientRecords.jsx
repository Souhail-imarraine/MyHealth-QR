import { FileText, Calendar, User, Download, Eye } from 'lucide-react';
import { useTranslation } from '../../utils/useTranslation';

const PatientRecords = () => {
  const { t } = useTranslation();

  // Exemple de données (à remplacer par des vraies données de l'API)
  const records = [
    {
      id: 1,
      type: 'Consultation',
      doctor: 'Dr. Ahmed Benali',
      date: '2024-01-15',
      description: 'Consultation générale',
    },
    {
      id: 2,
      type: 'Analyse',
      doctor: 'Laboratoire Central',
      date: '2024-01-10',
      description: 'Bilan sanguin complet',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="card bg-gradient-to-br from-accent-50 to-emerald-50">
        <div className="flex items-start gap-3">
          <div className="p-3 bg-white rounded-xl shadow-md">
            <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-accent-600" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-1 sm:mb-2">
              {t('medicalRecords')}
            </h1>
            <p className="text-sm sm:text-base text-secondary-600">
              {t('medicalRecordsSubtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="card bg-gradient-to-br from-accent-50 to-white text-center">
          <p className="text-3xl sm:text-4xl font-bold text-accent-600">0</p>
          <p className="text-xs sm:text-sm text-secondary-600 mt-1">{t('totalRecords')}</p>
        </div>
        <div className="card bg-gradient-to-br from-emerald-50 to-white text-center">
          <p className="text-3xl sm:text-4xl font-bold text-emerald-600">0</p>
          <p className="text-xs sm:text-sm text-secondary-600 mt-1">{t('consultations')}</p>
        </div>
        <div className="card bg-gradient-to-br from-purple-50 to-white text-center">
          <p className="text-3xl sm:text-4xl font-bold text-purple-600">0</p>
          <p className="text-xs sm:text-sm text-secondary-600 mt-1">{t('analyses')}</p>
        </div>
        <div className="card bg-gradient-to-br from-warning-50 to-white text-center">
          <p className="text-3xl sm:text-4xl font-bold text-warning-600">0</p>
          <p className="text-xs sm:text-sm text-secondary-600 mt-1">{t('prescriptions')}</p>
        </div>
      </div>

      {/* Records List */}
      <div className="card">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-secondary-900">
            Historique des dossiers
          </h2>
          <button className="btn btn-outline text-sm">
            Filtrer
          </button>
        </div>

        <div className="space-y-3">
          {records.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-secondary-400" />
              </div>
              <p className="text-secondary-500 text-sm sm:text-base">
                Aucun dossier médical pour le moment
              </p>
              <p className="text-secondary-400 text-xs sm:text-sm mt-2">
                Vos dossiers apparaîtront ici après vos consultations
              </p>
            </div>
          ) : (
            records.map((record) => (
              <div
                key={record.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-secondary-200 rounded-xl hover:bg-secondary-50 hover:border-accent-300 transition-all cursor-pointer active:scale-[0.98]"
              >
                <div className="flex items-start gap-3 mb-3 sm:mb-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900 text-sm sm:text-base">
                      {record.type}
                    </h3>
                    <p className="text-xs sm:text-sm text-secondary-600 flex items-center gap-1 mt-1">
                      <User className="w-3 h-3 sm:w-4 sm:h-4" />
                      {record.doctor}
                    </p>
                    <p className="text-xs text-secondary-500 flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      {new Date(record.date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <button className="btn btn-outline text-xs sm:text-sm flex-1 sm:flex-none">
                    <Eye className="w-4 h-4 ltr:mr-1 rtl:ml-1" />
                    {t('view')}
                  </button>
                  <button className="btn bg-gradient-to-r from-accent-500 to-emerald-500 hover:from-accent-600 hover:to-emerald-600 text-white text-xs sm:text-sm flex-1 sm:flex-none">
                    <Download className="w-4 h-4 ltr:mr-1 rtl:ml-1" />
                    {t('download')}
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

export default PatientRecords;
