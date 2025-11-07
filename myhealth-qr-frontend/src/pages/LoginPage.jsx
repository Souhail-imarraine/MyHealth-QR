import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useTranslation } from '../utils/useTranslation';
import LanguageSwitcher from '../components/LanguageSwitcher';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login(formData);
      
      if (response.success) {
        toast.success(t('loginSuccess'));
        const user = response.data.user;
        
        // Redirection selon le rôle
        if (user.role === 'patient') {
          navigate('/patient/dashboard');
        } else if (user.role === 'doctor') {
          navigate('/doctor/dashboard');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMsg = error.response?.data?.error || error.response?.data?.message || error.message || t('error');
      toast.error(`Erreur: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-accent-50 flex items-center justify-center p-4">
      {/* Language Switcher - Top Right */}
      <div className="absolute top-4 ltr:right-4 rtl:left-4 safe-top">
        <LanguageSwitcher />
      </div>

      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-6 sm:mb-8">
          <Link to="/" className="inline-block">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-accent-500 to-emerald-500 rounded-2xl mb-4 shadow-lg">
              <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-secondary-900">{t('login')}</h1>
        </div>

        {/* Formulaire */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Email */}
            <div>
              <label className="label">
                <Mail className="w-4 h-4 inline ltr:mr-2 rtl:ml-2" />
                {t('email')}
              </label>
              <input
                type="email"
                required
                className="input"
                placeholder={t('email')}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            {/* Mot de passe */}
            <div>
              <label className="label">
                <Lock className="w-4 h-4 inline ltr:mr-2 rtl:ml-2" />
                {t('password')}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="input pr-10"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Bouton de connexion */}
            <button
              type="submit"
              disabled={loading}
              className="btn bg-gradient-to-r from-accent-500 to-emerald-500 hover:from-accent-600 hover:to-emerald-600 text-white w-full text-base sm:text-lg shadow-lg hover:shadow-xl active:scale-95"
            >
              {loading ? '...' : t('signIn')}
            </button>
          </form>

          {/* Liens */}
          <div className="mt-6 text-center space-y-3">
            <p className="text-secondary-600 text-sm sm:text-base">
              {t('noAccount')}{' '}
              <Link to="/register" className="text-accent-600 hover:text-accent-700 font-medium">
                {t('register')}
              </Link>
            </p>
            <Link to="/" className="text-secondary-500 hover:text-secondary-700 text-sm block">
              ← {t('home')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
