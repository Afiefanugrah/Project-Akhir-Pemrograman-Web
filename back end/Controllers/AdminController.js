const session = require('express-session')
const bcrypt = require('bcrypt')
const adminModel = require('../Models/AdminModel')


class AdminController {
  async index(req, res) {
    const admins = await adminModel.findAll()
    res.status(200).json({
      data: admins,
      metadata: "admin enpoind"
    })
  }

  async creat(req, res) {
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
        error: "username tidak ada / password salah",
        details: error.message
      });
    }
  }

  async creatLogin(req, res) {
    const { username, password } = req.body;

    try {
      const adminData = await adminModel.findOne({ where: { username: username } });
      if (!adminData) {
        return res.status(400).json({ error: 'Invalid username or password' });
      }
      const compare = await bcrypt.compare(password, adminData.password);

      if (compare) {
        // Simpan informasi sesi di req.session
        req.session.admin_id = adminData.id;
        req.session.username = adminData.username;

        res.status(200).json({
          data: adminData,
          metadata: 'Login successful, session created'
        });
      } else {
        res.status(400).json({ error: 'Invalid username or password' });
      }
    } catch (err) {
      res.status(500).json({ error: 'An error occurred during login' });
    }
  }

  async indexSession(req, res) {
    if (req.session && req.session.admin_id) {
      res.json({ loggedIn: true });
    } else {
      res.json({ loggedIn: false });
    }
  }

  async indexCheckSession(req, res) {
    if (req.session.admin_id) {
      return res.json({ success: true });
    } else {
      return res.json({ success: false });
    }
  }

  async creatLogout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to log out' });
      }
      res.clearCookie('connect.sid'); // Hapus cookie sesi
      res.status(200).json({ message: 'Logged out successfully' });
    });
  }
}

module.exports = new AdminController ()