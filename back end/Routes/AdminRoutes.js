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
      // Periksa apakah sudah ada sesi untuk admin_id yang sama
      const existingSession = await sessionModel.findOne({ where: { admin_id: adminData.id } });

      if (existingSession) {
        // Jika ada sesi yang sudah ada, perbarui sesi tersebut
        await sessionModel.update({
          cookie_id: req.sessionID,
          activity_code: '001',
          activity_time: new Date(),
          updated_at: new Date()
        }, {
          where: { admin_id: adminData.id }
        });
      } else {
        // Jika tidak ada sesi, buat sesi baru
        await sessionModel.create({
          admin_id: adminData.id,
          cookie_id: req.sessionID,
          activity_code: '001',
          activity_time: new Date(),
          created_at: new Date(),
          updated_at: new Date()
        });
      }
      // Simpan informasi sesi di req.session
      req.session.admin_id = adminData.id;
      req.session.cookie_id = req.sessionID;
      req.session.activity_code = '001';
      req.session.activity_time = new Date();

      res.json({
        data: adminData,
        metadata: 'Login successful, session created or updated'
      });
    } else {
      res.json({ error: 'Invalid username or password' });
    }
  } catch (err) {
    res.status(500).json({ error: 'An error occurred during login' });
  }
});


router.post('/logout', async (req, res) => {
  try {
    // Hapus sesi dari database berdasarkan cookie_id
    await sessionModel.destroy({ where: { cookie_id: req.sessionID } });

    // Hapus sesi dari sisi server
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err); // Log error untuk debugging
        return res.status(500).json({ error: 'Failed to log out, please try again' });
      }

      // Menghapus cookie sesi dari browser
      res.clearCookie('connect.sid'); // Ganti 'connect.sid' dengan nama cookie yang digunakan jika berbeda
      res.json({ message: 'Logout successful, session destroyed' });
    });
  } catch (error) {
    console.error('Error during logout process:', error); // Log error untuk debugging
    res.status(500).json({ error: 'An error occurred during logout' });
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