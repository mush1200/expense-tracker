const express = require('express')
const exphbs = require('express-handlebars')
const hbshelpers = require('handlebars-helpers')
const app = express()
const multihelpers = hbshelpers()
const session = require('express-session')
const usePassport = require('./config/passport')
const flash = require('connect-flash')
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
   defaultLayout: 'main', helpers: multihelpers,
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
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
//將request導入路由器
app.use(routes)



//監聽器
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}.`)
})
