const express = require('express')
const router = express.Router()
const PengunjungController = require('../Controllers/PengunjungContreller')

router.get('/', async (req, res) => PengunjungController.index(req, res))

router.post('/registers', async (req, res) => PengunjungController.creat(req, res))

router.get('/count', async (req, res) => PengunjungController.indexCount(req, res))

router.delete('/:id', async (req, res) => PengunjungController.drop(req, res))

module.exports = router