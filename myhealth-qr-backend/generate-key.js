// Script pour générer une clé de chiffrement sécurisée
import crypto from 'crypto';

// console.log('\n🔐 Génération de clés de chiffrement sécurisées:\n');

// Générer une clé de 32 bytes (256 bits) en hexadécimal
const hexKey = crypto.randomBytes(32).toString('hex');
// console.log('QR_ENCRYPTION_KEY (Hex):');
// console.log(hexKey);

// console.log('\n---\n');

// Générer une clé de 32 bytes en base64
const base64Key = crypto.randomBytes(32).toString('base64');
// console.log('QR_ENCRYPTION_KEY (Base64):');
// console.log(base64Key);

// console.log('\n✅ Copiez l\'une de ces clés dans votre fichier .env\n');
