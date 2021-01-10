import path from 'path'
import multer from 'multer'

const cwd = process.cwd()

export default (encrypt) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(cwd, 'public/uploads'))
    },
    filename: (req, file, cb) => {
      const fileHash = encrypt.encryptFileName(file.originalname)

      cb(null, fileHash)
    }
  })

  return multer({ storage })

  // return multer()
}
