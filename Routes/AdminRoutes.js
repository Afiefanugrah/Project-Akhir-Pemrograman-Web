const express = require('express')
const router = express.Router()
const session = require('express-session')
const bcrypt = require('bcrypt')
const adminModel = require('../Models/AdminModel')
const sessionModel = require('../Models/SessionModel')

router.get('/', async (req, res) => {
  const admins = await adminModel.findAll()
  res.status(200).json({
    data: admins,
    metadata: "admin enpoind"
  })
})

router.post('/register', async (req, res) => {
  try {
    const {username, password} = req.body
    if (!username || !password) {
      return res.status(400).json({
        error: "Username and password are required"
      });
    }
    const passwordBcrypt = await bcrypt.hash(password, 10)
    const admin = await adminModel.create({
      username, password: passwordBcrypt
    })
    res.status(201).json({
      data: admin,
      metadata: "add admin success"
    })
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while creating the admin",
      details: error.message
    });
  }
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const adminData = await adminModel.findOne({ where: { username: username } });
    if (!adminData) {
      return res.json({ error: 'Invalid username or password' });
    }
    const compare = await bcrypt.compare(password, adminData.password);

    if (compare) {
      req.session.admin_id = adminData.id;
      req.session.cookie_id = req.sessionID;
      req.session.activity_code = '001';
      req.session.activity_time = new Date();

      await sessionModel.create({
        admin_id: adminData.id,               // Simpan admin_id
        cookie_id: req.sessionID,              // Simpan session ID
        activity_code: '001',                // Simpan kode aktivitas
        activity_time: new Date(),             // Simpan waktu aktivitas
        created_at: new Date(),                // Simpan waktu dibuat
        updated_at: new Date()                 // Simpan waktu diperbarui
      });

      res.json({
        data: adminData,
        metadata: 'Login successful, session created'
      });
    } else {
      res.json({
        error: 'Invalid username or password'
      });
    }
  } catch (err) {
    res.status(500).json({
      error: 'An error occurred during login'
    });
  }
});

router.get('/check-session', async (req, res) => {
  if (req.session.admin_id) {
    // Perbarui waktu aktivitas di session
    req.session.activity_time = new Date();

    // Perbarui waktu aktivitas di database
    await sessionModel.update(
      { activity_time: req.session.activity_time },
      { where: { cookie_id: req.session.cookie_id } }
    );

    res.json({
      admin_id: req.session.admin_id,
      cookie_id: req.session.cookie_id,
      activity_code: req.session.activity_code,
      activity_time: req.session.activity_time,
      message: 'Session is active and valid.'
    });
  } else {
    res.json({ message: 'No active session found.' });
  }
});

// Rute untuk dashboard admin yang dilindungi
// Rute untuk dashboard admin yang dilindungi
// router.get('/admin/dashboard', checkAdminSession, async (req, res) => {
//   res.json({
//     message: 'Welcome to the admin dashboard!',
//     adminId: req.session.admin_id,
//     activity_code: req.session.activity_code,
//     activity_time: req.session.activity_time,
//   });
// });


// router.get('/check-session', (req, res) => {
//   if (req.session.admin_id) {
//     res.json({
//       admin_id: req.session.admin_id,
//       cookie_id: req.session.cookie_id,
//       activity_code: req.session.activity_code,
//       activity_time: req.session.activity_time,
//       message: 'Session is active and valid.'
//     });
//   } else {
//     res.json({ message: 'No active session found.' });
//   }
// });


// router.post('/login', async (req, res) => {
//   const {username, password} = req.body
//   const adminData = await adminModel.findOne({where: {username: username}})
//   const compare = await bcrypt.compare(password, adminData.password)
//   if(compare === true) {
//     res.json({
//       data: adminData,
//       metadata: "endpoint login"
//     })
//   } else {
//     res.json({
//       error: "data invalid"
//     })
//   }
// })

module.exports = router