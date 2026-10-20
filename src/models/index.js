const sequelize = require('../db');
const Brand = require('./brand');
const Car   = require('./car');


Brand.hasMany(Car, {
  foreignKey: { name: 'brandId', allowNull: false },
  as: 'cars',
  onDelete: 'CASCADE',
});

Car.belongsTo(Brand, {
  foreignKey: { name: 'brandId', allowNull: false },
  as: 'brand',
});

module.exports = { sequelize, Brand, Car };