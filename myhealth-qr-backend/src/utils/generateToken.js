import jwt from 'jsonwebtoken';

/**
 * Génère un token JWT pour l'utilisateur
 * @param {Object} user - L'utilisateur pour lequel générer le token
 * @returns {String} - Le token JWT
 */
export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    }
  );
};
