const mongoose = require('mongoose')
const Category = require('../category') // 載入 category model
const { categorySeeds } = require('./seed.json')
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
//連線錯誤
db.on('error', () => {
  console.log('mongodb error!')
})
//連線正常
db.once('open', () => {
  console.log('mongodb connected!')
  Category.create(categorySeeds)
    .then(() => {
      console.log('Success to set the category seeder')
      return db.close()
    })
    .catch(error => console.error(error))
})