import { Router } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getUser } from '../controllers/user'
import config from '../config/config'
const router = Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user: any = await getUser(email)
  if (!user) {
    return res.status(404).json({ status: 'error', message: 'User not found' })
  }
  const pass = await bcrypt.compare(password, user.password)
  if (!pass) {
    return res.status(401).json({ status: 'error', message: 'Wrong password' })
  }
  try {
    const token = jwt.sign({ email: user.email }, config.secret, {
      expiresIn: config.tokenTime,
    })
    res.json({
      status: 'success',
      message: 'Logged in',
      token,
      expires: Date.now() + config.tokenTime,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 'error', message: 'Internal server error' })
  }
})

export default router
