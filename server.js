const express = require('express')
require('dotenv').config()
const port = process.env.PORT

const app = express()

app.get('/', (req, res) => {
  res.send('GET request to homepage')
})

app.listen(port, () => {console.log(`server running to port ${port}`)})