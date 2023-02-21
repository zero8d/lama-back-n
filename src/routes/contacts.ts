import { Router } from 'express'
import {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
} from '../controllers/contact'
import { authenticateToken } from '../middlewares/auth'

// create crud router based on contact controllers
const router = Router()

router.get('/', async (req, res) => {
  const contacts = await getContacts()
  res.json(contacts)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const contact = await getContactById(Number(id))
  res.json(contact)
})

router.post('/', authenticateToken, async (req, res) => {
  const { type, value, is_active } = req.body
  if (!type || !value) {
    return res.status(400).send({ status: 'error', message: 'Missing fields' })
  }
  try {
    await createContact(type, value, is_active)
    res.json({ status: 'success', message: 'Contact created' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 'error', message: 'Server side error' })
  }
})

router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params
  const { type, value, is_active } = req.body
  if (!type && !value && !is_active) {
    return res.status(400).send({ status: 'error', message: 'Missing fields' })
  }
  try {
    await updateContact(Number(id), type, value, is_active)
    res.json({ status: 'success', message: 'Contact updated' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 'error', message: 'Server side error' })
  }
})

router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params
  try {
    await deleteContact(Number(id))
    res.json({ status: 'success', message: 'Contact deleted' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 'error', message: 'Server side error' })
  }
})

export default router
