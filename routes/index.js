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
      req.flash('error',err.message);
      console.log(err);
      return res.redirect('/register');
    }
    passport.authenticate("local")(req,res,()=>{
      req.flash('success','Welcome to CoffeeGram '+user.username);
      res.redirect('/coffees');
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
  req.flash('success','logged you out');
  res.redirect('/coffees');
});

module.exports = router;
