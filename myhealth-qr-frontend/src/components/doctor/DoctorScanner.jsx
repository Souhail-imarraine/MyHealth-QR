import { QrCode, Camera, AlertCircle, CheckCircle } from 'lucide-react';
import { useTranslation } from '../../utils/useTranslation';
import { useState } from 'react';

const DoctorScanner = () => {
  const { t } = useTranslation();
  const [scanning, setScanning] = useState(false);

  const handleStartScan = () => {
    setScanning(true);
    // Logique de scan QR à implémenter avec html5-qrcode
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
              {t('scanQR')}
            </h1>
            <p className="text-sm sm:text-base text-secondary-600">
              Scannez le QR code d'un patient pour demander l'accès à son dossier
            </p>
          </div>
        </div>
      </div>

      {/* Scanner Area */}
      <div className="card">
        <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-secondary-50 to-accent-50 rounded-2xl border-4 border-dashed border-secondary-300 flex items-center justify-center">
          {!scanning ? (
            <div className="text-center p-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-accent-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                <Camera className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-secondary-900 mb-2">
                Prêt à scanner
              </h3>
              <p className="text-sm sm:text-base text-secondary-600 mb-6">
                Positionnez le QR code du patient dans le cadre
              </p>
              <button
                onClick={handleStartScan}
                className="btn bg-gradient-to-r from-accent-500 to-emerald-500 hover:from-accent-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl"
              >
                <Camera className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                Activer la caméra
              </button>
            </div>
          ) : (
            <div className="text-center p-6">
              <div className="animate-pulse">
                <QrCode className="w-20 h-20 sm:w-24 sm:h-24 text-accent-500 mx-auto mb-4" />
              </div>
              <p className="text-secondary-600 text-sm sm:text-base">Scan en cours...</p>
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="card bg-gradient-to-br from-accent-50 to-white border-2 border-accent-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-accent-100 rounded-xl">
              <CheckCircle className="w-5 h-5 text-accent-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-secondary-900 text-sm sm:text-base mb-1">
                Comment scanner ?
              </h3>
              <p className="text-xs sm:text-sm text-secondary-600">
                Demandez au patient de vous montrer son QR code depuis son application
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-warning-50 to-white border-2 border-warning-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-warning-100 rounded-xl">
              <AlertCircle className="w-5 h-5 text-warning-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-secondary-900 text-sm sm:text-base mb-1">
                Important
              </h3>
              <p className="text-xs sm:text-sm text-secondary-600">
                Le patient doit approuver votre demande d'accès avant consultation
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="card">
        <h3 className="font-bold text-secondary-900 text-base sm:text-lg mb-4">
          Processus d'accès
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 bg-gradient-to-br from-accent-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-md">
              1
            </div>
            <div className="flex-1 pt-0.5">
              <p className="text-sm sm:text-base text-secondary-700">
                Scanner le QR code du patient
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 bg-gradient-to-br from-accent-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-md">
              2
            </div>
            <div className="flex-1 pt-0.5">
              <p className="text-sm sm:text-base text-secondary-700">
                Une demande d'accès est envoyée automatiquement
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 bg-gradient-to-br from-accent-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-md">
              3
            </div>
            <div className="flex-1 pt-0.5">
              <p className="text-sm sm:text-base text-secondary-700">
                Le patient reçoit une notification
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 bg-gradient-to-br from-accent-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-md">
              4
            </div>
            <div className="flex-1 pt-0.5">
              <p className="text-sm sm:text-base text-secondary-700">
                Après approbation, accédez au dossier médical complet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorScanner;
