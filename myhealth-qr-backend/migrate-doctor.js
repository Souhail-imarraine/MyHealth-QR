import { sequelize } from './src/config/database.js';

(async () => {
  try {
    console.log('🚀 Début de la migration Doctor...');
    
    // Ajouter les colonnes manquantes
    await sequelize.query(`
      ALTER TABLE doctors 
      ADD COLUMN IF NOT EXISTS specialty VARCHAR(255),
      ADD COLUMN IF NOT EXISTS graduation_year INTEGER,
      ADD COLUMN IF NOT EXISTS experience INTEGER,
      ADD COLUMN IF NOT EXISTS bio TEXT;
    `);
    
    console.log('✅ Colonnes ajoutées avec succès');
    
    // Migrer les données existantes de specialization vers specialty
    await sequelize.query(`
      UPDATE doctors 
      SET specialty = specialization 
      WHERE specialty IS NULL AND specialization IS NOT NULL;
    `);
    
    console.log('✅ Données migrées avec succès');
    
    // Rendre les champs nullable
    await sequelize.query(`
      ALTER TABLE doctors 
      ALTER COLUMN specialization DROP NOT NULL,
      ALTER COLUMN license_number DROP NOT NULL;
    `);
    
    console.log('✅ Contraintes NOT NULL supprimées');
    console.log('🎉 Migration Doctor terminée avec succès!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur migration:', error.message);
    console.error(error);
    process.exit(1);
  }
})();