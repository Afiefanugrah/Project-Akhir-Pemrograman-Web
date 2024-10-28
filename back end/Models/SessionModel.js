const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db.config');

const Session = sequelize.define('Session', {
  admin_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // Session bisa tanpa admin
  },
  cookie_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  activity_code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  activity_time: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
}, {
  sequelize,
  tableName: 'sessions',
  timestamps: false,  // Karena kamu sudah mengelola timestamps sendiri
});

module.exports = Session