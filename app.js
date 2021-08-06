const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const session = require('express-session')
const usePassport = require('./config/passport')

//載入method-override
const methodOverride = require('method-override')
//引入路由器
const routes = require('./routes/index')
//引入mongoose
require('./config/mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const PORT = process.env.PORT || 3000
//模板引擎
app.engine('handlebars', exphbs({
   defaultLayout: 'main',
  helpers: {
    toDate: function (date) {
      return new Date(date.getTime() - (date.getTimezoneOffset() * 60 * 1000))
        .toISOString()
        .split("T")[0]
    }
  }
  }))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
//將request導入路由器
app.use(routes)



//監聽器
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}.`)
})
