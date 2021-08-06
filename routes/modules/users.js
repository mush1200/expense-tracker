// 引用 Express 與 Express 路由器
const express = require('express')
const { exists } = require('../../models/user')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword} = req.body
  User.findOne({ email })
    .then(user => {
      if (user) {
        console.log('User already exists.')
        res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      } else {
        return User.create({
          name,
          email,
          password
        })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
      }
    })
})

//登出
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})
// 匯出路由器
module.exports = router