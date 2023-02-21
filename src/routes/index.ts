import { Application } from 'express'
import indexRouter from './indexRouter'
import authRouter from './auth'
import userRouter from './user'
import imageRouter from './image'
import contactsRouter from './contacts'
import masterClassRouter from './masterClass'
import feedbackRouter from './feedback'
import { authenticateToken } from '../middlewares/auth'
export const useRouter = (app: Application) => {
  app.use('/auth', authRouter)
  app.use('/user', authenticateToken, userRouter)
  app.use('/contacts', contactsRouter)
  app.use('/image', imageRouter)
  app.use('/masterclass', masterClassRouter)
  app.use('/feedback', feedbackRouter)
  app.use('/', indexRouter)
}

// make jsdoc for routes
