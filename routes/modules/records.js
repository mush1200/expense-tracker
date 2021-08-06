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
  const userId = req.user._id
  const { name, date, category, amount, merchant } = req.body
  if (name === "" || date === "" || category === "" || amount === "" || merchant === "") {
    return res.redirect('/records/new')
  }
  Record.create({ name, date, category, amount, merchant, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

//edit page
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .lean()
    .then((record) => res.render('edit', { record, categories }))
    .catch(error => console.log(error))
})

//修改支出
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, category, date, amount, merchant } = req.body
  return Record.findOne({ _id, userId })
    .then((record) => {
      record.name = name
      record.category = category
      record.date = date
      record.amount = amount
      record.merchant = merchant
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//刪除
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 匯出路由器
module.exports = router