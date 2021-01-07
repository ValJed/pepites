// const { MongoClient } = require('mongodb')
import mongodb from 'mongodb'

let client
let db

const connect = async ({
  uri,
  database,
  options
}) => {
  if (!client) {
    client = new mongodb.MongoClient(uri, options)

    await client.connect()

    db = client.db(database)

    return {
      client,
      db
    }
  }
}

const disconnect = async () => {
  await client.close()
}

export default {
  client: () => client,
  db: () => db,
  connect,
  disconnect
}
