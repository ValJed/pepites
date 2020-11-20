const jwt = require('jsonwebtoken')

module.exports = (config) => ({
  signin: (id) => {
    return jwt.sign({ id }, config.secret)
  },

  verify: (token) => {
    return jwt.verify(token, config.secret)
  }
})
