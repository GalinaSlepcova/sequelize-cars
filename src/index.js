const sequelize = require('./db');   
const Car = require('./models/car');     

async function main() {
  try {
    await sequelize.authenticate();
    console.log(' Подключение к SQLite установлено.');

    await sequelize.sync({ force: true });
    console.log(' Таблица cars синхронизирована.');

    await Car.bulkCreate([
      { brand: 'Mercedes',   model: 'Mercedes-Benz', year: 2026, price: 27_500_000, isAvailable: true  },
      { brand: 'Porsche', model: 'Porsche Cayman', year: 2018, price: 5_200_000, isAvailable: false },
      { brand: 'Ferrari',    model: 'Ferrari F40',   year: 1989, price: 400_250_000, isAvailable: true  },
    ]);
    console.log('Внесено 3 автомобиля.');

    const cars = await Car.findAll({ order: [['id', 'ASC']] });
    console.log('\n Список автомобилей:');
    console.table(cars.map((c) => ({
      id: c.id, brand: c.brand, model: c.model,
      year: c.year, price: c.price, isAvailable: c.isAvailable,
    })));

  } catch (err) {
    console.error('Ошибка:', err);
    process.exitCode = 1;

  } finally {
    await sequelize.close();
    console.log(' База данных закрыто.');
  }
}

main(); 