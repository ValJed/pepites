export default ({ username, email, hash, salt }) => {
  const user = {
    username,
    email,
    password: {
      hash,
      salt
    },
    CreatedAt: new Date()
  }

  return user
}
