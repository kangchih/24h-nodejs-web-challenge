const express = require('express');

const backupController = require('../controllers/backup');
// const isAuth = require('../middleware/is-auth');

const router = express.Router();
const { body } = require('express-validator');

router.get('/', backupController.getIndex);

router.get('/request/:email', backupController.getBackup);

router.post(
    '/send',
    [
      body('email')
        .isEmail()
        .withMessage('Please enter a valid email address.')
        .normalizeEmail()
    ],
    backupController.postAddBackup
  );


module.exports = router;
