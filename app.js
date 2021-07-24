const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000
//載入Record model
const Record = require('./models/record')
//載入Category model
const Category = require('./models/category')
//載入mongoose
const mongoose = require('mongoose')
const category = require('./models/category')
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
app.use(express.urlencoded({ extended: true }))
//路由器
app.get('/', (req, res) => {
  const categories = []
  Category.find()
    .lean()
    .then(category => categories.push(...category))
    .catch(error => console.log(error))
  res.render('index')
})

app.get('/expenses/new', (req, res)=> {
  res.render('new')
})

app.post('/expenses', (req, res) => {
  const { name, date, category, amount} = req.body
  if (name === "" || date === "" || category === "" || amount === "") {
    return res.redirect('/expenses/new')
  }
  Record.create({name, date, category, amount})
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

app.get('/expenses/edit', (req, res) => {
  res.render('edit')
})

//監聽器
app.listen(port, () => {
  console.log(`The Express server is running on http://localhost:${port}.`)
})
