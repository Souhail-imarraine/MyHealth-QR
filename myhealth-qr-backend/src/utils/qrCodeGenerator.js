import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

// Clé de chiffrement pour les QR codes (à mettre dans .env en production)
const QR_ENCRYPTION_KEY = process.env.QR_ENCRYPTION_KEY || 'myhealth-secure-qr-key-2024-change-in-production';
const ALGORITHM = 'aes-256-cbc';

/**
 * Chiffre les données du QR code
 */
const encryptQRData = (data) => {
  const key = crypto.createHash('sha256').update(QR_ENCRYPTION_KEY).digest();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  
  let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  // Retourne IV + données chiffrées (séparés par :)
  return iv.toString('hex') + ':' + encrypted;
};

/**
 * Déchiffre les données du QR code
 */
const decryptQRData = (encryptedData) => {
  try {
    const parts = encryptedData.split(':');
    if (parts.length !== 2) {
      throw new Error('Format invalide');
    }
    
    const iv = Buffer.from(parts[0], 'hex');
    const encrypted = parts[1];
    const key = crypto.createHash('sha256').update(QR_ENCRYPTION_KEY).digest();
    
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return JSON.parse(decrypted);
  } catch (error) {
    throw new Error('Impossible de déchiffrer les données du QR code');
  }
};

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
    const qrData = {
      patientId,
      token: qrToken,
      type: 'myhealth-qr',
      timestamp: Date.now()
    };

    // Chiffrer les données avant de les mettre dans le QR code
    const encryptedData = encryptQRData(qrData);

    // Générer le QR code en base64 avec les données CHIFFRÉES
    const qrCodeImage = await QRCode.toDataURL(encryptedData, {
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
 * @param {String} qrData - Les données du QR code (chiffrées)
 * @returns {Object} - Les données décodées
 */
export const verifyQRCode = (qrData) => {
  try {
    // Déchiffrer les données du QR code
    const decoded = decryptQRData(qrData);
    
    if (decoded.type !== 'myhealth-qr') {
      throw new Error('QR code invalide');
    }

    // Vérifier que le QR code n'est pas trop ancien (24 heures max par exemple)
    // const maxAge = 24 * 60 * 60 * 1000; // 24 heures
    // if (Date.now() - decoded.timestamp > maxAge) {
    //   throw new Error('QR code expiré');
    // }

    return decoded;
  } catch (error) {
    throw new Error('QR code invalide, corrompu ou expiré');
  }
};
