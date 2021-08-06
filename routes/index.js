// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 準備引入路由模組
//引入home、records模組程式碼
const home = require('./modules/home')
const records = require('./modules/records')
const users = require('./modules/users')
// 將網址結構符合 / 字串的 request 導向 home 模組、records 模組 
router.use('/', home)
router.use('/records', records)
router.use('/users', users)

// 匯出路由器
module.exports = router