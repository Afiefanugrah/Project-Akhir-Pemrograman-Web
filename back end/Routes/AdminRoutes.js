const express = require('express')
const router = express.Router()
const admincontroller = require('../Controllers/AdminController')

router.get('/', async (req, res) => admincontroller.index(req, res))

// register
router.post('/register', async (req, res) => admincontroller.creat(req, res))

// login
router.post('/login', async (req, res) => admincontroller.creatLogin(req, res))

// sesi login
router.get('/session', (req, res) => admincontroller.indexSession(req, res))

// Cek sesi login
router.get('/check-session', (req, res) => admincontroller.indexCheckSession(req, res))

// sesi logout
router.post('/logout', (req, res) => admincontroller.creatLogout(req, res))

module.exports = router