import jwt from 'jsonwebtoken'

export default config => ({
  signin: (id) => {
    return jwt.sign({ id }, config.secret)
  },

  verify: (token) => {
    return jwt.verify(token, config.secret)
  }
})
