const { sequelize, Brand, Car } = require('./models');

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Вы вошли в базу данных.');

    await sequelize.sync({ force: true });
    console.log('Таблицы brands и cars созданы (с внешним ключом brandId).');

    
    const ferrari   = await Brand.create({ name: 'Ferrari',   country: 'Italy', foundedYear: 1939 });
    const mercedes_benz = await Brand.create({ name: 'Mercedes_benz', country: 'Germany',  foundedYear: 1926 });

    
    await ferrari.createCar({ model: 'F430 Spider',    year: 2007, price: 14_000_000, isAvailable: true  });
    await ferrari.createCar({ model: '599 GTB Fiorano',      year: 2010, price:   15_000_000, isAvailable: false });
    await ferrari.createCar({ model: 'SF90 Stradale',    year: 2021, price:   39_900_000, isAvailable: true  });

    await mercedes_benz.createCar({ model: 'CLS AMG 63 AMG2',   year: 2014, price: 6_700_000, isAvailable: false });
    await mercedes_benz.createCar({ model: 'AMG 63 AMG3', year: 2019, price: 12_000_000, isAvailable: true  });

   
    const ferrariCount = await ferrari.countCars();
    console.log(`У марки ${ferrari.name} — ${ferrariCount} модел(и/ей).`);

    const brands = await Brand.findAll({
      include: [{ model: Car, as: 'cars' }],
      order: [['id', 'ASC']],
    });

    for (const b of brands) {
      console.log(`\n  ${b.name} (${b.country}, осн. ${b.foundedYear})`);
      console.table(b.cars.map((c) => ({
        id: c.id, model: c.model, year: c.year,
        price: c.price, isAvailable: c.isAvailable, brandId: c.brandId,
      })));
    }
    const F430_Spider = await Car.findOne({ where: { model: 'F430 Spider' } });
    const F430_SpiderBrand = await F430_Spider.getBrand();
    console.log(`\n ${F430_Spider.model} → марка: ${F430_SpiderBrand.name} (${F430_SpiderBrand.country})`);

  } catch (err) {
    console.error('Ошибка:', err);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
    console.log('\nБаза данных закрыто.');
  }
}

main();