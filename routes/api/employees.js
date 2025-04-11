const express = require('express')
const router = express.Router()
const path = require('path')
const empController = require('../../controllers/empController')
const verifyJWT = require('../../middleware/verifyJWT')

router.route('/')
    .get(empController.getAllEmployees)
    .post(empController.createNewEmployee)
    .put(empController.updateEmployee)
    .delete(empController.deleteEmployee)

router.route('/:id')
    .get(empController.getEmployee)

module.exports = router

// MVC - Model View COntroller - way of organizing your express app
