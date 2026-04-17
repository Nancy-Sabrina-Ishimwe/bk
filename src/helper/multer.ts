import multer, { FileFilterCallback } from 'multer'
import path from 'path'
import { Request } from 'express'

const fileUpload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    const ext = path.extname(file.originalname).toLowerCase()
    const allowedExtensions = [
      '.png', '.jpg', '.jpeg', '.gif', '.tif', '.webp', '.bmp', '.tiff'
    ]
    
    if (!allowedExtensions.includes(ext)) {
      cb(new Error('Invalid file type'))
      return
    }
    cb(null, true)
  },
})

export default fileUpload