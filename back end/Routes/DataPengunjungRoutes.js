const express = require('express')
const router = express.Router()
const DatapengunjungModel = require('../Models/PengunjungModel')
const pengunjungModel = require('../Models/PengunjungModel')

router.get('/', async (req, res) => {
  const Data = await DatapengunjungModel.findAll()
  try {
    const data = await DatapengunjungModel.findAll();

    res.status(200).json({
      data, // Sertakan data pengunjung yang diambil
      metadata: "Data pengunjung berhasil diambil."
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data pengunjung.' });
  }
})

router.post('/datapengunjung', async (req, res) => {
  const { nim, keperluan } = req.body;

  try {
    // Cek apakah nim ada di database pengunjungModel
    const pengunjungModel = await pengunjungModel.findOne({ where: { nim } });

    if (!pengunjungModel) {
      return res.status(400).json({ message: 'NIM tidak ditemukan di database mahasiswa. Data pengunjung tidak dapat ditambahkan.' });
    }

    // Jika NIM ada, simpan data pengunjung
    const data = await DatapengunjungModel.create({
      nim,
      keperluan,
      created_at: new Date(), // Menyimpan waktu saat data dibuat
    });

    res.status(201).json({
      data,
      metadata: "Data pengunjung berhasil ditambahkan."
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan saat menambahkan data pengunjung.' });
  }
});

module.exports = router