import celebrate from 'celebrate'
import { urlRegex } from '../../utils/index.mjs'

const { Joi } = celebrate

export default Joi.object({
  // _id: Joi.string(),
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
  )
})
