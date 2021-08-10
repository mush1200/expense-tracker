const mongoose = require('mongoose')
const Schema = mongoose.Schema
const monthSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  name_en: {
    type: String,
    require: true
  },
  name_number: {
    type: Number,
    require: true
  }
})
module.exports = mongoose.model('Month', monthSchema)