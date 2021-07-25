const Record = require('../record') // 載入 record model
const Category = require('../category')
const { recordSeeds } = require('./seed.json')
//引入mongoose
const db = require('../../config/mongoose')
//連線正常
db.once('open', () => {
  Record.create(recordSeeds)
    .then(() => {
      console.log('Success to set the record seeder')
      return db.close()
    })
    .then(() => {
      console.log('database connection close...')
    })
    .catch(error => console.error(error))
})