const express = require('express'),
      router  = express.Router({mergeParams: true}),
      Coffee = require('../models/coffee'),
      Comment = require('../models/comment');

//add new comment
router.get('/new', isLoggedIn, (req, res) => {
  Coffee.findById(req.params.id,(err,foundCoffee) =>{
    if(err){
      console.log(err);
    } else{
      res.render("comment/new",{coffee:foundCoffee});
    }
  });
});

//adding comment
router.post('/', isLoggedIn, (req, res) => {
  console.log("entered comment POST");
  Coffee.findById(req.params.id,(err,foundCoffee) =>{
    if(err){
      console.log(err);
      res.redirect('/coffees');
    } else{
      console.log("coffee found");
      Comment.create(req.body.comment, (err,comment) =>{
        if(err){
          console.log(err);
        } else{
          //add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          //add comment to coffee
          foundCoffee.comments.push(comment._id);
          foundCoffee.save();
          console.log(comment);
          console.log("comment pushed");
          res.redirect(`/coffees/${foundCoffee._id}`);
        }
      }
    )}
  });
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

module.exports = router;
