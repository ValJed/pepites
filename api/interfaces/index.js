import bodyParser from 'body-parser'
import helmet from 'helmet'
// import cors from'cors'
import express from 'express'

import routes from '~/api/interfaces/routes'

export default () => {
  const app = express()

  app.use(bodyParser.json())
  app.use(helmet())
  // app.use(cors())

  app.use('/', routes.map((route) => {
    return route()
  }))

  return app
}
