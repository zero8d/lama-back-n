import { Router } from 'express'
import {
  getMasterClasses,
  getMasterClassById,
  createMasterClass,
  updateMasterClass,
} from '../controllers/masterClass'
import { authenticateToken } from '../middlewares/auth'
import { booleanIze } from '../utils'

const router = Router()
router.get('/', async (req, res) => {
  const { is_active } = req.query
  const masterClasses = await getMasterClasses(booleanIze(is_active))
  res.send(masterClasses)
})
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const masterClass = await getMasterClassById(id)
  res.send(masterClass)
})
router.post('/', authenticateToken, async (req, res) => {
  const {
    title,
    description,
    deadline,
    address,
    landmark,
    is_active,
    image,
    is_count_down,
  } = req.body

  if (!title || !description || !deadline || !address || !landmark) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Required fields not found' })
  }
  if (!deadline.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/)) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Date is not in valid format' })
  }
  const masterClass = await createMasterClass(
    title,
    description,
    deadline,
    address,
    landmark,
    is_active,
    image,
    is_count_down
  )
  res.send(masterClass)
})
router.put('/:id', authenticateToken, async (req, res) => {
  const id = Number(req.params.id)
  const {
    title,
    description,
    deadline,
    address,
    landmark,
    is_active,
    image,
    is_count_down,
  } = req.body

  const masterClass = await updateMasterClass(
    id,
    title,
    description,
    deadline,
    address,
    landmark,
    is_active,
    image,
    is_count_down
  )
  res.send(masterClass)
})

// delete route
router.delete('/:id', authenticateToken, async (req, res) => {
  const id = Number(req.params.id)
  const masterClass = await getMasterClassById(id)
  if (!masterClass) {
    return res.status(404).json({ message: 'Master Class not found' })
  }
  try {
    await masterClass.destroy()
    res.json({ message: 'Master Class deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Server side error' })
  }
})
export default router
