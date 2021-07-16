const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000
//載入mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/Record', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection  //取得資料庫連線狀態

//連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
//連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

//模板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//路由器
app.get('/', (req, res) => {
  res.render('index')
})

//監聽器
app.listen(port, () => {
  console.log(`The Express server is running on http://localhost:${port}.`)
})
