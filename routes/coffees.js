const express = require('express'),
      router  = express.Router(),
      Coffee = require('../models/coffee'),
      Comment = require('../models/coffee');

//page showing all coffees
router.get('/', (req, res) => {
  Coffee.find({},(err,allCoffee)=>{
    if(err){
      console.log(err);
    } else{
      res.render("coffee/index",{coffees:allCoffee, currentUser:req.user});
    }
  });
});

//adding new coffee
router.post('/', isLoggedIn, (req, res) => {
  //A form is created to allow user to add a new coffee
  Coffee.create(
    {
      name:        req.body.name,
      image:       req.body.image,
      description: req.body.description,
      author: {
        username: req.user.username,
        id: req.user._id
      }
    },(err,newCoffee) =>{
      if(err){
        console.log(err);
      } else{
        console.log("Coffee created!");
        console.log(newCoffee);
      }
    }
  )

  //redirect back to coffees page
  res.redirect('/coffees');
});

//Showing the add coffe form that the user can fill out
router.get('/new', isLoggedIn, (req, res) => {
  res.render("coffee/new");
});

//finding a particular coffee
router.get('/:id', (req, res) => {
  Coffee.findById(req.params.id).populate('comments').exec((err,foundCoffee) =>{
    if(err){
      console.log(err);
    } else{
      res.render("coffee/show",{coffee:foundCoffee});
    }
  });
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

module.exports = router;
