const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

//載入method-override
const methodOverride = require('method-override')
//引入路由器
const routes = require('./routes/index')

//引入mongoose
require('./config/mongoose')

//模板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
//將request導入路由器
app.use(routes)

//監聽器
app.listen(port, () => {
  console.log(`The Express server is running on http://localhost:${port}.`)
})
