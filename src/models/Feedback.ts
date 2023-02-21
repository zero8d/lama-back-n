import { DataTypes } from 'sequelize'
import { sequelize } from '../db'

interface Feedback {
  id: number
  name: string
  rate: number //min - 1, max - 5
  text: string
  date: Date
  source: string // by deafult - lama
  image: number // join image table
  contact: string
  is_active: boolean // by default - true
}

export const Feedback = sequelize.define('Feedback', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rate: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  source: {
    type: DataTypes.STRING,
    defaultValue: 'lama',
  },
  image: {
    type: DataTypes.INTEGER,
    references: {
      model: 'images',
      key: 'id',
    },
  },
  contact: {
    type: DataTypes.STRING,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
})
