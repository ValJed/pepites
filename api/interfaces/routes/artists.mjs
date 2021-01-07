// const express = require('express')
// const Artist = require('../../domain/Artist')
import express from 'express'
import celeb from 'celebrate'
import Artist from '../../domain/Artist'

const { celebrate, Segments } = celeb

const validateArtist = celebrate({
  [Segments.BODY]: Artist
})

export default ({
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

  router.post('/artists', validateArtist, async (req, res, next) => {
    try {
      const artists = artistService.createArtist(req.body)

      res.status(200).send(artists)
    } catch (err) {
      res.status(err.status || 500).send(err.error)
    }
  })

  return router
}
