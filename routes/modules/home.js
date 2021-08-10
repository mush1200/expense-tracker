// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
//載入Category model
const Category = require('../../models/category')
//載入Record model
const Record = require('../../models/record')
const Month = require('../../models/months')
//類別、月份下拉選單
const categories = []
const months = []
Category.find()
  .lean()
  .then(category => categories.push(...category))
  .catch(error => console.log(error))
Month.find()
  .lean()
  .sort({name_number: 'asc'})
  .then(month => months.push(...month))
  .catch(error => console.log(error))
//首頁
router.get('/', (req, res) => {
  const categoryIcons = {}
  const selectedCategory = req.query.categorySelect
  const selectedMonth = req.query.monthSelect
  let totalAmount = 0
  Category.find()
    .lean()
    .then(categories => {
      categories.forEach((item) => {
        categoryIcons[item.categoryName] = item.categoryIcon
      })
    })
    .then(() => {
      const userId = req.user._id
      Record.find({ userId })
        .lean()
        .sort({ date: 'desc' })
        .then((records) => {
          records.forEach(record => record['icon'] = categoryIcons[record.category])
          if (selectedMonth) {
            records = records.filter(record => {
              const date = record.date
              const monthOfDate = date.getMonth() + 1
              return monthOfDate.toString() === selectedMonth
            })
          }
          if (selectedCategory) {
            records = records.filter(record => record.category === selectedCategory)
          }     
          records.forEach(record => totalAmount += record.amount)
          res.render('index', { categories, totalAmount, selectedCategory, records, months, selectedMonth})
        })
    })
    .catch(error => console.log(error))
})
// 匯出路由器
module.exports = router