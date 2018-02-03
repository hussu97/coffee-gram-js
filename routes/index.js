const express  = require('express'),
      router   = express.Router(),
      Coffee   = require('../models/coffee'),
      Comment  = require('../models/comment'),
      User     = require('../models/user')
      passport = require('passport');

//main page
router.get('/', (req, res) => {
  res.render('landing');
});

//sign up page
router.get('/register', (req, res) => {
  res.render('register');
});

//registering user
router.post('/register', (req, res) => {
  var newUser = new User({username:req.body.username});
  User.register(newUser,req.body.password,(err,user)=>{
    if(err){
      console.log(err);
      return res.render('register');
    }
    passport.authenticate("local")(req,res,()=>{
      res.redirect('coffees');
    })
  })
});

//sign in page
router.get('/login', (req, res) => {
  res.render('login');
});

//signing in the user
router.post('/login',passport.authenticate("local",
  {
    successRedirect: '/coffees',
    failureRedirect: '/login'
  }), (req, res) => {
});

//logging the user out
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

module.exports = router;
