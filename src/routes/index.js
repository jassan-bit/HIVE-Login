const router = require('express').Router();
const passport = require('passport');
const path = require('path');

//router.get('/', (req, res, next) => {
//  res.render('index');
// });

router.get('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '../views/index.html'))
});

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
})); 

router.get('/signin', (req, res, next) => {
  res.render('signin');
});


router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/profile',
  failureRedirect: '/profile',
  failureFlash: true
}));

router.get('/profile',isAuthenticated, (req, res, next) => {
  res.render('profile');
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

router.get('/about',isAuthenticated, (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '../views/about.html'))
});



function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }

  res.redirect('/')
}

module.exports = router;