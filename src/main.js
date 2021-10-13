const express = require('express')
const app = express()
const port = 3000
require('./database');
require('./passport/local-auth');

const path = require('path');
const engine = require('ejs-mate');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');


const User = require('./user');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
  secret: 'mysecretsession',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  app.locals.signinMessage = req.flash('signinMessage');
  app.locals.signupMessage = req.flash('signupMessage');
  app.locals.user = req.user;
  console.log(app.locals)
  next();
});

//createApp(App).use(store).mount('#app')

//import { createApp } from 'vue'
//import App from './App.vue'
//import store from './store'

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))


app.set('views', '../public')
app.set('view engine', 'ejs')

app.get('', (req, res) => {
    res.render('index', { text: 'This is EJS'})
})


app.use('/', require('../routes/index'));


//  Listen on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`))