import { Sequelize } from 'sequelize'
import config from '../config/config'
export const sequelize = new Sequelize(
  config.db.database,
  config.db.dbusername,
  config.db.dbpassword,
  {
    host: config.db.dbhost,
    dialect: 'postgres',
  }
)

export const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
