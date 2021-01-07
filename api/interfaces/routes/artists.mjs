// const express = require('express')
// const Artist = require('../../domain/Artist')
import express from 'express'
import celeb from 'celebrate'
import ArtistSchema from '../../domain/ArtistSchema'

const { celebrate, Segments } = celeb

const validateArtist = celebrate({
  [Segments.BODY]: ArtistSchema
})

export default ({
  services: {
    artist: artistService
  }
}) => {
  const router = express.Router()

  router.get('/artists', async (req, res, next) => {
    try {
      const artists = await artistService.getArtists()

      res.status(200).send(artists)
    } catch (err) {
      res.status(err.status || 500).send(err.error)
    }
  })

  router.post('/artists', validateArtist, async (req, res, next) => {
    try {
      const createdArtist = await artistService.addArtist(req.body)

      res.status(200).send(createdArtist)
    } catch (err) {
      res.status(err.status || 500).send(err.error)
    }
  })

  router.put('/artists', validateArtist, async (req, res, next) => {
    try {
      const updatedArtist = await artistService.updateArtist(req.body)

      res.status(200).send(updatedArtist)
    } catch (err) {
      res.status(err.status || 500).send(err.error)
    }
  })

  return router
}
