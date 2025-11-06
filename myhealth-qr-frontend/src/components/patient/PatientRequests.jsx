import { useState, useEffect } from 'react';
import { Bell, Clock, CheckCircle, XCircle, User, Calendar, CheckCircle2, X, Loader, AlertCircle, Building2, Stethoscope } from 'lucide-react';
import { useTranslation } from '../../utils/useTranslation';
import { patientService } from '../../services/patientService';
import toast from 'react-hot-toast';

const PatientRequests = () => {
  const { t } = useTranslation();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  // Charger les demandes d'accès
  useEffect(() => {
    loadAccessRequests();
  }, []);

  const loadAccessRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await patientService.getAccessRequests();
      if (response.success) {
        setRequests(response.data || []);
      }
    } catch (err) {
      console.error('Erreur chargement demandes:', err);
      setError(err.response?.data?.message || 'Erreur lors du chargement des demandes');
    } finally {
      setLoading(false);
    }
  };

  // Approuver une demande
  const handleApprove = async (requestId) => {
    try {
      setProcessingId(requestId);
      const response = await patientService.respondToAccessRequest(requestId, 'approved');
      
      if (response.success) {
        toast.success('✅ Accès approuvé avec succès!');
        await loadAccessRequests(); // Recharger la liste
      }
    } catch (err) {
      console.error('Erreur approbation:', err);
      toast.error(err.response?.data?.message || 'Erreur lors de l\'approbation');
    } finally {
      setProcessingId(null);
    }
  };

  // Refuser une demande
  const handleReject = async (requestId) => {
    try {
      setProcessingId(requestId);
      const response = await patientService.respondToAccessRequest(requestId, 'rejected');
      
      if (response.success) {
        toast.success('❌ Accès refusé');
        await loadAccessRequests(); // Recharger la liste
      }
    } catch (err) {
      console.error('Erreur refus:', err);
      toast.error(err.response?.data?.message || 'Erreur lors du refus');
    } finally {
      setProcessingId(null);
    }
  };

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

      {/* Loading State */}
      {loading && (
        <div className="card">
          <div className="flex flex-col items-center justify-center py-12">
            <Loader className="w-12 h-12 text-accent-500 animate-spin mb-4" />
            <p className="text-secondary-600">Chargement des demandes...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="card bg-red-50 border-2 border-red-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-bold text-red-900 mb-1">Erreur</h3>
              <p className="text-sm text-red-700">{error}</p>
              <button 
                onClick={loadAccessRequests}
                className="mt-3 btn btn-sm btn-outline border-red-300 text-red-600 hover:bg-red-100"
              >
                Réessayer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content - Only show when not loading */}
      {!loading && !error && (
        <>
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

          {/* No Requests */}
          {requests.length === 0 && (
            <div className="card text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-10 h-10 text-secondary-400" />
              </div>
              <h3 className="text-xl font-bold text-secondary-700 mb-2">
                Aucune demande d'accès
              </h3>
              <p className="text-secondary-500">
                Les demandes d'accès des médecins apparaîtront ici
              </p>
            </div>
          )}

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <div className="card">
          <h2 className="text-lg sm:text-xl font-bold text-secondary-900 mb-4 flex items-center">
            <Clock className="w-5 h-5 ltr:mr-2 rtl:ml-2 text-warning-600" />
            {t('pendingRequests')}
          </h2>
          <div className="space-y-3">
            {pendingRequests.map((request) => {
              const doctorName = request.doctor?.user 
                ? `Dr. ${request.doctor.user.firstName} ${request.doctor.user.lastName}`
                : 'Médecin';
              const specialty = request.doctor?.specialization || 'Non spécifié';
              
              return (
                <div
                  key={request.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-2 border-warning-200 bg-warning-50 rounded-xl"
                >
                  <div className="flex items-start gap-3 mb-3 sm:mb-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {doctorName.charAt(3)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900 text-sm sm:text-base">
                        {doctorName}
                      </h3>
                      <p className="text-xs sm:text-sm text-secondary-600 flex items-center gap-1">
                        <Stethoscope className="w-3 h-3" />
                        {specialty}
                      </p>
                      {request.doctor?.hospital && (
                        <p className="text-xs text-secondary-500 flex items-center gap-1 mt-1">
                          <Building2 className="w-3 h-3" />
                          {request.doctor.hospital}
                        </p>
                      )}
                      <p className="text-xs text-secondary-500 flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        {new Date(request.requestDate || request.createdAt).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 sm:gap-3">
                    <button 
                      onClick={() => handleReject(request.id)}
                      disabled={processingId === request.id}
                      className="btn btn-outline text-xs sm:text-sm flex-1 sm:flex-none hover:bg-red-50 hover:border-red-300 hover:text-red-600 disabled:opacity-50"
                    >
                      {processingId === request.id ? (
                        <Loader className="w-4 h-4 ltr:mr-1 rtl:ml-1 animate-spin" />
                      ) : (
                        <X className="w-4 h-4 ltr:mr-1 rtl:ml-1" />
                      )}
                      {t('refuse')}
                    </button>
                    <button 
                      onClick={() => handleApprove(request.id)}
                      disabled={processingId === request.id}
                      className="btn btn-primary text-xs sm:text-sm flex-1 sm:flex-none bg-gradient-to-r from-accent-500 to-emerald-500 hover:from-accent-600 hover:to-emerald-600 disabled:opacity-50"
                    >
                      {processingId === request.id ? (
                        <Loader className="w-4 h-4 ltr:mr-1 rtl:ml-1 animate-spin" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 ltr:mr-1 rtl:ml-1" />
                      )}
                      {t('approve')}
                    </button>
                  </div>
                </div>
              );
            })}
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
            {approvedRequests.map((request) => {
              const doctorName = request.doctor?.user 
                ? `Dr. ${request.doctor.user.firstName} ${request.doctor.user.lastName}`
                : 'Médecin';
              const specialty = request.doctor?.specialization || 'Non spécifié';
              
              return (
                <div
                  key={request.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-accent-200 bg-accent-50 rounded-xl"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {doctorName.charAt(3)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900 text-sm sm:text-base">
                        {doctorName}
                      </h3>
                      <p className="text-xs sm:text-sm text-secondary-600 flex items-center gap-1">
                        <Stethoscope className="w-3 h-3" />
                        {specialty}
                      </p>
                      {request.doctor?.hospital && (
                        <p className="text-xs text-secondary-500 flex items-center gap-1 mt-1">
                          <Building2 className="w-3 h-3" />
                          {request.doctor.hospital}
                        </p>
                      )}
                      <p className="text-xs text-accent-600 flex items-center gap-1 mt-1">
                        <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        {t('approvedOn')} {new Date(request.responseDate || request.updatedAt).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
        </>
      )}
    </div>
  );
};

export default PatientRequests;
