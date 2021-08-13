const Category = require('../category') // 載入 category model
const Record = require('../record')
const { categorySeeds } = require('./seed.json')
//引入mongoose
const db = require('../../config/mongoose')
//連線正常
db.once('open', () => {
  Category.create(categorySeeds)
    .then(() => {
      console.log('Success to set the category seeder')
      return db.close()
    })
    .catch(error => console.error(error))
})