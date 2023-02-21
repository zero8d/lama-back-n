import { User } from '../models/User'
import bcrypt from 'bcrypt'
export const getUser = async (email: string) => {
  try {
    const user = await User.findOne({ where: { email } })
    return user
  } catch (error) {
    console.log(error)
    return null
  }
}

export const createUser = async (
  email: string,
  password: string,
  first_name: string,
  surname: string,
  role: string
) => {
  try {
    //hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      email,
      password: hashedPassword,
      first_name,
      surname,
      role,
    })
    return user
  } catch (error) {
    console.log(error)
    return null
  }
}
