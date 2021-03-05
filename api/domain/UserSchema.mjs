import celebrate from 'celebrate'

const { Joi } = celebrate

export default Joi.object({
  username: Joi.string(),
  email: Joi.string().allow(''),
  psw: Joi.string(),
  repeatPsw: Joi.string()
})
