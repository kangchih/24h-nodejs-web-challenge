// const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Backup {
  constructor(email, status, ts) {
    this.email = email;
    this.status = status;
    this.ts =  ts;
    // this._id = id ? new mongodb.ObjectId(id) : null;
    // this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOp;
    console.log(`Backup:${this}`);
    dbOp = db.collection('backups').insertOne(this);

    return dbOp
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('backups')
      .find()
      .toArray()
      .then(backups => {
        return backups;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findByEmail(email) {
    const db = getDb();
    return db
      .collection('backups')
      .find({ email: email })
      .next()
      .then(backup => {
        console.log(`findByEmail backup:${backup}`);
        return backup;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static deleteByEmail(email) {
    const db = getDb();
    return db
      .collection('backups')
      .deleteOne({ email: email })
      .then(result => {
        console.log('Deleted');
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = Backup;
