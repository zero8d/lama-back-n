import { Router } from 'express'
import { createUser } from '../controllers/user'

const router = Router()
router.post('/new', async (req, res) => {
  const { email, password, first_name, surname, role } = req.body
  if (!email || !password || !first_name || !surname || !role) {
    return res.status(400).send({ status: 'error', message: 'Missing fields' })
  }
  // Check if email is valid
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const emailTest = emailRegex.test(email)
  if (!emailTest) {
    return res.status(400).send({ status: 'error', message: 'Invalid email' })
  }
  // Check if password is valid
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  const passwordTest = passwordRegex.test(password)
  if (!passwordTest) {
    return res.status(400).send({
      status: 'error',
      message:
        'Password must contain at least 1 uppercase letter, 1 lowercase letter and 1 number. Also it must be at least 8 characters long',
    })
  }
  // Check if role is valid
  const roleRegex = /^(admin|user)$/
  const roleTest = roleRegex.test(role)
  if (!roleTest) {
    return res.status(400).send({ status: 'error', message: 'Invalid role' })
  }
  try {
    await createUser(email, password, first_name, surname, role)
    res.json({ status: 'success', message: 'Account created' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 'error', message: 'Server side error' })
  }
})

export default router
