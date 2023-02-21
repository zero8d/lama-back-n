const { connectDB, sequelize } = require('./dist/db')
const { MasterClass } = require('./dist/models/MasterClass')
const main = async () => {
  try {
    await connectDB()
    await sequelize.sync({ force: true })
    console.log('DB synced')
  } catch (error) {
    console.log(error)
  }
}

main()
