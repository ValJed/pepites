import express from 'express'
// import celeb from 'celebrate'
import ArtistSchema from '../../domain/ArtistSchema'
import Artist from '../../domain/Artist'

// const { celebrate, Segments } = celeb

// const validateArtist = celebrate({
//   [Segments.BODY]: ArtistSchema
// })

const validationErr = (error) => {
  return error.details.reduce((acc, err) => {
    return !acc
      ? err.message
      : `${acc}, ${err.message}`
  }, '')
}

export default ({
  services: {
    artist: artistService,
    user: userService
  },
  upload
}) => {
  const router = express.Router()

  const verifyToken = async (req, res, next) => {
    try {
      const { cookie } = req.headers

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

  router.get('/artists', async (req, res, next) => {
    try {
      const artists = await artistService.getArtists()

      res.status(200).send(artists)
    } catch (err) {
      res.status(err.status || 500).send(err.error)
    }
  })

  router.post(
    '/artists',
    verifyToken,
    // validateArtist,
    upload.single('image'),
    async (req, res, next) => {
      try {
        const { artist } = req.body

        const formattedArtist = JSON.parse(artist)

        const { error } = ArtistSchema().validate(formattedArtist)

        if (error) {
          return res.status(400).send(validationErr(error))
        }

        const createdArtist = await artistService.addArtist({
          artist: formattedArtist,
          img: req.file && req.file.filename
        })

        res.status(200).send(createdArtist)
      } catch (err) {
        res.status(err.status || 500).send(err.error)
      }
    })

  router.put(
    '/artists',
    verifyToken,
    upload.single('image'),
    async (req, res, next) => {
      try {
        const { artist } = req.body
        const formattedArtist = JSON.parse(artist)

        const { error } = ArtistSchema(true).validate(formattedArtist)

        if (error) {
          return res.status(400).send(validationErr(error))
        }

        const updatedArtist = await artistService.updateArtist({
          artist: formattedArtist,
          img: req.file && req.file.filename
        })

        res.status(200).send(updatedArtist)
      } catch (err) {
        res.status(err.status || 500).send(err.error)
      }
    })

  router.delete('/artists', async (req, res, next) => {
    try {
      const { artistId, artistImg } = req.body

      if (!artistId || typeof artistId !== 'string') {
        res.status(400).send('Artist id must be sent.')
      }

      await artistService.deleteArtist(artistId, artistImg)

      res.status(200).send()
    } catch (err) {
      res.status(err.status || 500).send(err.error)
    }
  })

  return router
}
