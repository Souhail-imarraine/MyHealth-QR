import { sequelize } from './src/config/database.js';

const cleanupIndexes = async () => {
  try {
    console.log('🔧 Nettoyage des indexes de la table users...');
    
    // Vérifier quels indexes existent sur la table users
    const [indexes] = await sequelize.query(`
      SHOW INDEX FROM users WHERE Key_name != 'PRIMARY';
    `);
    
    console.log('📋 Indexes actuels sur la table users:');
    indexes.forEach(index => {
      console.log(`- ${index.Key_name} sur colonne ${index.Column_name}`);
    });
    
    // Supprimer les indexes en double (garder seulement l'index unique sur email)
    for (const index of indexes) {
      if (index.Key_name !== 'email' && index.Key_name !== 'users_email_unique') {
        try {
          await sequelize.query(`DROP INDEX \`${index.Key_name}\` ON users;`);
          console.log(`✅ Index ${index.Key_name} supprimé`);
        } catch (error) {
          console.log(`⚠️  Impossible de supprimer l'index ${index.Key_name}:`, error.message);
        }
      }
    }
    
    // Vérifier le nombre d'indexes restants
    const [finalIndexes] = await sequelize.query(`
      SHOW INDEX FROM users WHERE Key_name != 'PRIMARY';
    `);
    
    console.log(`📊 Nombre d'indexes après nettoyage: ${finalIndexes.length}`);
    console.log('✅ Nettoyage terminé');
    
  } catch (error) {
    console.error('❌ Erreur lors du nettoyage des indexes:', error);
  } finally {
    await sequelize.close();
  }
};

cleanupIndexes();