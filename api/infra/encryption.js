const crypto = require('crypto')

const encryptPsw = (password) => {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex')

  return {
    hash,
    salt
  }
}

const comparePsw = (password, hash, salt) => {
  const hashPassword = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex')

  return hashPassword === hash
}

const encryptFileName = (fileName) => {
  const nameToHash = fileName.toLowerCase()
  const salt = crypto.randomBytes(8).toString('hex')
  const hash = crypto.pbkdf2Sync(nameToHash, salt, 100, 15, 'sha512').toString('hex')

  if (nameToHash.includes('.png')) {
    return `${hash}.png`
  }
  if (nameToHash.includes('.jpg')) {
    return `${hash}.jpg`
  }
  if (nameToHash.includes('.gif')) {
    return `${hash}.gif`
  }

  console.error('This type of file is not supported !')
}

export default {
  encryptPsw,
  comparePsw,
  encryptFileName
}
