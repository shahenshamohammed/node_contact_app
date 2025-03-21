const express = require('express');
const { registerUser, loginUser, currentUser } = require('../src/controllers/userController');
const { validate } = require('../src/models/contactModel');
const validateToken = require('../middleware/validateTokenHandler');
const router = express.Router();

router.post("/register",registerUser)

router.post("/login", loginUser)

router.get("/current",validateToken, currentUser)

module.exports = router;