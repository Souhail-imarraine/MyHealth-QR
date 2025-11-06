import { useState, useEffect } from 'react';
import { QrCode, Download, RefreshCw, Shield, Info } from 'lucide-react';
import { patientService } from '../../services/patientService';
import { useTranslation } from '../../utils/useTranslation';
import toast from 'react-hot-toast';

const PatientQRCode = () => {
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    fetchQRCode();
  }, []);

  const fetchQRCode = async () => {
    try {
      const response = await patientService.getQRCode();
      if (response.success) {
        setQrCode(response.data);
      }
    } catch (error) {
      toast.error(t('error'));
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (!confirm(t('regenerateQRCode') + '?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await patientService.regenerateQRCode();
      if (response.success) {
        setQrCode(response.data);
        toast.success(t('success'));
      }
    } catch (error) {
      toast.error(t('error'));
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!qrCode?.qrCode) return;
    
    const link = document.createElement('a');
    link.href = qrCode.qrCode;
    link.download = 'myhealth-qr-code.png';
    link.click();
    toast.success(t('success'));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
      {/* Header Card */}
      <div className="card bg-gradient-to-br from-accent-50 to-emerald-50">
        <div className="flex items-start gap-3">
          <div className="p-3 bg-white rounded-xl shadow-md">
            <QrCode className="w-6 h-6 sm:w-7 sm:h-7 text-accent-600" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-1 sm:mb-2">{t('myMedicalQRCode')}</h1>
            <p className="text-sm sm:text-base text-secondary-600">
              {t('shareQRCode')}
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
        {/* QR Code Display */}
        <div className="card text-center bg-gradient-to-br from-white to-accent-50">
          {qrCode?.qrCode ? (
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-block p-4 sm:p-6 bg-white border-4 border-accent-200 rounded-3xl shadow-xl">
                <img 
                  src={qrCode.qrCode} 
                  alt={t('myMedicalQRCode')} 
                  className="w-56 h-56 sm:w-64 sm:h-64 mx-auto"
                />
              </div>
            </div>
          ) : (
            <div className="py-8 sm:py-12">
              <QrCode className="w-20 h-20 sm:w-24 sm:h-24 mx-auto text-secondary-300 mb-4" />
              <p className="text-secondary-500 text-sm sm:text-base">{t('error')}</p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="space-y-4 sm:space-y-6">
          <div className="card bg-gradient-to-br from-accent-50 to-emerald-50 border-2 border-accent-200">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Info className="w-5 h-5 text-accent-600" />
              <h3 className="font-bold text-accent-900 text-base sm:text-lg">{t('howToUse')}</h3>
            </div>
            <ol className="space-y-3 text-sm sm:text-base text-accent-800">
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="inline-flex items-center justify-center w-7 h-7 bg-gradient-to-br from-accent-500 to-emerald-500 text-white rounded-full text-xs font-bold flex-shrink-0 shadow-md">1</span>
                <span className="pt-1">Montrez ce QR code à votre médecin lors d'une consultation</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="inline-flex items-center justify-center w-7 h-7 bg-gradient-to-br from-accent-500 to-emerald-500 text-white rounded-full text-xs font-bold flex-shrink-0 shadow-md">2</span>
                <span className="pt-1">Le médecin le scanne avec son application</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="inline-flex items-center justify-center w-7 h-7 bg-gradient-to-br from-accent-500 to-emerald-500 text-white rounded-full text-xs font-bold flex-shrink-0 shadow-md">3</span>
                <span className="pt-1">Vous recevez une notification de demande d'accès</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="inline-flex items-center justify-center w-7 h-7 bg-gradient-to-br from-accent-500 to-emerald-500 text-white rounded-full text-xs font-bold flex-shrink-0 shadow-md">4</span>
                <span className="pt-1">Approuvez ou refusez la demande selon votre choix</span>
              </li>
            </ol>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleDownload}
              disabled={!qrCode?.qrCode}
              className="btn bg-gradient-to-r from-accent-500 to-emerald-500 hover:from-accent-600 hover:to-emerald-600 text-white w-full text-base shadow-lg hover:shadow-xl"
            >
              <Download className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
              {t('downloadQRCode')}
            </button>

            <button
              onClick={handleRegenerate}
              disabled={loading}
              className="btn btn-outline w-full text-base"
            >
              <RefreshCw className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
              {t('regenerateQRCode')}
            </button>
          </div>

          <div className="card bg-gradient-to-br from-warning-50 to-orange-50 border-2 border-warning-200">
            <div className="flex gap-3">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-warning-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-warning-900">
                <strong className="block mb-1">{t('securityTip')}</strong> Ne partagez jamais une photo de votre QR code sur les réseaux sociaux. Il donne accès à votre dossier médical
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientQRCode;
