import mongodb from 'mongodb'
const { ObjectID } = mongodb

export default (db) => {
  const ImageDb = db.collection('images')

  return {
    findAll: () => ImageDb.find().toArray(),

    findById: _id => ImageDb.findOne({ _id }),

    createOne: image => ImageDb.insertOne(image),

    deleteOne: id => ImageDb.deleteOne({ _id: ObjectID(id) })
  }
}
