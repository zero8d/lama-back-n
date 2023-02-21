import { DataTypes } from 'sequelize'
import { sequelize } from '../db'
interface IMasterClass {
  id: number
  title: string
  description: string
  deadline: Date
  address: string
  landmark: string
  is_active: boolean // by default - true
  image: string | number // image table dan id yoki image unique name
  is_count_down: boolean // by default - false
}

// create MasterClass model
export const MasterClass = sequelize.define('MasterClass', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  landmark: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  image: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'images',
      key: 'id',
    },
  },
  is_count_down: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
})
