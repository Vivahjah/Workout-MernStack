const express = require('express');
const {login, register  } = require('../controllers/user')

const router = express.Router();


//login
router.route('/login').post(login)



//signup
router.route('/register').post(register)









module.exports = router