import { app } from '../app'
import { createServer } from 'http'
import { connectDB } from '../db'

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

/**
 * Create HTTP server.
 */

var server = createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */
server.on('error', onError)
server.on('listening', onListening)
const main = async () => {
  await connectDB()
  server.listen(port)
}
function onError(err: any) {
  console.log(err)
}
function onListening() {
  console.log('Listening on ', port)
}
/**
 *
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: any) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

main()
