
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Car = sequelize.define('Car', {
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    validate: { min: 1900, max: new Date().getFullYear() + 1 },
  },
  price: {
    type: DataTypes.FLOAT,
    validate: { min: 0 },
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'cars',
  timestamps: true,
});

module.exports = Car;