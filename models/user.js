const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(email, pwd) {
    this.email = email;
    this.password = pwd;
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  static findById(userId) {
    const db = getDb();
    return db.co
      .collection('users')
      .findOne({ _id: new ObjectId(userId) })
      .then(user => {
        console.log(user);
        return user;
      })
      .catch(err => {
        console.log(err);
      });
  }


  static findByEmail(email) {
    const db = getDb();
    return db
      .collection('users')
      .findOne({ email: email })
      .then(user => {
        console.log(`findByEmail.user:${JSON.stringify(user)}`);
        return user;
      })
      .catch(err => {
        console.log(err);
      });
  }
}



module.exports = User;
