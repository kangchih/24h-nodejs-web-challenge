// const { validationResult } = require('express-validator');
const Backup = require('../models/backup');

exports.getAllBackups = (req, res, next) => {
  Backup.fetchAll()
    .then(backups => {
      res.render('backup/lists', {
        backups: backups,
        pageTitle: 'All Backup Requests',
        path: '/admin'
      });
    })
    .catch(err => {
      console.log(err);
    });
};