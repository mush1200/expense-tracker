const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000
//載入Record model
const Record = require('./models/record')
//載入Category model
const Category = require('./models/category')
//引入mongoose
require('./config/mongoose')
//載入method-override
const methodOverride = require('method-override')
//模板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
//類別下拉選單
const categories = []
Category.find()
  .lean()
  .then(category => categories.push(...category))
  .catch(error => console.log(error))

//路由器
//首頁
app.get('/', (req, res) => {
  const categoryIcons = {}
  const selectedCategory = req.query.categorySelect
  let totalAmount = 0

  Category.find()
    .lean()
    .then(categories => {
      categories.forEach((item) => {
        categoryIcons[item.categoryName] = item.categoryIcon
      })
    })
    .then(() => {
      Record.find()
        .lean()
        .sort({ date: 'desc'})
        .then((records) => {
          records.forEach(record => record['icon'] = categoryIcons[record.category])
          if (selectedCategory) {
            records = records.filter(record => record.category === selectedCategory)
          }
          records.forEach(record => totalAmount += record.amount)
          res.render('index', { categories, totalAmount, selectedCategory, records})
        })
    })
    .catch(error => console.log(error))
  
})
//new page
app.get('/records/new', (req, res)=> {
  res.render('new',{ categories})
})

//新增支出
app.post('/records', (req, res) => {
  const { name, date, category, amount} = req.body
  if (name === "" || date === "" || category === "" || amount === "") {
    return res.redirect('/records/new')
  }
  Record.create({name, date, category, amount})
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

//edit page
app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record, categories }))
    .catch(error => console.log(error))
})

//修改支出
app.put('/records/:id', (req, res) => {
  const id = req.params.id
  const {name, category, date, amount} = req.body
  return Record.findById(id)
    .then((record) => {
      record.name = name
      record.category = category
      record.date = date
      record.amount = amount
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//刪除
app.delete('/records/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
//監聽器
app.listen(port, () => {
  console.log(`The Express server is running on http://localhost:${port}.`)
})
