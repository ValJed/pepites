import multer from 'multer'

export default () => {
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
