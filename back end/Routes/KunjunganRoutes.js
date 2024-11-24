const express = require('express');
const router = express.Router();
const KunjunganModel = require('../Models/KunjunganModel');
const PengunjungModel = require('../Models/PengunjungModel');

// GET / - Menampilkan semua data kunjungan
router.get('/', async (req, res) => {
  try {
    const kunjungan = await KunjunganModel.findAll({
      include: [
        {
          model: PengunjungModel,
          attributes: ['nama_lengkap', 'jenis_kelamin', 'email_umrah'], // Ambil detail dari pengunjung
        },
      ],
    });

    res.status(200).json({
      data: kunjungan,
      metadata: 'Data kunjungan berhasil diambil.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data kunjungan.' });
  }
});

// POST /kunjungan - Menambahkan data kunjungan
router.post('/masuk', async (req, res) => {
  const { nim, keperluan } = req.body;

  try {
    // Cek apakah nim ada di database PengunjungModel
    const pengunjung = await PengunjungModel.findOne({ where: { nim } });

    if (!pengunjung) {
      return res.status(400).json({
        message: 'NIM tidak ditemukan.Data kunjungan tidak dapat ditambahkan.',
      });
    }

    // Menambahkan data kunjungan
    const kunjungan = await KunjunganModel.create({
      nim,
      keperluan,
      created_at: new Date(),
      updated_at: new Date(),
    });

    res.status(201).json({
      data: kunjungan,
      metadata: 'Data kunjungan berhasil ditambahkan.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan saat menambahkan data kunjungan.' });
  }
});

module.exports = router;
