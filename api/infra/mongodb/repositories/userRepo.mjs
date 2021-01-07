import mongodb from 'mongodb'
const { ObjectID } = mongodb

export default (db) => {
  const UsersDb = db.collection('users')

  return {
    find: () => UsersDb.find().toArray(),

    findByUsername: username => UsersDb.findOne({ username }),

    findUserById: id => UsersDb.findOne({ _id: ObjectID(id) }),

    updateUser: (id, newUser) => UsersDb.findOneAndUpdate(
      { _id: ObjectID(id) },
      { $set: newUser },
      { returnOriginal: false }
    ),

    create: user => UsersDb.insertOne(user),

    deleteOne: id => UsersDb.deleteOne({ _id: id }),

    deleteUserProject: (userId, projectId) => UsersDb.updateOne(
      { _id: ObjectID(userId) },
      { $pull: { projectsIds: ObjectID(projectId) } },
      { returnOriginal: false }
    ),

    addProjectToUser: (userId, projectId) => UsersDb.findOneAndUpdate(
      { _id: ObjectID(userId) },
      { $push: { projectsIds: ObjectID(projectId) } },
      { returnOriginal: false })
  }
}
