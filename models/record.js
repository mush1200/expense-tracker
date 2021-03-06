const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  merchant: {
    type: String,
    require: true
  },
  userId: {
    type: Schema.ObjectId,
    ref: 'User',
    index: true,
    required: true,
  },
  monthId: {
    type: Schema.ObjectId,
    ref: 'Month',
  }
})
module.exports = mongoose.model('Record', recordSchema)