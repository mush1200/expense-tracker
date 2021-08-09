const Month = require('../months') // 載入 category model
const { monthSeeds } = require('./seed.json')
//引入mongoose
const db = require('../../config/mongoose')
//連線正常
db.once('open', () => {
  console.log('mongodb connected!')
  Month.create(monthSeeds)
    .then(() => {
      console.log('Success to set the month seeder')
      return db.close()
    })
    .catch(error => console.error(error))
})