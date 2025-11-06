import { Bell, Clock, CheckCircle, XCircle, User, Calendar, CheckCircle2, X } from 'lucide-react';
import { useTranslation } from '../../utils/useTranslation';

const PatientRequests = () => {
  const { t } = useTranslation();

  // Exemple de données (à remplacer par des vraies données de l'API)
  const requests = [
    {
      id: 1,
      doctorName: 'Dr. Sarah Martinez',
      specialty: 'Cardiologue',
      date: '2024-01-20',
      status: 'pending',
    },
    {
      id: 2,
      doctorName: 'Dr. Mohammed Alami',
      specialty: 'Généraliste',
      date: '2024-01-18',
      status: 'approved',
    },
  ];

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const approvedRequests = requests.filter(r => r.status === 'approved');
  const rejectedRequests = requests.filter(r => r.status === 'rejected');

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="card bg-gradient-to-br from-accent-50 to-emerald-50">
        <div className="flex items-start gap-3">
          <div className="p-3 bg-white rounded-xl shadow-md">
            <Bell className="w-6 h-6 sm:w-7 sm:h-7 text-accent-600" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-1 sm:mb-2">
              {t('accessRequests')}
            </h1>
            <p className="text-sm sm:text-base text-secondary-600">
              {t('accessRequestsSubtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <div className="card bg-gradient-to-br from-warning-50 to-white text-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-warning-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-lg">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-warning-600">{pendingRequests.length}</p>
          <p className="text-xs sm:text-sm text-secondary-600 mt-1">{t('pending')}</p>
        </div>
        <div className="card bg-gradient-to-br from-accent-50 to-white text-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-lg">
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-accent-600">{approvedRequests.length}</p>
          <p className="text-xs sm:text-sm text-secondary-600 mt-1">{t('approved')}</p>
        </div>
        <div className="card bg-gradient-to-br from-red-50 to-white text-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-lg">
            <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-red-600">{rejectedRequests.length}</p>
          <p className="text-xs sm:text-sm text-secondary-600 mt-1">{t('rejected')}</p>
        </div>
      </div>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <div className="card">
          <h2 className="text-lg sm:text-xl font-bold text-secondary-900 mb-4 flex items-center">
            <Clock className="w-5 h-5 ltr:mr-2 rtl:ml-2 text-warning-600" />
            {t('pendingRequests')}
          </h2>
          <div className="space-y-3">
            {pendingRequests.map((request) => (
              <div
                key={request.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-2 border-warning-200 bg-warning-50 rounded-xl"
              >
                <div className="flex items-start gap-3 mb-3 sm:mb-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {request.doctorName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900 text-sm sm:text-base">
                      {request.doctorName}
                    </h3>
                    <p className="text-xs sm:text-sm text-secondary-600">{request.specialty}</p>
                    <p className="text-xs text-secondary-500 flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      {new Date(request.date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <button className="btn btn-outline text-xs sm:text-sm flex-1 sm:flex-none hover:bg-red-50 hover:border-red-300 hover:text-red-600">
                    <X className="w-4 h-4 ltr:mr-1 rtl:ml-1" />
                    {t('refuse')}
                  </button>
                  <button className="btn btn-primary text-xs sm:text-sm flex-1 sm:flex-none bg-gradient-to-r from-accent-500 to-emerald-500 hover:from-accent-600 hover:to-emerald-600">
                    <CheckCircle2 className="w-4 h-4 ltr:mr-1 rtl:ml-1" />
                    {t('approve')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approved Requests */}
      {approvedRequests.length > 0 && (
        <div className="card">
          <h2 className="text-lg sm:text-xl font-bold text-secondary-900 mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 ltr:mr-2 rtl:ml-2 text-accent-600" />
            {t('approvedAccess')}
          </h2>
          <div className="space-y-3">
            {approvedRequests.map((request) => (
              <div
                key={request.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-accent-200 bg-accent-50 rounded-xl"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {request.doctorName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900 text-sm sm:text-base">
                      {request.doctorName}
                    </h3>
                    <p className="text-xs sm:text-sm text-secondary-600">{request.specialty}</p>
                    <p className="text-xs text-accent-600 flex items-center gap-1 mt-1">
                      <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      {t('approvedOn')} {new Date(request.date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {requests.length === 0 && (
        <div className="card">
          <div className="text-center py-8 sm:py-12">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 sm:w-10 sm:h-10 text-secondary-400" />
            </div>
            <p className="text-secondary-500 text-sm sm:text-base">
              Aucune demande d'accès pour le moment
            </p>
            <p className="text-secondary-400 text-xs sm:text-sm mt-2">
              Les demandes des médecins apparaîtront ici
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientRequests;
