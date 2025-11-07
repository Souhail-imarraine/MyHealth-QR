import { QrCode, Camera, AlertCircle, CheckCircle, XCircle, Loader, ShieldAlert } from 'lucide-react';
import { useTranslation } from '../../utils/useTranslation';
import { useState } from 'react';
import { scanPatientQR } from '../../services/doctorService';
import { useAuthStore } from '../../store/authStore';

const DoctorScanner = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [qrCodeInput, setQrCodeInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Vérification de sécurité: Seulement les médecins peuvent accéder
  if (!user || user.role !== 'doctor') {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="card bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-300">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-100 rounded-xl">
              <ShieldAlert className="w-12 h-12 text-red-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-red-900 mb-3">🔒 Accès Refusé</h2>
              <p className="text-red-800 mb-4">
                Cette fonctionnalité est réservée exclusivement aux <strong>médecins authentifiés</strong>.
              </p>
              <div className="bg-white rounded-lg p-4 border-l-4 border-red-500 space-y-2">
                <h3 className="font-semibold text-red-900">Protection des Données Médicales</h3>
                <ul className="space-y-1 text-sm text-red-700">
                  <li>✗ Vous n'êtes pas identifié comme médecin</li>
                  <li>✗ Les QR codes contiennent des informations médicales sensibles</li>
                  <li>✗ Seuls les professionnels de santé peuvent demander l'accès</li>
                  <li>✗ Cette mesure protège la vie privée des patients</li>
                </ul>
              </div>
              {!user && (
                <div className="mt-4">
                  <p className="text-sm text-red-700 mb-2">
                    Vous n'êtes pas connecté. Si vous êtes médecin, veuillez vous connecter.
                  </p>
                </div>
              )}
              {user && user.role === 'patient' && (
                <div className="mt-4">
                  <p className="text-sm text-red-700 mb-2">
                    Vous êtes connecté en tant que <strong>patient</strong>. Cette section est réservée aux médecins.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-blue-900 mb-2">Information</h3>
              <p className="text-sm text-blue-800">
                Si vous êtes un professionnel de santé et souhaitez accéder à cette fonctionnalité:
              </p>
              <ul className="mt-2 space-y-1 text-sm text-blue-700">
                <li>1. Créez un compte <strong>Médecin</strong> lors de l'inscription</li>
                <li>2. Complétez votre profil professionnel (INPE, spécialité, etc.)</li>
                <li>3. Connectez-vous avec vos identifiants médicaux</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleScanQRCode = async () => {
    if (!qrCodeInput.trim()) {
      setError('Veuillez entrer un code QR valide');
      return;
    }

    // Vérifier que l'utilisateur est un médecin
    if (!user || user.role !== 'doctor') {
      setError('Accès refusé: Seuls les médecins peuvent scanner les QR codes patients');
      setResult({
        success: false,
        accessDenied: true,
        message: 'Vous n\'avez pas l\'autorisation d\'accéder aux données sensibles de ce patient'
      });
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await scanPatientQR(qrCodeInput.trim());
      
      if (response.success) {
        setResult({
          success: true,
          message: response.message,
          patient: response.data?.patient,
          requestSent: true
        });
        setQrCodeInput('');
      } else {
        setError(response.message || 'Code QR invalide');
      }
    } catch (err) {
      console.error('Scan error:', err);
      console.log('Error response:', err.response?.data);
      
      // Si erreur 401/403 = pas autorisé
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError('Accès refusé: Vous devez être médecin pour scanner ce QR code');
        setResult({
          success: false,
          accessDenied: true,
          message: 'Données sensibles protégées - Accès médecin requis'
        });
      } else if (err.response?.status === 400) {
        // Erreur 400 peut contenir des messages utiles
        const errorMessage = err.response?.data?.message || 'Code QR invalide';
        console.log('400 Error message:', errorMessage);
        setError(errorMessage);
      } else {
        setError(err.response?.data?.message || 'Erreur lors du scan du QR Code');
      }
    } finally {
      setLoading(false);
    }
  };

  const resetScan = () => {
    setResult(null);
    setError(null);
    setQrCodeInput('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="card bg-gradient-to-br from-accent-50 to-emerald-50">
        <div className="flex items-start gap-3">
          <div className="p-3 bg-white rounded-xl shadow-md">
            <QrCode className="w-6 h-6 sm:w-7 sm:h-7 text-accent-600" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-1 sm:mb-2">
              {t('scanQRCode')}
            </h1>
            <p className="text-sm sm:text-base text-secondary-600">
              {t('scanPatientQR')}
            </p>
          </div>
        </div>
      </div>

      {/* Success Result */}
      {result && result.success && !result.accessDenied && (
        <div className="card bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-green-900 mb-1">Demande envoyée avec succès!</h3>
              <p className="text-sm text-green-700 mb-3">{result.message}</p>
              {result.patient && (
                <div className="bg-white rounded-lg p-3 space-y-2">
                  <p className="text-sm">
                    <span className="font-medium text-secondary-700">Patient:</span>{' '}
                    <span className="text-secondary-900">
                      {result.patient.user?.firstName} {result.patient.user?.lastName}
                    </span>
                  </p>
                  <p className="text-xs text-secondary-600">
                    Une demande d'accès a été envoyée au patient. Vous recevrez une notification dès qu'il l'acceptera.
                  </p>
                </div>
              )}
              <button
                onClick={resetScan}
                className="mt-3 text-sm text-green-600 hover:text-green-700 font-medium"
              >
                Scanner un autre code
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Access Denied - Non-Doctor User */}
      {result && result.accessDenied && (
        <div className="card bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-300">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <ShieldAlert className="w-8 h-8 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-red-900 mb-2 text-lg">🔒 Accès Refusé</h3>
              <p className="text-sm text-red-800 mb-3">{result.message}</p>
              <div className="bg-white rounded-lg p-4 border-l-4 border-red-500">
                <h4 className="font-semibold text-red-900 mb-2">Données Sensibles Protégées</h4>
                <ul className="space-y-1 text-xs text-red-700">
                  <li>• Ce QR code contient des informations médicales confidentielles</li>
                  <li>• Seuls les médecins authentifiés peuvent demander l'accès</li>
                  <li>• Le patient doit approuver chaque demande d'accès</li>
                  <li>• Cette mesure protège la vie privée du patient</li>
                </ul>
              </div>
              <button
                onClick={resetScan}
                className="mt-3 text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="card bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-red-900 mb-1">Erreur de scan</h3>
              <p className="text-sm text-red-700">{error}</p>
              <button
                onClick={resetScan}
                className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Réessayer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scanner Input */}
      {!result && (
        <div className="card">
          <div className="space-y-6">
            {/* QR Code Visual */}
            <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-secondary-50 to-accent-50 rounded-2xl border-4 border-dashed border-secondary-300 flex items-center justify-center p-6">
              <div className="text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-accent-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <QrCode className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-secondary-900 mb-2">
                  Scanner un QR Code patient
                </h3>
                <p className="text-sm sm:text-base text-secondary-600">
                  Entrez le code QR du patient ci-dessous
                </p>
              </div>
            </div>

            {/* Manual Input */}
            <div>
              <label className="label">Code QR du patient</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={qrCodeInput}
                  onChange={(e) => setQrCodeInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleScanQRCode()}
                  placeholder="Entrer le code QR (ex: QR-12345-ABCDE)"
                  className="input flex-1"
                  disabled={loading}
                />
                <button
                  onClick={handleScanQRCode}
                  disabled={loading || !qrCodeInput.trim()}
                  className="btn bg-gradient-to-r from-accent-500 to-emerald-500 hover:from-accent-600 hover:to-emerald-600 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <Camera className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-secondary-500 mt-2">
                Le patient doit vous montrer son QR Code depuis son application
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="card bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1 space-y-3">
            <h3 className="font-bold text-blue-900">{t('howToScan')}</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <div className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold text-blue-900">1</span>
                <p>{t('scanStep1')}</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold text-blue-900">2</span>
                <p>Copiez ou notez le code QR affiché</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold text-blue-900">3</span>
                <p>Entrez le code dans le champ ci-dessus</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold text-blue-900">4</span>
                <p>Cliquez sur le bouton pour envoyer la demande d'accès</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="card bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
            <CheckCircle className="w-5 h-5 text-purple-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-purple-900 mb-2">{t('important')}</h3>
            <ul className="space-y-1 text-sm text-purple-800">
              <li>• Le patient recevra une notification de votre demande</li>
              <li>• Il pourra accepter ou refuser l'accès à son dossier</li>
              <li>• Vous serez notifié de sa décision</li>
              <li>• L'accès est révocable à tout moment par le patient</li>
              <li>• <strong>Seuls les médecins authentifiés</strong> peuvent scanner les QR codes</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Privacy Protection Notice */}
      <div className="card bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0">
            <ShieldAlert className="w-5 h-5 text-yellow-700" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-yellow-900 mb-2">🔐 Protection des Données</h3>
            <p className="text-sm text-yellow-800 mb-2">
              Les informations médicales sont hautement sensibles et protégées:
            </p>
            <ul className="space-y-1 text-xs text-yellow-700">
              <li>✓ Chiffrement des données de bout en bout</li>
              <li>✓ Authentification obligatoire pour les médecins</li>
              <li>✓ Consentement explicite du patient requis</li>
              <li>✓ Traçabilité de tous les accès</li>
              <li>✓ Conformité RGPD et normes de santé</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorScanner;
