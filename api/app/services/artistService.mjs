import fs from 'fs'
import path from 'path'
import Artist from '../../domain/Artist'

export default ({
  // usersRepo,
  artistRepo,
  imageRepo,
  uploadConfig,
  // cloud,
  // drive,
  encrypt,
  jwt,
  log
}) => {
  const cwd = process.cwd()

  const unlinkImg = (name) => {
    return new Promise((resolve, reject) => {
      fs.unlink(path.join(cwd, uploadConfig.path, name), (err) => {
        if (err) {
          log.info('This img doesn\'t exist as a file')
        }
        resolve()
      })
    })
  }

  const getArtists = async (id) => {
    const artists = await artistRepo.findAllSortified()

    if (!id) {
      return artists
    }

    const artist = artists
      .find(project => project._id.toString() === id)

    return artist
  }

  const addArtist = async ({ artist, img }) => {
    const artistEntity = Artist({ artist, newImg: img })

    const createdArtist = await artistRepo.create(artistEntity)

    if (!createdArtist.result.ok) {
      throw {
        status: 500,
        error: 'This artist could not be created.'
      }
    }

    return createdArtist.ops[0]
  }

  const updateArtist = async ({ artist, img }) => {
    if (artist.img && img) {
      await unlinkImg(artist.img)
    }

    const artistEntity = Artist({ artist, update: true, newImg: img })

    const { value } = await artistRepo.update(artist._id, artistEntity)

    if (!value) {
      throw {
        status: 500,
        error: 'Error when updating artist'
      }
    }

    return value
  }

  const deleteArtist = async (id, img) => {
    if (img) {
      await unlinkImg(img)
    }

    const { deletedCount } = await artistRepo.deleteOne(id)

    if (deletedCount !== 1) {
      throw {
        status: 500,
        error: 'This artist could not be deleted.'
      }
    }
  }

  const updateRanks = async (artists) => {
    const promises = artists.map(({ _id, rank }) => {
      return artistRepo.update(_id, { rank })
    })

    const errorsIds = (await Promise.all(promises))
      .reduce((acc, { value }) => value ? acc : [...acc, value._id], [])

    if (errorsIds.length) {
      throw {
        status: 500,
        error: `Some artists haven't been updated : ${errorsIds.join(', ')}`
      }
    }
  }

  return {
    getArtists,
    addArtist,
    updateArtist,
    deleteArtist,
    updateRanks
  }
}
