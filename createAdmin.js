const { connectDB, sequelize } = require('./dist/db')
const { createUser } = require('./dist/controllers/user')
const { User } = require('./dist/models/User')
// createUser('zero8d@yandex.ru', '12345678')

const main = async () => {
  try {
    await connectDB()
    await sequelize.sync({ force: true })
    console.log(sequelize.models.User)
    const user = await run(
      'zero8d@yandex.ru',
      '12345678',
      'Zero',
      'Dale',
      'admin'
    )
    console.log(user)
  } catch (error) {
    console.log(error)
  }
}

const run = async (email, password, first_name, surname, role) => {
  if (!email || !password || !first_name || !surname || !role) {
    return console.log('Please fill all fields')
  }
  // Check if email is valid
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const emailTest = emailRegex.test(email)
  if (!emailTest) {
    return console.log('Please enter a valid email address')
  }
  try {
    await createUser(email, password, first_name, surname, role)
    console.log('User created')
  } catch (error) {
    console.log(error)
  }
}

main()
