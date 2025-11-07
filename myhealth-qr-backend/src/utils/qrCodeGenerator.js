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
    // Générer un token unique (gardé pour la compatibilité DB mais pas dans le QR)
    const qrToken = uuidv4();
    
    // QR CODE SIMPLIFIÉ: Juste l'ID du patient avec un préfixe court
    // Format: "MH-{patientId}" (ex: "MH-1", "MH-42", etc.)
    const qrData = `MH-${patientId}`;

    // Générer le QR code SIMPLE (sans chiffrement)
    const qrCodeImage = await QRCode.toDataURL(qrData, {
      errorCorrectionLevel: 'M', // M au lieu de H = QR plus simple
      type: 'image/png',
      quality: 0.92,
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
 * @param {String} qrData - Les données du QR code (format simple: "MH-{patientId}")
 * @returns {Object} - Les données décodées
 */
export const verifyQRCode = (qrData) => {
  try {
    // QR CODE SIMPLIFIÉ: Format "MH-{patientId}"
    if (!qrData || typeof qrData !== 'string') {
      throw new Error('Données QR code invalides');
    }

    // Vérifier le format "MH-{id}" où id peut être un nombre OU un UUID
    // Regex: MH- suivi de chiffres OU d'un UUID
    const match = qrData.match(/^MH-(.+)$/);
    if (!match) {
      throw new Error('Format QR code invalide');
    }

    const patientId = match[1];

    // Valider que c'est soit un nombre, soit un UUID valide
    const isNumber = /^\d+$/.test(patientId);
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(patientId);
    
    if (!isNumber && !isUUID) {
      throw new Error('ID patient invalide dans le QR code');
    }

    return {
      patientId,
      type: 'myhealth-qr',
      timestamp: Date.now() // Pour compatibilité
    };
  } catch (error) {
    throw new Error('QR code invalide ou format incorrect');
  }
};
