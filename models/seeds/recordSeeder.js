const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../record') // 載入 record model
const User = require('../user')
const Category = require('../category')
const { recordSeeds, userSeeds } = require('./seed.json')

//引入mongoose
const db = require('../../config/mongoose') 

//連線正常
db.once('open', () => {
    bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(userSeeds[0].password, salt))
    .then(hash => User.create({
      name: userSeeds[0].name,
      email: userSeeds[0].email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      recordSeeds.forEach((item) => {
        item['userId'] = userId
      })
      Record.create(recordSeeds)
        .then(() => {
          console.log('Success to set the record seeder')
          return process.exit()
        })
        .catch(error => console.error(error))
    })
})