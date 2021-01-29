export default (db) => {
  const InfosDb = db.collection('infos')

  return {
    find: () => InfosDb.findOne(),

    createOrUpdate: newInfos => InfosDb.findOneAndUpdate(
      {},
      { $set: newInfos },
      { returnOriginal: false, upsert: true }
    )
  }
}
