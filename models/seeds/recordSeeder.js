const mongoose = require('mongoose')
const Record = require('../record') // 載入 record model
mongoose.connect('mongodb://localhost/Record', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})