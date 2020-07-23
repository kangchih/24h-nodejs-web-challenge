const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

let _db;
const MONGODB_URI =
  'mongodb+srv://xxx:xxx@xxx.xxx.xxx.mongodb.net/xxx?retryWrites=true&w=majority'

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
  });

const mongoConnect = callback => {
  MongoClient.connect(
    MONGODB_URI
  )
    .then(client => {
      console.log('Connected!');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
exports.store = store;