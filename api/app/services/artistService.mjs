
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
      throw new Error('Artist couldn\'t have been created')
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

  return {
    getArtists,
    addArtist
  }
}
