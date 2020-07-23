const Backup = require('../models/backup');
const { validationResult } = require('express-validator');


exports.getBackup = (req, res, next) => {
  const email = req.params.email;
  Backup.findByEmail(email)
    .then(backup => {
      res.render('backup/request', {
        backup: backup,
        pageTitle: backup.email,
        timestamp: backup.ts,
        path: '/request'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('backup/index', {
    path: '/',
    pageTitle: 'Backup',
    errorMessage: message,
    oldInput: {
      email: ''
    },
    validationErrors: []
  });
};


exports.postAddBackup = (req, res, next) => {
  const email = req.body.email;
  const errors = validationResult(req);
  console.log(`email:${email}`);
  if (!errors.isEmpty()) {
    console.log(errors.array());
  }

  const backup = new Backup(
    email,
    "pending",
    new Date().getTime()
  );
  Backup.findByEmail(email)
    .then(data => {
      console.log(`data:${data}`);
      if (data) {
        console.log("Duplicate Backup: Won't update");
        res.redirect(`/request/${email}`);
      } else {
        backup
          .save()
          .then(result => {
            console.log(result);
            console.log('Created Backup');
            res.redirect(`/request/${email}`);
          })
          .catch(err => {
            console.log(err);
          });
      }
    })
    .catch(err => console.log(err));
};
