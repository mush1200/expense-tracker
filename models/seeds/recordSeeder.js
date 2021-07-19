const mongoose = require('mongoose')
const Record = require('../record') // 載入 record model
const { recordSeeds } = require('./seed.json')
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
//連線錯誤
db.on('error', () => {
  console.log('mongodb error!')
})
//連線正常
db.once('open', () => {
  
  Record.create(recordSeeds)
    .then(() => {
      console.log('Success to set the record seeder')
      return db.close()
    })
    .then(() => {
      console.log('mongodb disconnected!')
    })
    .catch(error => console.error(error))
})