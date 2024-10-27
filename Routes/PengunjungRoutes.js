const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const pengunjungModel = require('../Models/PengunjungModel')

router.get('/', async (req, res) => {
  const pengunjungs = await pengunjungModel.findAll()
  res.status(200).json({
    data: pengunjungs,
    metadata: "pengunjung enpoind"
  })
})

router.post('/registers', async (req, res) => {
  try {
    const { nim, nama_lengkap, jenis_kelamin, email_umrah } = req.body
    if (!nim || !nama_lengkap || (jenis_kelamin !== "laki-laki" && jenis_kelamin !== "perempuan") || !email_umrah) {
      return res.status(400).json({
        error: "nim, nama_lengkap, jenis_kelamin and email_umrah are required"
      });
    }
    const pengunjung = await ({
      nim, nama_lengkap, jenis_kelamin, email_umrah
    })
    res.json({
      data: pengunjung,
      metadata: "create pengunjung sukses"
    })
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while creating the pengunjung",
      details: error.message
    });
  }
})





module.exports = router