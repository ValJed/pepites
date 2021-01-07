import pino from 'pino'
const isDev = process.env.NODE_ENV === 'development'

export default pino({
  name: 'pepites',
  level: 'info',
  enabled: true,
  useLevelLabels: true,
  ...isDev ? { prettyPrint: { colorize: true } } : {}
}, pino.destination())
