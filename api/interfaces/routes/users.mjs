import express from 'express'
import celeb from 'celebrate'
import InfoSchema from '../../domain/InfoSchema'

const { celebrate, Segments } = celeb

const validateInfo = celebrate({
  [Segments.BODY]: InfoSchema
})

export default ({
  services: {
    artist: artistService,
    user: userService
  },
  log
}) => {
  const router = new express.Router()

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
  router.get(
    '/verify',
    userService.verifyToken,
    async (req, res, next) => {
      try {
        return res.status(200).send()
      } catch (err) {
        log.error(err)
        res.status(err.status || 500).send(err.error || err)
      }
    })

  // Creating new user
  router.post(
    '/users',
    userService.verifyToken,
    async (req, res, next) => {
      try {
        const data = req.body

        const response = await userService.create(data)

        res.status(201).send(response)
      } catch (err) {
        log.error(err)
        res.status(err.status || 500).send(err.error || err)
      }
    })

  // Updating user
  router.put(
    '/users',
    userService.verifyToken,
    async (req, res, next) => {
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
        res.status(err.status || 500).send(err.error || err)
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

  // Get Infos
  router.get(
    '/infos',
    async (req, res) => {
      try {
        const infos = await userService.getInfos()

        res.status(200).send(infos)
      } catch (err) {
        res.status(err.status || 500).send(err.error || err)
      }
    }
  )

  // Add global infos
  router.post(
    '/infos',
    userService.verifyToken,
    validateInfo,
    async (req, res, next) => {
      try {
        const data = req.body

        const result = await userService.addOrModifyInfos(data)

        res.status(200).send(result)
      } catch (err) {
        console.log('err ===> ', err)
        res.status(err.status || 500).send(err.error || err)
      }
    })

  return router
}
