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
    console.log('path ===> ', path.join(cwd, uploadConfig.path, name))
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
    const artists = await artistRepo.findAll()

    if (!id) {
      return artists
    }

    const artist = artists
      .find(project => project._id.toString() === id)

    return artist
  }

  const addArtist = async ({ artist, img }) => {
    const createdArtist = await artistRepo.create({
      ...artist,
      ...img && { img }
    })

    if (!createdArtist.result.ok) {
      throw {
        status: 500,
        error: 'This artist could not be created.'
      }
    }

    return createdArtist.ops[0]
  }

  const updateArtist = async ({ artist, img }) => {
    console.log('artist ===> ', artist)
    if (artist.img) {
      console.log('artist.img ===> ', artist.img)

      await unlinkImg(artist.img)
    }

    const newArtist = Artist(artist, true, img)

    const { value } = await artistRepo.update(artist._id, newArtist)

    if (!value) {
      throw {
        status: 500,
        error: 'Error when updating artist'
      }
    }

    return value
  }

  const deleteArtist = async (id) => {
    const { deletedCount } = await artistRepo.deleteOne(id)

    if (deletedCount !== 1) {
      throw {
        status: 500,
        error: 'This artist could not be deleted.'
      }
    }
  }

  return {
    getArtists,
    addArtist,
    updateArtist,
    deleteArtist
  }
}
