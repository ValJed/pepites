import mongodb from 'mongodb'
const { ObjectID } = mongodb

export default (db) => {
  const ArtistsDb = db.collection('artists')

  return {
    findAll: () => ArtistsDb.find().toArray(),

    findByUsername: username => ArtistsDb.findOne({ username }),

    findUserById: id => ArtistsDb.findOne({ _id: ObjectID(id) }),

    update: (id, newUser) => ArtistsDb.findOneAndUpdate(
      { _id: ObjectID(id) },
      { $set: newUser },
      { returnOriginal: false }
    ),

    create: user => ArtistsDb.insertOne(user),

    deleteOne: id => ArtistsDb.deleteOne({ _id: id }),

    deleteUserProject: (userId, projectId) => ArtistsDb.updateOne(
      { _id: ObjectID(userId) },
      { $pull: { projectsIds: ObjectID(projectId) } },
      { returnOriginal: false }
    ),

    addProjectToUser: (userId, projectId) => ArtistsDb.findOneAndUpdate(
      { _id: ObjectID(userId) },
      { $push: { projectsIds: ObjectID(projectId) } },
      { returnOriginal: false })
  }
}
