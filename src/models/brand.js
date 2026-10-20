const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Brand = sequelize.define('Brand', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  foundedYear: {
    type: DataTypes.INTEGER,
    validate: { min: 1900, max: new Date().getFullYear() },
  },
}, {
  tableName: 'brands',
  timestamps: true,
});

module.exports = Brand;