const config = require('config')
const database = require('../infra/mongodb')
const http = require('../interfaces/index.js')

// Infra
const jsonwt = require('../infra/jwt')
const encrypt = require('../infra/encryption')
const log = require('../infra/logger')()
const fileUpload = require('../infra/fileUpload')

// Repositories
const userRepository = require('../infra/mongodb/repositories/userRepo')
const artistRepository = require('../infra/mongodb/repositories/artistRepo')
const imageRepository = require('../infra/mongodb/repositories/imageRepo')

// Services
const userService = require('./services/userService')
const artistService = require('./services/artistService')

const dbConfig = config.get('dbConfig')
const serverConfig = config.get('serverConfig')
const corsConfig = config.get('corsConfig')
// const uploadConfig = config.get('uploadConfig')
// const cloudinaryConfig = config.get('cloudinaryConfig')
// const mailConfig = config.get('mailConfig')
const jwtConfig = config.get('jwtConfig')

const startApp = async () => {
  try {
    const { client, db } = await database.connect(dbConfig)
    console.log('Connected to DB')

    const userRepo = userRepository(db)
    const artistRepo = artistRepository(db)
    const imageRepo = imageRepository(db)

    const jwt = jsonwt(jwtConfig)

    return http({
      database: client,
      log,
      upload: fileUpload(),
      config: {
        serverConfig,
        corsConfig
      },
      services: {
        user: userService({
          userRepo,
          encrypt,
          jwt,
          log
        }),
        artist: artistService({
          artistRepo,
          imageRepo,
          encrypt,
          jwt,
          log
        })
      }
    })
  } catch (err) {
    console.error('Error during app init', err)
  }
}

startApp()
