const express = require('express');
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

//TODO: Fix routing issue to show all backups
// /admin => GET
router.get('/admin', isAuth, adminController.getAllBackups);

module.exports = router;