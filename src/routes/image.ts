import { Router } from 'express'
import multer from 'multer'
// import id from 'nanoid'
import { v4 as id } from 'uuid'
import { Image } from '../models/Image'
import fs from 'fs'
import { authenticateToken } from '../middlewares/auth'
import {
  createImage,
  deleteImage,
  getImageById,
  getImages,
} from '../controllers/image'
import { booleanIze } from '../utils'
const router = Router()
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads')
  },
  filename: (req, file, cb) => {
    const mimetype = file.mimetype.split('/')[1]
    console.log(mimetype)
    cb(null, `${id()}.${mimetype}`)
  },
})
const upload = multer({
  storage,
  limits: { fileSize: 5000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg')
      return cb(null, false)
    cb(null, true)
  },
})
router.post(
  '/upload',
  authenticateToken,
  upload.single('image'),
  async (req, res) => {
    console.log(req)
    if (!req?.file) {
      return res.status(400).json({ message: 'No file' })
    }
    const { is_gallery, is_active } = req.body
    try {
      const image = await createImage(
        req.file.filename,
        req.file.originalname,
        req.file.size,
        is_gallery,
        is_active
      )
      res.status(201).json(image)
    } catch (error) {
      res.status(500).json({ message: 'Server side error' })
    }
  }
)

router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params
  try {
    const image = await getImageById(Number(id))
    if (!image) {
      return res.status(404).json({ message: 'Image not found' })
    }
    await fs.promises.unlink(`public/uploads/${image.dataValues.unique_name}`)
    await deleteImage(Number(id))
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Server side error' })
  }
  res.json({ message: 'Image deleted' })
})

router.get('/', async (req, res) => {
  const { is_gallery, is_active } = req.query
  try {
    const images = await getImages(
      booleanIze(is_gallery),
      booleanIze(is_active)
    )

    res.json(images)
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Server side error' })
  }
})

// get by id route
router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const image = await getImageById(Number(id))
    if (!image) {
      return res.status(404).json({ message: 'Image not found' })
    }
    res.json(image)
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Server side error' })
  }
})

router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params
  const { is_gallery, is_active } = req.body
  const image = await getImageById(Number(id))
  if (!image) {
    return res.status(404).json({ message: 'Image not found' })
  }
  try {
    await image.update({ is_gallery, is_active })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Server side error' })
  }
  res.json({ message: 'Image updated' })
})

export default router
