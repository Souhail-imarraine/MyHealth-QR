import { sequelize } from '../src/config/database.js';
import { syncDatabase } from '../src/models/index.js';

export const setupTestDB = async () => {
  await sequelize.sync({ force: true });
};

export const cleanupTestDB = async () => {
  await sequelize.close();
};
