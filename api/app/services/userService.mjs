import userEntity from '../../domain/User'

export default ({
  userRepo,
  infosRepo,
  encrypt,
  jwt,
  log
}) => {
  const getAll = async () => {
    const users = await userRepo.findAll()

    return users.map(({ _id, username, email, admin }) => ({
      _id,
      username,
      email,
      admin
    }))
  }

  const findByEmail = async (email) => {
    const user = await userRepo.findUserByEmail(email)

    if (user) {
      return {
        success: true
      }
    }
    return {
      success: false,
      error: 'No user found for this email'
    }
  }

  const create = async ({ username, email, psw, repeatPsw }) => {
    const existingUser = await userRepo.findByUsername(username)

    if (existingUser || psw !== repeatPsw) {
      const error = existingUser
        ? 'This username already match an account'
        : 'Passwords must be the same'

      throw {
        status: 400,
        error
      }
    }

    const { hash, salt } = await encrypt.encryptPsw(psw)

    const newUser = userEntity({ username, email, hash, salt })

    const { insertedCount, insertedId } = await userRepo.create(newUser)

    if (insertedCount !== 1) {
      throw {
        status: 500,
        error: 'Error during user creation'
      }
    }
    return {
      _id: insertedId,
      ...newUser
    }
  }

  const remove = async (id) => {
    const { deletedCount } = await userRepo.deleteOne(id)

    if (deletedCount !== 1) {
      throw {
        status: 500,
        error: 'Could not delete this user'
      }
    }
  }

  const modify = async ({ username, psw, newUsername, newPsw }) => {
    if (!username.length || !psw.length) {
      return {
        success: false,
        error: 'Initial username and password should be provided'
      }
    }

    const user = await userRepo.findByUsername(username)

    if (!user) {
      return {
        success: false,
        error: 'No user found with this username'
      }
    }

    const isPasswordValid = await encrypt.comparePsw(
      psw,
      user.password.hash,
      user.password.salt
    )

    if (!isPasswordValid) {
      return {
        success: false,
        error: 'Password isn\'t valid'
      }
    }

    const password = !!newPsw.length && await encrypt.encryptPsw(newPsw)

    const newUser = {
      ...newUsername.length && { username: newUsername },
      ...password && { password }
    }

    const {
      lastErrorObject: { updatedExisting }
    } = await userRepo.updateUser(user._id, newUser)

    if (!updatedExisting) {
      return {
        success: false,
        error: 'Error when updating user in database'
      }
    }

    return {
      success: true
    }
  }

  const login = async ({ username, password }) => {
    const user = await userRepo.findByUsername(username)

    if (!user) {
      throw {
        status: 400,
        error: 'This username doesn\'t match any account'
      }
    }

    const isPasswordValid = await encrypt.comparePsw(
      password,
      user.password.hash,
      user.password.salt
    )

    if (!isPasswordValid) {
      throw {
        status: 400,
        error: 'This password is not valid'
      }
    }

    delete user.password

    const token = jwt.signin(user._id)

    return {
      token,
      user
    }
  }

  const verify = (token) => {
    jwt.verify(token)
  }

  const sendUserMail = ({ subject, email, message }) => {
    // return sendMail(subject, email, message)
  }

  const getInfos = async () => {
    return infosRepo.find()
  }

  const addOrModifyInfos = async (infos) => {
    const { value, ok } = await infosRepo.createOrUpdate(infos)

    if (ok !== 1 || !value) {
      throw {
        status: 500,
        error: 'Error when creating infos document'
      }
    }

    return value
  }

  const verifyToken = async (req, res, next) => {
    try {
      const { cookie } = req.headers

      const regex = /\pep-token=[^\s]+/

      const [tokenWithKey] = cookie.match(regex) || []

      if (!tokenWithKey) {
        return res.status(401).send()
      }

      const token = tokenWithKey.replace('pep-token=', '').replace(';', '')

      await verify(token)

      next()
    } catch (err) {
      return res.status(401).send()
    }
  }

  return {
    getAll,
    findByEmail,
    create,
    remove,
    modify,
    login,
    verify,
    sendUserMail,
    getInfos,
    addOrModifyInfos,
    verifyToken
  }
}
