import { DataTypes } from 'sequelize'
import { sequelize } from '../db'

export interface IUser {
  id: number
  email: string
  password: string
  first_name: string
  surname: string
  role: string
}

export const User = sequelize.define('user', {
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  first_name: DataTypes.STRING,
  surname: DataTypes.STRING,
  role: DataTypes.STRING,
})
