// const express = require('express')
import express from 'express'

export default () => {
  const router = express.Router()

  router.get('/artists', async (req, res, next) => {
    console.log('req ===> ', require('util').inspect(req, { colors: true, depth: 2 }))
  })

  return router
}
