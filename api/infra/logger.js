const pino = require('pino')
const isDev = process.env.NODE_ENV === 'development'

const logger = ({
  name = 'blog',
  level = 'info',
  enabled = true
} = {}) => {
  return pino({
    name,
    level,
    enabled,
    useLevelLabels: true,
    ...isDev ? { prettyPrint: { colorize: true } } : {}
  }, pino.destination())
}

module.exports = logger
