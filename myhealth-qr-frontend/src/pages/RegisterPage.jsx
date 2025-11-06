import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Mail, Lock, User, Phone, Eye, EyeOff, UserCheck, Stethoscope } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useTranslation } from '../utils/useTranslation';
import LanguageSwitcher from '../components/LanguageSwitcher';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    role: 'patient'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast.error(t('passwordMismatch'));
      return;
    }

    if (formData.password.length < 6) {
      toast.error(t('passwordMinLength'));
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await register(registerData);
      
      if (response.success) {
        toast.success(t('registerSuccess'));
        const user = response.data.user;
        
        // Redirection selon le rôle
        if (user.role === 'patient') {
          navigate('/patient/dashboard');
        } else if (user.role === 'doctor') {
          navigate('/doctor/dashboard');
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || t('error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-accent-50 flex items-center justify-center p-4 py-12">
      {/* Language Switcher - Top Right */}
      <div className="absolute top-4 ltr:right-4 rtl:left-4 safe-top">
        <LanguageSwitcher />
      </div>

      <div className="max-w-2xl w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent-500 to-emerald-500 rounded-2xl mb-4 shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-secondary-900">{t('signUp')}</h1>
          <p className="text-secondary-600 mt-2">{t('joinMyHealthQR')}</p>
        </div>

        {/* Formulaire */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Choix du rôle */}
            <div>
              <label className="label">{t('iAm')}:</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'patient' })}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    formData.role === 'patient'
                      ? 'border-accent-600 bg-accent-50'
                      : 'border-secondary-200 hover:border-accent-300'
                  }`}
                >
                  <UserCheck className={`w-8 h-8 mx-auto mb-2 ${formData.role === 'patient' ? 'text-accent-600' : 'text-secondary-400'}`} />
                  <div className="font-medium text-secondary-900">{t('patient')}</div>
                  <div className="text-sm text-secondary-600">{t('manageMyMedicalRecords')}</div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'doctor' })}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    formData.role === 'doctor'
                      ? 'border-accent-600 bg-accent-50'
                      : 'border-secondary-200 hover:border-accent-300'
                  }`}
                >
                  <Stethoscope className={`w-8 h-8 mx-auto mb-2 ${formData.role === 'doctor' ? 'text-accent-600' : 'text-secondary-400'}`} />
                  <div className="font-medium text-secondary-900">{t('doctor')}</div>
                  <div className="text-sm text-secondary-600">{t('consultMedicalRecords')}</div>
                </button>
              </div>
            </div>

            {/* Nom et Prénom */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <User className="w-4 h-4 inline mr-2" />
                  {t('firstName')}
                </label>
                <input
                  type="text"
                  required
                  className="input"
                  placeholder="Ahmed"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              
              <div>
                <label className="label">{t('lastName')}</label>
                <input
                  type="text"
                  required
                  className="input"
                  placeholder="Alami"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="label">
                <Mail className="w-4 h-4 inline mr-2" />
                {t('email')}
              </label>
              <input
                type="email"
                required
                className="input"
                placeholder="exemple@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            {/* Téléphone */}
            <div>
              <label className="label">
                <Phone className="w-4 h-4 inline mr-2" />
                {t('phone')}
              </label>
              <input
                type="tel"
                className="input"
                placeholder="06 12 34 56 78"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            {/* Mot de passe */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <Lock className="w-4 h-4 inline mr-2" />
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
              
              <div>
                <label className="label">{t('confirmPassword')}</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="input"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
              </div>
            </div>

            {/* Bouton d'inscription */}
            <button
              type="submit"
              disabled={loading}
              className="btn bg-gradient-to-r from-accent-500 to-emerald-500 hover:from-accent-600 hover:to-emerald-600 text-white w-full text-lg py-3 shadow-lg hover:shadow-xl active:scale-95"
            >
              {loading ? t('registering') : t('createAccount')}
            </button>
          </form>

          {/* Liens */}
          <div className="mt-6 text-center space-y-3">
            <p className="text-secondary-600">
              {t('alreadyHaveAccount')}{' '}
              <Link to="/login" className="text-accent-600 hover:text-accent-700 font-medium">
                {t('signIn')}
              </Link>
            </p>
            <Link to="/" className="text-secondary-500 hover:text-secondary-700 text-sm block">
              ← {t('backToHome')}
            </Link>
          </div>

          {/* CGU */}
          <p className="mt-6 text-xs text-center text-secondary-500">
            {t('bySigningUp')}{' '}
            <a href="#" className="text-accent-600 hover:underline">{t('termsOfService')}</a>
            {' '}{t('and')}{' '}
            <a href="#" className="text-accent-600 hover:underline">{t('privacyPolicy')}</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
