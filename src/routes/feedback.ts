import { Router } from 'express'
import {
  updateFeedback,
  createFeedback,
  getFeedbackById,
  getFeedbacks,
  deleteFeedback,
} from '../controllers/feedback'
import { authenticateToken } from '../middlewares/auth'
import { booleanIze } from '../utils'

// create router instance for feedback controllers
const router = Router()
router.get('/', async (req, res) => {
  const { is_active } = req.query
  const feedbacks = await getFeedbacks(booleanIze(is_active))
  res.send(feedbacks)
})
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const feedback = await getFeedbackById(id)
  res.send(feedback)
})
router.post('/', authenticateToken, async (req, res) => {
  const { name, rate, text, date, source, image, contact, is_active } = req.body

  if (!name || !rate || !text || !date) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Required fields not found' })
  }

  const feedback = await createFeedback(
    name,
    rate,
    text,
    date,
    source,
    image,
    contact,
    is_active
  )
  res.send(feedback)
})
router.put('/:id', authenticateToken, async (req, res) => {
  const id = Number(req.params.id)
  const { name, rate, text, date, source, image, contact, is_active } = req.body

  if (!name && !rate && !text && !date && !source && !image && !contact) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Required fields not found' })
  }
  const feedback = await updateFeedback(
    id,
    name,
    rate,
    text,
    date,
    source,
    image,
    contact,
    is_active
  )
  res.send(feedback)
})
router.delete('/:id', authenticateToken, async (req, res) => {
  const id = Number(req.params.id)
  try {
    const result = await deleteFeedback(id)
    if (result && result > 0) {
      return res.json({
        status: 'success',
        message: 'Feedback deleted successfully',
      })
    }
    res.status(404).json({ status: 'error', message: 'Feedback not found' })
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Server error' })
  }
})

export default router
