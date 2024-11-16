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
    const { nim, nama_lengkap, jenis_kelamin, email_umrah } = req.body;

    // Validasi input
    if (!nim || !nama_lengkap || !jenis_kelamin || !email_umrah) {
      return res.status(400).json({
        error: "NIM, Nama Lengkap, Jenis Kelamin, dan Email Umrah wajib diisi"
      });
    }

    // Validasi NIM harus berupa angka positif
    if (!/^\d+$/.test(nim)) {
      return res.status(400).json({ error: "NIM harus berupa angka yang valid" });
    }

    // Validasi jenis kelamin
    if (jenis_kelamin !== "laki-laki" && jenis_kelamin !== "perempuan") {
      return res.status(400).json({
        error: "Jenis Kelamin harus 'laki-laki' atau 'perempuan'"
      });
    }

    // Validasi format email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@student\.umrah\.ac\.id$/;
    if (!emailPattern.test(email_umrah)) {
      return res.status(400).json({
        error: "Email harus dalam format email@student.umrah.ac.id"
      });
    }

    // Cek apakah NIM sudah terdaftar
    const existingNim = await pengunjungModel.findOne({ where: { nim } });
    if (existingNim) {
      return res.status(409).json({ error: "NIM sudah terdaftar" });
    }

    // Cek apakah email sudah terdaftar
    const existingEmail = await pengunjungModel.findOne({ where: { email_umrah } });
    if (existingEmail) {
      return res.status(409).json({ error: "Email sudah terdaftar" });
    }

    // Buat entri baru untuk pengunjung
    const pengunjung = await pengunjungModel.create({
      nim,
      nama_lengkap,
      jenis_kelamin,
      email_umrah
    });

    // Respons sukses
    res.status(201).json({
      data: pengunjung,
      metadata: "Pendaftaran pengunjung berhasil"
    });

  } catch (error) {
    console.error('Terjadi kesalahan saat membuat pengunjung:', error);
    res.status(500).json({
      error: "Terjadi kesalahan saat membuat pengunjung",
      details: error.message
    });
  }
});

module.exports = router