import { DataTypes } from 'sequelize'
import { sequelize } from '../db'
export interface IContact {
  id: number
  type: string
  value: string
  is_active: boolean
}
// create Contact model
export const Contact = sequelize.define('contact', {
  type: {
    type: DataTypes.ENUM(
      'whatsapp',
      'telegram',
      'insta',
      'vk',
      'phone',
      'email',
      'address',
      'landmark'
    ),
    allowNull: false,
  },
  value: { type: DataTypes.STRING, allowNull: false },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
})
