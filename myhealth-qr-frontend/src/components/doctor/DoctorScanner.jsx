import { QrCode, Camera, AlertCircle, CheckCircle, XCircle, Loader, ShieldAlert, X } from 'lucide-react';
import { useTranslation } from '../../utils/useTranslation';
import { useState, useEffect, useRef } from 'react';
import { scanPatientQR } from '../../services/doctorService';
import { useAuthStore } from '../../store/authStore';
import { Html5Qrcode } from 'html5-qrcode';

const DoctorScanner = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [qrCodeInput, setQrCodeInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const [scannerStatus, setScannerStatus] = useState('');
  const html5QrCodeRef = useRef(null);
  const isInitializingRef = useRef(false);

  // Initialize and cleanup scanner
  useEffect(() => {
    if (showScanner && !html5QrCodeRef.current && !isInitializingRef.current) {
      isInitializingRef.current = true;
      setScannerStatus('Initialisation de la caméra...');
      
      const initScanner = async () => {
        try {
          console.log("🔍 Starting scanner initialization...");
          
          // Check if element exists
          const element = document.getElementById("qr-reader");
          if (!element) {
            console.error("❌ qr-reader element not found in DOM");
            setScannerStatus('Erreur: Élément scanner introuvable');
            isInitializingRef.current = false;
            return;
          }
          console.log("✅ qr-reader element found");

          // Check if Html5Qrcode is available
          if (!Html5Qrcode) {
            console.error("❌ Html5Qrcode library not loaded");
            setScannerStatus('Erreur: Bibliothèque scanner non chargée');
            isInitializingRef.current = false;
            return;
          }

          const html5QrCode = new Html5Qrcode("qr-reader");
          console.log("✅ Html5Qrcode instance created");
          html5QrCodeRef.current = html5QrCode;

          const qrCodeSuccessCallback = (decodedText) => {
            console.log("✅✅ QR Code detected:", decodedText);
            console.log("📊 QR Code length:", decodedText.length);
            console.log("📝 QR Code first 50 chars:", decodedText.substring(0, 50));
            setQrCodeInput(decodedText);
            setScannerStatus('✅ Code détecté! Fermeture...');
            
            // Stop scanning after short delay
            setTimeout(() => {
              if (html5QrCodeRef.current) {
                html5QrCode.stop()
                  .then(() => {
                    console.log("Scanner stopped after successful scan");
                    html5QrCodeRef.current = null;
                    isInitializingRef.current = false;
                    setShowScanner(false);
                  })
                  .catch(err => console.error("Error stopping scanner:", err));
              }
            }, 500);
          };

          const config = { 
            fps: 10, 
            qrbox: function(viewfinderWidth, viewfinderHeight) {
              // Make the scan box 70% of the smaller dimension for better large QR code detection
              let minEdgePercentage = 0.7;
              let minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
              let qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);
              return {
                width: qrboxSize,
                height: qrboxSize
              };
            },
            aspectRatio: 1.0,
            disableFlip: false,
            // Better settings for various QR code sizes
            experimentalFeatures: {
              useBarCodeDetectorIfSupported: true
            },
            // Improve detection for large/complex QR codes
            rememberLastUsedCamera: true,
            supportedScanTypes: []  // Support all scan types
          };

          console.log("🎥 Requesting camera access...");
          setScannerStatus('Demande d\'accès à la caméra...');

          // Get available cameras
          const cameras = await Html5Qrcode.getCameras();
          console.log("📷 Available cameras:", cameras);

          if (cameras && cameras.length > 0) {
            // Use the first available camera
            const cameraId = cameras[0].id;
            console.log("📹 Using camera:", cameraId, cameras[0].label);
            setScannerStatus(`Démarrage caméra: ${cameras[0].label}...`);
            
            await html5QrCode.start(
              cameraId,
              config,
              qrCodeSuccessCallback
            );
            
            console.log("✅✅ Scanner started successfully!");
            setScannerStatus('✅ Caméra active - Scannez le QR code');
            isInitializingRef.current = false;
          } else {
            throw new Error("Aucune caméra disponible sur cet appareil");
          }
        } catch (err) {
          console.error("❌ Error initializing scanner:", err);
          console.error("Error details:", {
            name: err.name,
            message: err.message,
            stack: err.stack
          });
          
          let errorMessage = '';
          let isCameraSecurityError = false;
          
          if (err.name === 'NotAllowedError') {
            errorMessage = 'Permission caméra refusée. Autorisez l\'accès dans les paramètres du navigateur.';
          } else if (err.name === 'NotFoundError') {
            errorMessage = 'Aucune caméra trouvée sur cet appareil.';
          } else if (err.name === 'NotReadableError') {
            errorMessage = 'La caméra est utilisée par une autre application.';
          } else if (err.message && err.message.includes('secure context')) {
            errorMessage = 'La caméra nécessite HTTPS ou localhost. Utilisez localhost ou scannez manuellement.';
            isCameraSecurityError = true;
          } else {
            errorMessage = err.message || 'Erreur inconnue';
          }
            
          setScannerStatus(`❌ Erreur: ${errorMessage}`);
          setError(isCameraSecurityError 
            ? `⚠️ Caméra non disponible sur réseau HTTP. Solutions: 1) Accédez via https://localhost:5173 sur cet appareil, ou 2) Entrez le code manuellement.`
            : `Erreur caméra: ${errorMessage}`
          );
          html5QrCodeRef.current = null;
          isInitializingRef.current = false;
          
          // Don't auto-close on error, let user see the error and close manually
        }
      };

      // Small delay to ensure DOM is ready
      setTimeout(initScanner, 300);
    }

    // Cleanup on unmount
    return () => {
      if (html5QrCodeRef.current && !isInitializingRef.current) {
        console.log("🧹 Cleaning up scanner...");
        html5QrCodeRef.current.stop()
          .then(() => {
            console.log("✅ Scanner cleanup complete");
            html5QrCodeRef.current = null;
          })
          .catch(err => console.error("Cleanup error:", err));
      }
    };
  }, [showScanner]);

  const handleCloseScanner = () => {
    console.log("Manually closing scanner...");
    if (html5QrCodeRef.current) {
      html5QrCodeRef.current.stop()
        .then(() => {
          console.log("Scanner stopped manually");
          html5QrCodeRef.current = null;
          isInitializingRef.current = false;
          setShowScanner(false);
          setScannerStatus('');
        })
        .catch(err => {
          console.error("Error closing scanner:", err);
          html5QrCodeRef.current = null;
          isInitializingRef.current = false;
          setShowScanner(false);
          setScannerStatus('');
        });
    } else {
      isInitializingRef.current = false;
      setShowScanner(false);
      setScannerStatus('');
    }
  };

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
      
      // Si erreur 401/403 = pas autorisé
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError('Accès refusé: Vous devez être médecin pour scanner ce QR code');
        setResult({
          success: false,
          accessDenied: true,
          message: 'Données sensibles protégées - Accès médecin requis'
        });
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
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => showScanner ? handleCloseScanner() : setShowScanner(true)}
                    className="btn bg-white border shadow-sm hover:bg-gray-50 p-2"
                    title={showScanner ? 'Fermer la caméra' : 'Ouvrir la caméra'}
                  >
                    <Camera className="w-5 h-5 text-accent-600" />
                  </button>

                  <button
                    onClick={handleScanQRCode}
                    disabled={loading || !qrCodeInput.trim()}
                    className="btn bg-gradient-to-r from-accent-500 to-emerald-500 hover:from-accent-600 hover:to-emerald-600 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <Loader className="w-5 h-5 animate-spin" />
                    ) : (
                      <span className="font-medium">{t('sendRequest') || 'Envoyer'}</span>
                    )}
                  </button>
                </div>
              </div>
              <p className="text-xs text-secondary-500 mt-2">
                Le patient doit vous montrer son QR Code depuis son application
              </p>
            </div>
            {/* Camera Scanner */}
            {showScanner && (
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="label mb-0 text-base font-semibold">📷 Scanner avec la caméra</label>
                  <button
                    onClick={handleCloseScanner}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                    title="Fermer le scanner"
                  >
                    <X className="w-5 h-5 text-red-600" />
                  </button>
                </div>
                
                {/* Scanner Status */}
                {scannerStatus && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-800 text-center font-medium">
                      {scannerStatus}
                    </p>
                  </div>
                )}

                {/* Scanner Container */}
                <div className="w-full max-w-2xl mx-auto bg-gray-900 rounded-lg overflow-hidden shadow-xl">
                  <div id="qr-reader" className="min-h-[500px] w-full"></div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-green-800 text-center font-semibold">
                    🎯 <strong>Conseils pour un scan réussi:</strong>
                  </p>
                  <ul className="text-xs text-green-700 space-y-1">
                    <li>✓ Tenez le téléphone/caméra stable pendant 2-3 secondes</li>
                    <li>✓ Assurez-vous que le QR code est bien éclairé</li>
                    <li>✓ Pour les grands QR codes: reculez la caméra de 20-30 cm</li>
                    <li>✓ Pour les petits QR codes: rapprochez-vous</li>
                    <li>✓ Alignez le QR code au centre du cadre de scan</li>
                  </ul>
                  <p className="text-xs text-green-600 text-center mt-2 italic">
                    Le code sera automatiquement détecté et collé dans le champ ci-dessus
                  </p>
                </div>
              </div>
            )}
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
