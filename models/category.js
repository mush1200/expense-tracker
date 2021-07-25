const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema({
  categoryName: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  categoryName_en: {
    type: String,
    require: true
  },
  categoryIcon: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model('Category', categorySchema)