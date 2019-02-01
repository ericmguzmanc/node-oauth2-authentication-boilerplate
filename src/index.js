const express = require('express')
require('dotenv').config() // dotenv - loads environment variables from .env file into process.env
const bodyParser = require('body-parser')
const cors = require('cors')
const { promisify } = require('util')

const initializeDatabase = require('./database')


const app = express()
app.use(bodyParser.json())

// CORS Enabled
app.use(cors())

// ℹ Routes import will be here
/**
 *  🤝🏻 Takes any incoming json string and
 *  creates attribute called body
 */

// 🔗 Log
// app.use((req, res, next) => {
//   console.log(`\x1b[36m%s\x1b[0m${new Date().toString()} => ${req.originalUrl}`, req.body)
//   next()
// })

// // 🧵 Routes

// // ---

// app.use(express.static('public'))

// // ⚠ 404 handler
// app.use((req, res, next) => {
//   res.status(404).send('404 Not Found :[ ')
// })

// // ⚠ 500 handler
// app.use((err, req, res, next) => {
//   console.error(err.stack)
//   res.sendFile(path.join(__dirname, '../public/500.html'))
// })

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => console.log('\x1b[33m%s\x1b[0m', `Server has started on port ${PORT}`));

const startServer = async () => {
  await initializeDatabase(app)

  const port = process.env.SERVER_PORT || 3000
  await promisify(app.listen).bind(app)(port)
  console.log('\x1b[33m%s\x1b[0m', `Listening on port ${port}`)
}

startServer()
