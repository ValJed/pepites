
export default ({
  // usersRepo,
  artistRepo,
  imageRepo,
  // uploadConfig,
  // cloud,
  // drive,
  encrypt,
  jwt,
  log
}) => {
  const getArtists = async (id) => {
    const artists = await artistRepo.findAll()

    if (!id) {
      return artists
    }

    const artist = artists
      .find(project => project._id.toString() === id)

    return artist
  }

  const addArtist = async (artist) => {
    const createdArtist = await artistRepo.create(artist)

    if (!createdArtist.result.ok) {
      throw {
        status: 500,
        error: 'This artist could not be created.'
      }
    }

    console.log('createdArtist ===> ', createdArtist)

    return {
      _id: createdArtist.insertedId,
      ...artist
    }
  }

  const updateArtist = async (artist) => {
    const updatedArtist = await artistRepo.update(artist)
  }

  const deleteArtist = async (id) => {
    // const { deletedCount } = await artistRepo.deleteOne(id)

    // if (deletedCount !== 1) {
    throw {
      status: 500,
      error: 'This artist could not be deleted.'
    }
    // }
  }

  return {
    getArtists,
    addArtist,
    updateArtist,
    deleteArtist
  }
}
