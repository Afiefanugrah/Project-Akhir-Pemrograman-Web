const { Model, DataTypes  } = require('sequelize')
const sequelize = require('../db.config')

class Datamasuk extends Model {}

Datamasuk.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nim: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  keperluan: {
    type: DataTypes.TEXT,
    allowNull: false
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
  modelName: "Datamasuk",
  timestamps: false,
})

Pengunjung.belongsTo(Pengunjung, { foreignKey: 'nim', targetKey: 'nim' });

module.exports = Datamasuk