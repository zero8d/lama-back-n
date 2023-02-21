const { getUser } = require('./dist/controllers/user')
const { connectDB } = require('./dist/db')

// create main function that connects db and calls getUser function
const main = async () => {
  try {
    // connect to DB
    await connectDB()
    // get user from DB
    const user = await getUser('zero8d@yandex.ru')
    console.log(user.password)
  } catch (error) {
    console.log(error)
  }
}
// call main function
main()
//
