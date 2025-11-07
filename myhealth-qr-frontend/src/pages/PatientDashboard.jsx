import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  QrCode, 
  FileText, 
  Bell, 
  User, 
  LogOut,
  Heart,
  Menu,
  X
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useTranslation } from '../utils/useTranslation';
import LanguageSwitcher from '../components/LanguageSwitcher';
import MobileBottomNav from '../components/MobileBottomNav';
import toast from 'react-hot-toast';

// Composants des pages
import PatientHome from '../components/patient/PatientHome';
import PatientProfile from '../components/patient/PatientProfile';
import PatientQRCode from '../components/patient/PatientQRCode';
import PatientRecords from '../components/patient/PatientRecords';
import PatientRequests from '../components/patient/PatientRequests';

const PatientDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { path: '/patient/dashboard', icon: LayoutDashboard, label: t('dashboard') },
    { path: '/patient/qr-code', icon: QrCode, label: t('myQRCode') },
    { path: '/patient/records', icon: FileText, label: t('medicalRecords') },
    { path: '/patient/requests', icon: Bell, label: t('accessRequests') },
    { path: '/patient/profile', icon: User, label: t('myProfile') },
  ];

  const handleLogout = () => {
    logout();
    toast.success(t('logoutSuccess'));
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:fixed lg:inset-y-0 ltr:lg:left-0 rtl:lg:right-0 lg:flex lg:w-64 lg:flex-col bg-white ltr:border-r rtl:border-l border-secondary-200 shadow-xl">
        <div className="flex flex-col flex-1">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-secondary-200 bg-gradient-to-r from-accent-50 to-white">
            <img 
              src="/logo.png" 
              alt="HealthPass Logo" 
              className="h-8 sm:h-10 w-auto object-contain"
            />
          </div>

          {/* User Info */}
          <div className="p-5 border-b border-secondary-200 bg-gradient-to-br from-accent-50 to-emerald-50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 overflow-hidden">
                <img 
                  src="/doctor.png" 
                  alt="User Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-secondary-900 truncate">{user?.firstName} {user?.lastName}</p>
                <p className="text-sm text-secondary-500">{t('patient')}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-accent-500 to-emerald-500 text-white font-semibold shadow-lg'
                      : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ltr:mr-3 rtl:ml-3 ${isActive ? 'stroke-[2.5]' : ''}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-secondary-200">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-secondary-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all active:scale-95"
            >
              <LogOut className="w-5 h-5 ltr:mr-3 rtl:ml-3" />
              {t('logout')}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-secondary-900/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}>
          <aside className="fixed inset-y-0 ltr:left-0 rtl:right-0 w-64 bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between h-16 px-6 border-b border-secondary-200 bg-gradient-to-r from-accent-50 to-white">
                <div className="flex items-center gap-2">
                  <img 
                    src="/logo.png" 
                    alt="HealthPass Logo" 
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <button onClick={() => setSidebarOpen(false)} className="active:scale-95 transition-transform">
                  <X className="w-6 h-6 text-secondary-600" />
                </button>
              </div>

              {/* User Info */}
              <div className="p-5 border-b border-secondary-200 bg-gradient-to-br from-accent-50 to-emerald-50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 overflow-hidden">
                    <img 
                      src="/doctor.png" 
                      alt="User Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-secondary-900 truncate">{user?.firstName} {user?.lastName}</p>
                    <p className="text-sm text-secondary-500">{t('patient')}</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-accent-500 to-emerald-500 text-white font-semibold shadow-lg'
                          : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ltr:mr-3 rtl:ml-3 ${isActive ? 'stroke-[2.5]' : ''}`} />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Logout */}
              <div className="p-4 border-t border-secondary-200">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 text-secondary-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all active:scale-95"
                >
                  <LogOut className="w-5 h-5 ltr:mr-3 rtl:ml-3" />
                  {t('logout')}
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="lg:pl-64 rtl:lg:pl-0 rtl:lg:pr-64">
        {/* Top Bar - Mobile */}
        <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between h-14 px-4 bg-white/95 backdrop-blur-sm border-b border-secondary-200 shadow-sm safe-top">
          <button onClick={() => setSidebarOpen(true)} className="active:scale-95 transition-transform">
            <Menu className="w-6 h-6 text-secondary-600" />
          </button>
          <div className="flex items-center gap-2">
            <img 
              src="/logo.png" 
              alt="HealthPass Logo" 
              className="h-8 w-auto object-contain"
            />
          </div>
          <LanguageSwitcher />
        </div>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8 mb-16 md:mb-0">
          <Routes>
            <Route path="/dashboard" element={<PatientHome />} />
            <Route path="/qr-code" element={<PatientQRCode />} />
            <Route path="/records" element={<PatientRecords />} />
            <Route path="/requests" element={<PatientRequests />} />
            <Route path="/profile" element={<PatientProfile />} />
          </Routes>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav role="patient" />
    </div>
  );
};

export default PatientDashboard;
