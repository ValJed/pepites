module.exports = {
  serverConfig: {
    port: 4000
  },
  dbConfig: {
    uri: 'mongodb://localhost:27017/pep',
    database: 'pep',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  corsConfig: {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  },
  jwtConfig: {
    secret: 'trytocrackmykeybitch'
  },
  uploadConfig: {
    path: 'public/uploads'
  },
  logConfig: {},
  mailConfig: {}
}
