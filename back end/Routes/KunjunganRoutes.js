const express = require('express');
const router = express.Router();
const KunjunganController = require('../Controllers/KunjunganController')

// GET / - Menampilkan semua data kunjungan
router.get('/', async (req, res) => KunjunganController.index(req, res))

// POST /kunjungan - Menambahkan data kunjungan
router.post('/masuk', async (req, res) => KunjunganController.creat(req, res))

router.get('/bulanan', async (req, res) => KunjunganController.indexBulanan(req, res))

router.get('/harian', async (req, res) => KunjunganController.indexHarian(req, res))

router.delete('/:id', async (req, res) => KunjunganController.drop(req, res))

module.exports = router;
