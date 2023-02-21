import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { getUser } from '../controllers/user'
import config from '../config/config'

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization']
  if (authHeader == null) {
    return res.status(400).json({ status: 'error', message: 'No token' })
  }
  const token = authHeader.split(' ')[1]
  if (token == null)
    return res.status(400).json({ status: 'error', message: 'No token' })
  try {
    var decoded = jwt.verify(token, config.secret)
    if (typeof decoded === 'string') {
      return res.status(400).json({ status: 'error', message: 'Invalid token' })
    }
    const user = await getUser(decoded.email)
    if (!user) {
      return res.status(400).json({ status: 'error', message: 'Invalid token' })
    }
    req.user = { email: user.dataValues.email, role: user.dataValues.role }
    next()
  } catch (err: any) {
    console.log(err)
    if (err.message) {
      res.status(500).json({ status: 'error', message: err.message })
    } else {
      res
        .status(500)
        .json({ status: 'error', message: 'Internal server error' })
    }
  }
}
