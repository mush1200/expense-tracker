// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login')
})






// 匯出路由器
module.exports = router