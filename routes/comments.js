const express = require('express'),
      router  = express.Router({mergeParams: true}),
      Coffee = require('../models/coffee'),
      Comment = require('../models/comment'),
      middleware = require('../middleware');

//add new comment
router.get('/new', middleware.isLoggedIn, (req, res) => {
  Coffee.findById(req.params.id,(err,foundCoffee) =>{
    if(err){
      console.log(err);
    } else{
      res.render("comment/new",{coffee:foundCoffee});
    }
  });
});

//adding comment
router.post('/', middleware.isLoggedIn, (req, res) => {
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
          req.flash('success','comment successfully added');
          res.redirect(`/coffees/${foundCoffee._id}`);
        }
      }
    )}
  });
});

//editing a comment
router.get('/:commentID/edit', middleware.checkCommentAuthorization, (req, res) => {
  Comment.findById(req.params.commentID, (err,foundComment) =>{
    if(err) {
      console.log(err);
    } else {
        res.render('comment/edit', {coffeeID: req.params.id, comment: foundComment});
    }
  })
});

//update a comment
router.put('/:commentID', middleware.checkCommentAuthorization, (req, res) => {
    Comment.findByIdAndUpdate(req.params.commentID, req.body.comment, (err,updatedComment) => {
      if(err) {
        console.log(err);
        res.redirect('back');
      } else {
        res.redirect('/coffees/'+req.params.id);
      }
    })
});

//delete comment
router.delete('/:commentID', middleware.checkCommentAuthorization, (req, res) => {
  Comment.findByIdAndRemove(req.params.commentID, (err) => {
    if(err) {
      res.redirect('back');
    } else {
      req.flash('success','comment successfully deleted');
      res.redirect('/coffees/' + req.params.id);
    }
  });
});

module.exports = router;
