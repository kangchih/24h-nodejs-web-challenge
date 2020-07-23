const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const csrf = require('csurf');
const flash = require('connect-flash');
const mongoConnect = require('./util/database').mongoConnect;
const errorController = require('./controllers/error');
const User = require('./models/user');
const store = require('./util/database').store;

const app = express();

const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const backupRoutes = require('./routes/backup');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findByEmail(req.session.user.email)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(adminRoutes);
app.use(backupRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3001);
});
