const multer = require('multer')

module.exports = ({ path }, encrypt, cloud) => {
  // const storage = multer.diskStorage({
  //   destination: (req, file, cb) => {

  //     cb(null, path)
  //   },
  //   filename: (req, file, cb) => {
  //     const fileHash = encrypt.encryptFileName(file.originalname)

  //     cb(null, fileHash)
  //   }
  // })

  // return multer({ storage })

  return multer()
}
