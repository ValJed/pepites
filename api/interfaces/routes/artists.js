// const express = require('express')
const express = require('express')

module.exports = ({
  services: {
    artist: artistService
  }
}) => {
  const router = express.Router()

  router.get('/artists', async (req, res, next) => {
    try {
      const artists = artistService.getArtists()

      res.status(200).send(artists)
    } catch (err) {
      res.status(err.status || 500).send(err.error)
    }
  })

  return router
}
