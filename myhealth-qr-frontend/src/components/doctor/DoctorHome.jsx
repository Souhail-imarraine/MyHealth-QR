import { Activity, Users, Clock, CheckCircle, QrCode, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useTranslation } from '../../utils/useTranslation';

const DoctorHome = () => {
  const { user } = useAuthStore();
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
      {/* Welcome Header */}
      <div className="card bg-gradient-to-r from-accent-500 to-emerald-500 text-white shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              {t('welcome')}, Dr. {user?.firstName}
            </h1>
            <p className="text-accent-50 text-sm sm:text-base">
              {t('managePatients')}
            </p>
          </div>
          <div className="hidden sm:block w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="card bg-gradient-to-br from-white to-accent-50 hover:shadow-xl transition-all cursor-pointer active:scale-95">
          <div className="text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-accent-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-secondary-900">0</p>
            <p className="text-xs sm:text-sm text-secondary-600 mt-1">Patients</p>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-white to-warning-50 hover:shadow-xl transition-all cursor-pointer active:scale-95">
          <div className="text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-warning-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-secondary-900">0</p>
            <p className="text-xs sm:text-sm text-secondary-600 mt-1">En attente</p>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-white to-primary-50 hover:shadow-xl transition-all cursor-pointer active:scale-95">
          <div className="text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-secondary-900">0</p>
            <p className="text-xs sm:text-sm text-secondary-600 mt-1">Dossiers</p>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-white to-emerald-50 hover:shadow-xl transition-all cursor-pointer active:scale-95">
          <div className="text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-secondary-900">0</p>
            <p className="text-xs sm:text-sm text-secondary-600 mt-1">Approuvés</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-lg sm:text-xl font-bold text-secondary-900 mb-4">{t('quickActions')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link to="/doctor/scan" className="btn bg-gradient-to-r from-accent-500 to-emerald-500 hover:from-accent-600 hover:to-emerald-600 text-white justify-center sm:justify-start shadow-lg hover:shadow-xl">
            <QrCode className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
            {t('scanQR')}
          </Link>
          <Link to="/doctor/patients" className="btn btn-secondary justify-center sm:justify-start">
            <Users className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
            {t('myPatients')}
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2 className="text-lg sm:text-xl font-bold text-secondary-900 mb-4 flex items-center">
          <Activity className="w-5 h-5 ltr:mr-2 rtl:ml-2 text-accent-600" />
          {t('recentActivity')}
        </h2>
        <div className="text-center py-8 sm:py-12">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="w-8 h-8 sm:w-10 sm:h-10 text-secondary-400" />
          </div>
          <p className="text-secondary-500 text-sm sm:text-base">{t('noRecentActivity')}</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorHome;
