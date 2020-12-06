const express = require('express')

module.exports = ({
  services: {
    artist: artistService,
    user: userService
  },
  log
}) => {
  const router = new express.Router()

  const verifyToken = async (req, res, next) => {
    try {
      const { cookie } = req.headers

      console.log('cookie ===> ', require('util').inspect(cookie, { colors: true, depth: 2 }))

      const regex = /\pep-token=[^\s]+/

      const [tokenWithKey] = cookie.match(regex) || []

      if (!tokenWithKey) {
        return res.status(401).send()
      }

      const token = tokenWithKey.replace('pep-token=', '').replace(';', '')

      await userService.verify(token)

      next()
    } catch (err) {
      return res.status(401).send()
    }
  }

  // Login user
  router.post('/login', async (req, res) => {
    try {
      const data = req.body

      const response = await userService.login(data)

      res.status(200).send(response)
    } catch (err) {
      log.error(err)
      res.status(err.status || 500).send(err.error || err)
    }
  })

  // Login user
  router.get('/verify', verifyToken, async (req, res, next) => {
    try {
      return res.status(200).send()
    } catch (err) {
      log.error(err)
      res.status(500).send(err.message)
    }
  })

  // Creating new user
  router.post('/users', async (req, res, next) => {
    try {
      const data = req.body

      const response = await userService.create(data)

      res.status(201).send(response)
    } catch (err) {
      log.error(err)
      res.status(500).send(err.message)
    }
  })

  // Updating user
  router.put('/users', async (req, res, next) => {
    try {
      const data = req.body

      const response = await userService.modify(data)

      if (response.success) {
        res.status(200).send(response)
      } else {
        res.status(400).send(response)
      }
    } catch (err) {
      log.error(err)
      res.status(500).send(err.message)
    }
  })

  // Send mail
  router.post('/mail', async (req, res, next) => {
    const data = req.body

    const { success } = await userService.sendUserMail(data)

    if (success) {
      return res.status(200).send()
    }

    res.status(500).send()
  })

  return router
}
