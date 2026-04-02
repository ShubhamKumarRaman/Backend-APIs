const express = require('express')
const router = express.Router();

const auth = require('../middleware/auth.middleware')
const report = require('../controllers/report.controller')

router.get('/', auth, report.getReport)

module.exports = router;