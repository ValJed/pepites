import express from 'express'
// import celeb from 'celebrate'
import ArtistSchema from '../../domain/ArtistSchema'
// import Artist from '../../domain/Artist'

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

  // Public routes
  router.get('/artists', async (req, res, next) => {
    try {
      const artists = await artistService.getArtists()

      res.status(200).send(artists)
    } catch (err) {
      res.status(err.status || 500).send(err.error)
    }
  })

  router.get('/artists/:id', async (req, res, next) => {
    try {
      const { id } = req.params

      const artist = await artistService.getArtists(id)

      res.status(200).send(artist)
    } catch (err) {
      res.status(err.status || 500).send(err.error)
    }
  })

  // Private routes
  router.post(
    '/artists',
    userService.verifyToken,
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
    userService.verifyToken,
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

  router.delete(
    '/artists',
    userService.verifyToken,
    async (req, res) => {
      try {
        const { artistId, artistImg } = req.body

        if (!artistId || typeof artistId !== 'string') {
          res.status(400).send('Artist id must be sent.')
        }

        await artistService.deleteArtist(artistId, artistImg)

        res.status(200).send()
      } catch (err) {
        res.status(err.status || 500).send(err.error || err)
      }
    })

  // Update artists ranks
  router.put(
    '/artists/ranks',
    userService.verifyToken,
    async (req, res) => {
      try {
        const { artists } = req.body

        await artistService.updateRanks(artists)

        res.status(200).send()
      } catch (err) {
        res.status(err.status || 500).send(err.error || err)
      }
    }
  )

  return router
}
