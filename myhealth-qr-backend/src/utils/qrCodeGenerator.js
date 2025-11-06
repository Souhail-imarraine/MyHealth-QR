import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';

/**
 * Génère un QR Code unique pour un patient
 * @param {String} patientId - L'ID du patient
 * @returns {Object} - Contient le token et le QR code en base64
 */
export const generateQRCode = async (patientId) => {
  try {
    // Générer un token unique
    const qrToken = uuidv4();
    
    // Créer les données à encoder dans le QR code
    const qrData = JSON.stringify({
      patientId,
      token: qrToken,
      type: 'myhealth-qr',
      timestamp: Date.now()
    });

    // Générer le QR code en base64
    const qrCodeImage = await QRCode.toDataURL(qrData, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      quality: 0.95,
      margin: 1,
      color: {
        dark: '#1F2937',
        light: '#FFFFFF'
      },
      width: 300
    });

    return {
      token: qrToken,
      qrCode: qrCodeImage
    };
  } catch (error) {
    console.error('Erreur lors de la génération du QR code:', error);
    throw new Error('Impossible de générer le QR code');
  }
};

/**
 * Vérifie et décode les données d'un QR code
 * @param {String} qrData - Les données du QR code
 * @returns {Object} - Les données décodées
 */
export const verifyQRCode = (qrData) => {
  try {
    const decoded = JSON.parse(qrData);
    
    if (decoded.type !== 'myhealth-qr') {
      throw new Error('QR code invalide');
    }

    return decoded;
  } catch (error) {
    throw new Error('QR code invalide ou corrompu');
  }
};
