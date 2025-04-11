const express = require('express')
const router = express.Router()
const path = require('path')
const {handleLogout} = require('../controllers/logoutController')

router.get('/',handleLogout)
module.exports = router