const express = require('express')
const cors = require('cors')
require('dotenv').config()
const sessionModel = require('./Models/SessionModel')
const port = process.env.PORT

const sequelize = require('./db.config')
sequelize.sync().then(() => console.log("Database Ready!"))

const adminEnpoind = require('./Routes/AdminRoutes')
const pengunjungEnpoind = require('./Routes/PengunjungRoutes')
const datapengunjungEnpoind = require('./Routes/DataPengunjungRoutes')
const session = require('express-session')

const app = express()
app.use(express.json())
app.use(cors())

// const loadSessions = async (req) => {
//   const sessions = await sessionModel.findAll();
//   sessions.forEach(session => {
//     req.session[session.cookie_id] = {
//       admin_id: session.admin_id,
//       activity_code: session.activity_code,
//       activity_time: session.activity_time,
//     };
//   });
// };

app.use(session({
  secret: 'your_secret_key',  // Ganti dengan secret key yang aman
  // store: store,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000  // 30 hari
  }
}))

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

app.get('/putri', (req, res) => {
  res.send('Putri here')
})

app.use('/api/admin', adminEnpoind)
app.use('/api/pengunjung', pengunjungEnpoind)
app.use('/api/datapengunjung', datapengunjungEnpoind)

app.listen(port, () => {console.log(`server running to port ${port}`)})