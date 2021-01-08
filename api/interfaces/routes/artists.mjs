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
    artist: artistService,
    user: userService
  }
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

  router.post('/artists', verifyToken, validateArtist, async (req, res, next) => {
    try {
      const createdArtist = await artistService.addArtist(req.body)

      res.status(200).send(createdArtist)
    } catch (err) {
      res.status(err.status || 500).send(err.error)
    }
  })

  router.put('/artists', verifyToken, validateArtist, async (req, res, next) => {
    try {
      const updatedArtist = await artistService.updateArtist(req.body)

      res.status(200).send(updatedArtist)
    } catch (err) {
      res.status(err.status || 500).send(err.error)
    }
  })

  router.delete('/artists', async (req, res, next) => {
    try {
      const { artistId } = req.body

      if (!artistId || typeof artistId !== 'string') {
        res.status(400).send('Artist id must be sent.')
      }

      await artistService.deleteArtist(artistId)

      res.status(200).send()
    } catch (err) {
      console.log('err ===> ', err)
      res.status(err.status || 500).send(err.error)
    }
  })

  return router
}
