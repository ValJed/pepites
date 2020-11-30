module.exports = {
  serverConfig: {
    port: 'PORT'
  },
  dbConfig: {
    uri: 'MONGODB_URI',
    database: 'MONGODB_DB'
  },
  corsConfig: {
    origin: 'CORS_ORIGIN'
  },
  cloudinaryConfig: {
    cloud_name: 'CL_NAME',
    api_key: 'CL_API_KEY',
    api_secret: 'CL_API_SECRET'
  },
  mailConfig: {
    user: 'MAIL_USER',
    pass: 'MAIL_PASS'
  }
}
