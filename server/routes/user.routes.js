const express = require('express');
const router = express.Router();
const { registerUser, authUser, deleteUser, allUsers } = require("../controllers/user.controller");
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(registerUser).get(protect, allUsers);
router.post('/login', authUser);
// router.route('/').get(allUssers);
router.post('/delete/user', deleteUser);

module.exports = router