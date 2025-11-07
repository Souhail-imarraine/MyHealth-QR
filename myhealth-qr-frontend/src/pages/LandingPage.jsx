import { Link } from 'react-router-dom';
import { 
  Heart, 
  Shield, 
  QrCode, 
  Users, 
  Bell, 
  Lock, 
  ArrowRight,
  CheckCircle,
  Activity
} from 'lucide-react';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useTranslation } from '../utils/useTranslation';

const LandingPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-accent-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-50 safe-top">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-4">
          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              {/* <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-accent-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div> */}
              <span className="text-base sm:text-xl md:text-2xl font-bold text-gradient">HealthPass</span>
            </div>
            <nav className="hidden lg:flex gap-6 xl:gap-8">
              <a href="#features" className="text-secondary-600 hover:text-accent-600 transition font-medium">{t('features')}</a>
              <a href="#how-it-works" className="text-secondary-600 hover:text-accent-600 transition font-medium">{t('howItWorks')}</a>
              <a href="#security" className="text-secondary-600 hover:text-accent-600 transition font-medium">{t('security')}</a>
            </nav>
            <div className="flex items-center gap-1.5 sm:gap-3">
              <LanguageSwitcher />
              <Link to="/login" className="btn btn-outline text-xs sm:text-sm md:text-base px-2.5 py-1.5 sm:px-4 sm:py-2 border-2 border-accent-500 text-accent-600 hover:bg-accent-50">{t('login')}</Link>
              <Link to="/register" className="hidden sm:inline-flex btn bg-gradient-to-r from-accent-500 to-emerald-500 hover:from-accent-600 hover:to-emerald-600 text-white text-sm md:text-base shadow-lg">{t('register')}</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-br from-accent-50 to-emerald-50 rounded-full mb-4 sm:mb-6 shadow-md border border-accent-200">
              <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-accent-600 ltr:mr-2 rtl:ml-2" />
              <span className="text-accent-700 font-medium text-xs sm:text-sm md:text-base">{t('product')}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-900 mb-4 sm:mb-6 leading-tight">
              {t('heroTitle')}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gradient font-semibold mb-6 sm:mb-8">
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-12">
              <Link to="/register" className="btn bg-gradient-to-r from-accent-500 to-emerald-500 hover:from-accent-600 hover:to-emerald-600 text-white text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-3.5 inline-flex items-center justify-center shadow-lg hover:shadow-xl">
                {t('getStarted')}
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ltr:ml-2 rtl:mr-2" />
              </Link>
              <a href="#how-it-works" className="btn btn-secondary text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-3.5 inline-flex items-center justify-center">
                {t('learnMore')}
              </a>
            </div>
            <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              <div className="text-center md:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-accent-600">100%</div>
                <div className="text-xs sm:text-sm text-secondary-600">{t('secured')}</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-emerald-600">24/7</div>
                <div className="text-xs sm:text-sm text-secondary-600">{t('accessible')}</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-accent-600">RGPD</div>
                <div className="text-xs sm:text-sm text-secondary-600">{t('compliant')}</div>
              </div>
            </div>
          </div>
          <div className="relative order-1 md:order-2">
            <div className="relative bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-16 h-16 sm:w-24 sm:h-24 bg-accent-500 rounded-2xl rotate-12 opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-20 h-20 sm:w-32 sm:h-32 bg-emerald-500 rounded-2xl -rotate-12 opacity-20"></div>
              <QrCode className="w-full h-auto text-secondary-800" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-3 sm:mb-4">
              {t('mainFeatures')}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-secondary-600 max-w-2xl mx-auto px-4">
              {t('featuresDescription')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Feature 1 */}
            <div className="card group hover:scale-105 transition-transform">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent-100 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <QrCode className="w-6 h-6 sm:w-8 sm:h-8 text-accent-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-secondary-900 mb-2 sm:mb-3">{t('uniqueQRCode')}</h3>
              <p className="text-sm sm:text-base text-secondary-600">
                {t('uniqueQRCodeDesc')}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card group hover:scale-105 transition-transform">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-secondary-900 mb-2 sm:mb-3">{t('totalControl')}</h3>
              <p className="text-sm sm:text-base text-secondary-600">
                {t('totalControlDesc')}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card group hover:scale-105 transition-transform">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent-100 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <Bell className="w-6 h-6 sm:w-8 sm:h-8 text-accent-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-secondary-900 mb-2 sm:mb-3">{t('realTimeNotifications')}</h3>
              <p className="text-sm sm:text-base text-secondary-600">
                {t('realTimeNotificationsDesc')}
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card group hover:scale-105 transition-transform">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-secondary-900 mb-2 sm:mb-3">{t('doctorCollaboration')}</h3>
              <p className="text-sm sm:text-base text-secondary-600">
                {t('doctorCollaborationDesc')}
              </p>
            </div>

            {/* Feature 5 */}
            <div className="card group hover:scale-105 transition-transform">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent-100 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-accent-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-secondary-900 mb-2 sm:mb-3">{t('advancedEncryption')}</h3>
              <p className="text-sm sm:text-base text-secondary-600">
                {t('advancedEncryptionDesc')}
              </p>
            </div>

            {/* Feature 6 */}
            <div className="card group hover:scale-105 transition-transform">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-secondary-900 mb-2 sm:mb-3">{t('completeHistory')}</h3>
              <p className="text-sm sm:text-base text-secondary-600">
                {t('completeHistoryDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section id="how-it-works" className="py-12 sm:py-16 md:py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-3 sm:mb-4">
              {t('howItWorksTitle')}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-secondary-600 px-4">
              {t('howItWorksSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                step: '1',
                title: t('stepRegistration'),
                description: t('stepRegistrationDesc'),
                color: 'accent'
              },
              {
                step: '2',
                title: t('stepMedicalProfile'),
                description: t('stepMedicalProfileDesc'),
                color: 'emerald'
              },
              {
                step: '3',
                title: t('stepQRCode'),
                description: t('stepQRCodeDesc'),
                color: 'accent'
              },
              {
                step: '4',
                title: t('stepSecureSharing'),
                description: t('stepSecureSharingDesc'),
                color: 'emerald'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-${item.color}-100 flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                  <span className={`text-xl sm:text-2xl font-bold text-${item.color}-600`}>{item.step}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-secondary-900 mb-2 px-2">{item.title}</h3>
                <p className="text-sm sm:text-base text-secondary-600 px-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4 sm:mb-6">
                {t('securityTitle')}
              </h2>
              <p className="text-base sm:text-lg text-secondary-600 mb-6 sm:mb-8">
                {t('securityDescription')}
              </p>
              <div className="space-y-3 sm:space-y-4">
                {[
                  t('securityFeature1'),
                  t('securityFeature2'),
                  t('securityFeature3'),
                  t('securityFeature4'),
                  t('securityFeature5'),
                  t('securityFeature6')
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-secondary-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative order-1 md:order-2">
              <div className="relative rounded-2xl shadow-2xl overflow-hidden h-[300px] sm:h-[350px] md:h-[400px]">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=800&q=80)',
                  }}
                ></div>
                
                {/* Overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-500/90 to-emerald-500/90"></div>
                
                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center p-6 sm:p-8 text-white">
                  <Shield className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-4 sm:mb-6 opacity-90 drop-shadow-lg" />
                  <h3 className="text-xl sm:text-2xl font-bold text-center mb-3 sm:mb-4 drop-shadow-md">{t('maximumProtection')}</h3>
                  <p className="text-sm sm:text-base text-center text-white/95 drop-shadow-md px-4">
                    {t('maximumProtectionDesc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 sm:py-24 md:py-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent-600/75 to-emerald-600/75"></div>
        </div>
        
        {/* Content */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg px-4">
            {t('ctaTitle')}
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-10 drop-shadow-md px-4">
            {t('ctaSubtitle')}
          </p>
          <Link 
            to="/register" 
            className="btn bg-white text-accent-600 hover:bg-accent-50 hover:scale-105 text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 inline-flex items-center shadow-2xl transition-transform duration-300"
          >
            {t('ctaButton')}
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ltr:ml-2 rtl:mr-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-900 text-secondary-300 py-8 sm:py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-accent-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-md">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-bold text-white">HealthPass</span>
              </div>
              <p className="text-sm sm:text-base text-secondary-400">
                {t('footerDescription')}
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 sm:mb-4 text-sm sm:text-base">{t('product')}</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-sm sm:text-base hover:text-accent-400 transition">{t('features')}</a></li>
                <li><a href="#security" className="text-sm sm:text-base hover:text-accent-400 transition">{t('security')}</a></li>
                <li><a href="#" className="text-sm sm:text-base hover:text-accent-400 transition">{t('pricing')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 sm:mb-4 text-sm sm:text-base">{t('company')}</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm sm:text-base hover:text-accent-400 transition">{t('aboutUs')}</a></li>
                <li><a href="#" className="text-sm sm:text-base hover:text-accent-400 transition">{t('contact')}</a></li>
                <li><a href="#" className="text-sm sm:text-base hover:text-accent-400 transition">{t('careers')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 sm:mb-4 text-sm sm:text-base">{t('legal')}</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm sm:text-base hover:text-accent-400 transition">{t('privacy')}</a></li>
                <li><a href="#" className="text-sm sm:text-base hover:text-accent-400 transition">{t('terms')}</a></li>
                <li><a href="#" className="text-sm sm:text-base hover:text-accent-400 transition">{t('legalNotice')}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-secondary-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-secondary-400">
            <p className="text-xs sm:text-sm">&copy; 2025 HealthPass. {t('allRightsReserved')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
