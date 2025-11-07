import { Home, QrCode, FileText, Bell, User, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from '../utils/useTranslation';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const MobileBottomNav = ({ role = 'patient' }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast.success(t('logoutSuccess'));
    navigate('/');
  };

  const patientLinks = [
    { to: '/patient/dashboard', icon: Home, label: t('home') },
    { to: '/patient/qr-code', icon: QrCode, label: t('myQRCode') },
    { to: '/patient/records', icon: FileText, label: t('medicalRecords') },
    { to: '/patient/requests', icon: Bell, label: t('accessRequests') },
    { to: '/patient/profile', icon: User, label: t('myProfile') },
  ];

  const doctorLinks = [
    { to: '/doctor/dashboard', icon: Home, label: t('home') },
    { to: '/doctor/scan', icon: QrCode, label: t('scanQR') },
    { to: '/doctor/patients', icon: User, label: t('myPatients') },
    { to: '/doctor/profile', icon: User, label: t('myProfile') },
  ];

  const links = role === 'doctor' ? doctorLinks : patientLinks;

  return (
    <nav className="md:hidden fixed bottom-0 ltr:left-0 rtl:right-0 ltr:right-0 rtl:left-0 bg-white border-t border-secondary-200 shadow-2xl safe-bottom z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all active:scale-95 ${
                isActive
                  ? 'text-accent-600'
                  : 'text-secondary-400 hover:text-secondary-600'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-accent-100' : ''}`}>
                  <link.icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
                </div>
                <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
                  {link.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
        
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center justify-center flex-1 h-full gap-1 text-red-500 hover:text-red-600 transition-all active:scale-95"
        >
          <div className="p-1.5 rounded-xl transition-all hover:bg-red-50">
            <LogOut className="w-5 h-5" />
          </div>
          <span className="text-xs font-medium">
            {t('logout')}
          </span>
        </button>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
