import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import celebration from 'celebrate'
import routes from './routes'

const { errors } = celebration

export default ({
  config: {
    serverConfig,
    corsConfig
  },
  database,
  upload,
  log,
  services
}) => {
  const app = express()
  app.disable('x-powered-by')
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use('/public', express.static('public'))
  app.use(helmet())
  app.use(cors(corsConfig))

  app.use('/api', routes.map((route) => {
    return route({
      services,
      // config,
      upload,
      log
    })
  }))

  // Manage Celebrate validation errors
  app.use(errors())

  // Listening
  const server = app.listen(serverConfig.port, () => {
    log.info(`server listening on port ${serverConfig.port}`)
  })

  // Avoid dropping requests with 502s when restarting workers
  process.on('SIGTERM', () => {
    if (server) {
      // TODO check with keep-alive if it prevents closing app
      server.close()
    }

    process.exit(0)
  })

  app.on('close', () => {
    database.close()
  })

  return app
}
