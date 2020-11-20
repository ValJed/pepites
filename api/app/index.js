import http from '~/api/interfaces'

const startApp = async () => {
  return http.start()
}

const app = startApp()

export default app
