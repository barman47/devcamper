const express = require('express');
const { getMe, login, logout, register, forgotPassword, updateDetails, resetPassword, updatePassword } = require('../controllers/auth');

const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/login', login);
router.get('/logout', logout);
router.post('/register', register);
router.get('/me', protect, getMe);
router.post('/forgotPassword', forgotPassword);
router.put('/updateDetails', protect, updateDetails);
router.put('/updatePassword', protect, updatePassword);
router.put('/resetPassword/:resetToken', resetPassword);

module.exports = router;