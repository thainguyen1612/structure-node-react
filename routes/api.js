const express = require('express');
const router = express.Router();

/*controllers */
const users = require('../app/controllers/users');

/*routes */

router.use('/user', users.index);

module.exports = router;