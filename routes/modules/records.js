// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

//載入Category model
const Category = require('../../models/category')
//載入Record model
const Record = require('../../models/record')

//類別下拉選單
const categories = []
Category.find()
  .lean()
  .then(category => categories.push(...category))
  .catch(error => console.log(error))

//new page
router.get('/new', (req, res) => {
  res.render('new', { categories })
})

//新增支出
router.post('/', (req, res) => {
  const { name, date, category, amount } = req.body
  if (name === "" || date === "" || category === "" || amount === "") {
    return res.redirect('/records/new')
  }
  Record.create({ name, date, category, amount })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

//edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record, categories }))
    .catch(error => console.log(error))
})

//修改支出
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, category, date, amount } = req.body
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
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 匯出路由器
module.exports = router