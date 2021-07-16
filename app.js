const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

//模板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//路由器
app.get('/', (req, res) => {
  res.render('index')
})

//監聽器
app.listen(port, () => {
  console.log(`The Express server is running on http://localhost:${port}.`)
})
