import { DataTypes } from 'sequelize'
import { sequelize } from '../db'
export interface IImage {
  id: number
  unique_name: string
  original_name: string
  size: number
  description: string | undefined // nullable
  is_active: boolean // by default - true
  is_gallery: boolean // by default - true
}

export const Image = sequelize.define('image', {
  unique_name: { type: DataTypes.STRING, unique: true, allowNull: false },
  original_name: { type: DataTypes.STRING },
  size: DataTypes.NUMBER,
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  is_gallery: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
})
