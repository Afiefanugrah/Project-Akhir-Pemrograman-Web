const express = require('express')
require('dotenv').config()
const port = 3000

const app = express()

app.get('/', (req, res) => {
  res.send('GET request to homepage')
})

app.get('/dimas', (req, res) => {
  res.send('DIMAS ANJAY MABAR')
})

app.get('/nopal', (req, res) => {
  res.send('Pal Khun')
})

app.get('/marcel', (req, res) => {
  res.send('Marcel Hadir')
})

app.listen(port, () => {console.log(`server running to port ${port}`)})