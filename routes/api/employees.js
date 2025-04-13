const express = require('express')
const router = express.Router()
const path = require('path')
const empController = require('../../controllers/empController')
const verifyJWT = require('../../middleware/verifyJWT')
const roles_list = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')

router.route('/')
    .get(empController.getAllEmployees)
    .post(verifyRoles(roles_list.Admin,roles_list.Editor),empController.createNewEmployee)
    .put(verifyRoles(roles_list.Admin,roles_list.Editor),empController.updateEmployee)
    .delete(verifyRoles(roles_list.Admin),empController.deleteEmployee)

router.route('/:id')
    .get(empController.getEmployee)
module.exports = router

// MVC - Model View COntroller - way of organizing your express app
