import celebrate from 'celebrate'
import { urlRegex } from '../../utils/index.mjs'

const { Joi } = celebrate

export default (update = false) => {
  return Joi.object({
    ...update && { _id: Joi.string().required() },
    name: Joi.string().required(),
    genre: Joi.string().required(),
    content: Joi.string().required(),
    img: Joi.string().allow(''),
    socialLinks: Joi.object({
      facebook: Joi.string().allow(''),
      instagram: Joi.string().allow(''),
      youtube: Joi.string().allow('')
    }),
    videos: Joi.object({
      youtube: Joi.array().items(Joi.string().allow(''))
    }),
    releases: Joi.array().items(Joi.string().allow('')),
    events: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        location: Joi.string().required(),
        link: Joi.string().pattern(urlRegex).required(),
        date: Joi.date().required()
      })
    ),
    createdAt: Joi.date(),
    updatedAt: Joi.date()
  })
}
