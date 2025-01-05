const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

User = sequelize.define('User', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique:true
  },
  first_name: {
      type: DataTypes.STRING(255), 
      allowNull: false,
  },
  last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
  },
  password: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
  },
  active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
  },
  inserted_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  timestamps: false, // Disable Sequelize's automatic timestamps
  tableName: 'Users', // Name of the table in the database
});

// Sync the database
sequelize.sync({ force: true }).then(async () => {
  console.log('Database synced!');

  const user = await User.create({ first_name: 'John', last_name: 'Doe', password: 'pass', email: 'john@example.com' });
});

module.exports = {sequelize, User};
