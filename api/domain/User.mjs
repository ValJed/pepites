export default ({ username, email, hash, salt }, update = false) => {
  return {
    username,
    email,
    password: {
      hash,
      salt
    },
    ...!update && { createdAt: new Date() },
    updatedAt: new Date()
  }
}
