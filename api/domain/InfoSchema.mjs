import celebrate from 'celebrate'

const { Joi } = celebrate

const contactsArrays = Joi.array().items(
  Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().required()
  })
)

export default Joi.object({
  socialLinks: Joi.object({
    facebook: Joi.string().allow(''),
    youtube: Joi.string().allow(''),
    instagram: Joi.string().allow('')
  }),
  contacts: {
    management: contactsArrays,
    booking: contactsArrays,
    press: contactsArrays
  }
})
