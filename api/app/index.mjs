
import config from 'config'
import database from '../infra/mongodb'
import http from '../interfaces/index'

// Infra
import jsonwt from '../infra/jwt'
import encrypt from '../infra/encryption'
import log from '../infra/logger'
import fileUpload from '../infra/fileUpload'

// Repositories
import userRepository from '../infra/mongodb/repositories/userRepo.mjs'
import artistRepository from '../infra/mongodb/repositories/artistRepo.mjs'
import imageRepository from '../infra/mongodb/repositories/imageRepo.mjs'
import infosRepository from '../infra/mongodb/repositories/infosRepo.mjs'

// Services
import userService from './services/userService.mjs'
import artistService from './services/artistService.mjs'

const dbConfig = config.get('dbConfig')
const serverConfig = config.get('serverConfig')
const corsConfig = config.get('corsConfig')
const uploadConfig = config.get('uploadConfig')
// const cloudinaryConfig = config.get('cloudinaryConfig')
// const mailConfig = config.get('mailConfig')
const jwtConfig = config.get('jwtConfig')

const startApp = async () => {
  try {
    const { client, db } = await database.connect(dbConfig)
    log.info('Connected to DB')

    const userRepo = userRepository(db)
    const artistRepo = artistRepository(db)
    const imageRepo = imageRepository(db)
    const infosRepo = infosRepository(db)

    const jwt = jsonwt(jwtConfig)

    return http({
      database: client,
      log,
      upload: fileUpload(encrypt),
      config: {
        serverConfig,
        corsConfig
      },
      services: {
        user: userService({
          userRepo,
          infosRepo,
          encrypt,
          jwt,
          log
        }),
        artist: artistService({
          artistRepo,
          imageRepo,
          encrypt,
          uploadConfig,
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
