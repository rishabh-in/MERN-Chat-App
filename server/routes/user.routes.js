const express = require('express');
const router = express.Router();
const { registerUser, authUser, deleteUser } = require("../controllers/user.controller")

router.route('/').post(registerUser);
router.post('/login', authUser);
router.post('/delete/user', deleteUser);

module.exports = router