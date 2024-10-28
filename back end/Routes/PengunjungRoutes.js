const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const pengunjungModel = require('../Models/PengunjungModel')

router.get('/', async (req, res) => {
  const pengunjungs = await pengunjungModel.findAll()
  res.status(200).json({
    data: pengunjungs,
    metadata: "Data pengunjung berhasil diambil"
  })
})

router.post('/registers', async (req, res) => {
  try {
    const { nim, nama_lengkap, jenis_kelamin, email_umrah } = req.body
    if (!nim || !nama_lengkap || !jenis_kelamin || !email_umrah) {
      return res.status(400).json({
        error: "NIM, Nama Lengkap, dan Email Umrah wajib diisi"
      });
    }
    // Cek apakah NIM adalah angka
    if (isNaN(nim) || nim <= 0) {
      return res.status(400).json({
        error: "NIM harus berupa angka yang valid"
      });
    }
    if (jenis_kelamin !== "laki-laki" && jenis_kelamin !== "perempuan") {
      return res.status(400).json({
        error: "Jenis Kelamin harus 'laki-laki' atau 'perempuan'"
      });
    }
    // Cek format email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@student\.umrah\.ac\.id$/;
    if (!emailPattern.test(email_umrah)) {
      return res.status(400).json({
        error: "Email harus dalam format email@student.umrah.ac.id"
      });
    }
    const pengunjung = await pengunjungModel.create({
      nim, nama_lengkap, jenis_kelamin, email_umrah
    })
    res.json({
      data: pengunjung,
      metadata: "Pendaftaran pengunjung berhasil"
    })
  } catch (error) {
    res.status(500).json({
      error: "Terjadi kesalahan saat membuat pengunjung",
      details: error.message
    });
  }
})





module.exports = router