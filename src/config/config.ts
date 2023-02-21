import dotenv from 'dotenv'
dotenv.config()

const secret = process.env.SECRET
const database = process.env.DATABASE
const dbusername = process.env.DBUSERNAME
const dbhost = process.env.DBHOST
const dbpassword = process.env.DBPASSWORD
const port = process.env.PORT
const tokenTime = process.env.TOKENTIME
if (!secret) {
  throw new Error('Secret not found')
}
if (!database) {
  throw new Error('Database not found')
}
if (!dbusername) {
  throw new Error('Database username not found')
}
if (!dbhost) {
  throw new Error('Database host not found')
}
if (!dbpassword) {
  throw new Error('Database password not found')
}
if (!port) {
  throw new Error('Port not found')
}
if (!tokenTime) {
  throw new Error('Token time not found')
}

export { database, dbusername, dbhost, dbpassword }

export default {
  secret,
  db: { database, dbusername, dbhost, dbpassword },
  port,
  tokenTime,
}
