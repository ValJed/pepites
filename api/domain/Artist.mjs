import celebrate from 'celebrate'
import { urlRegex } from '../../utils/index.mjs'

const { Joi } = celebrate

export default Joi.object({
  name: Joi.string().required(),
  genre: Joi.string().required(),
  content: Joi.string().required(),
  socialLinks: Joi.object({
    facebook: Joi.string(),
    instagram: Joi.string(),
    youtube: Joi.string(),
    videos: Joi.object({
      youtube: Joi.array().items(Joi.string())
    }),
    releases: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        location: Joi.string().required(),
        link: Joi.string().pattern(urlRegex).required(),
        date: Joi.date().required()
      })
    )
  })
})
