const router = require('express').Router();
const passport = require('passport');
const path = require('path');

//router.get('/', (req, res, next) => {
//  res.render('index');
// });

router.get('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'))
});

router.get('/signup', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, '../public/signup.html'));
  });

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  })); 

  router.get('/profile',isAuthenticated, (req, res, next) => {
    res.sendFile(path.resolve(__dirname, '../public/profile.html'));
  });

  router.get('/signin', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, '../public/login.html'));
  });

router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
  }));

  router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
  });


function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }

  res.redirect('/')
}

module.exports = router;