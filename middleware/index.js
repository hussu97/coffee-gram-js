const Coffee  = require('../models/coffee'),
      Comment = require('../models/comment');

var middlewareObj = {};

middlewareObj.checkCommentAuthorization = (req, res, next) =>{
  //checks if user logged in
  if(req.isAuthenticated()){
    Comment.findById(req.params.commentID, (err,foundComment) =>{
      if(err){
        res.redirect('back');
      } else {
        //checks if user owns comment
        if(foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect('back');
        }
      }
    });
  } else {
    res.redirect('back');
  }
}

middlewareObj.checkCoffeeAuthorization = (req, res, next) =>{
  //checks if user logged in
  if(req.isAuthenticated()){
    Coffee.findById(req.params.id, (err,foundCoffee) =>{
      if(err){
        res.redirect('back');
      } else {
        //checks if user owns coffee post
        if(foundCoffee.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect('back');
        }
      }
    });
  } else {
    res.redirect('back');
  }
}

middlewareObj.isLoggedIn = (req, res, next) =>{
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

module.exports = middlewareObj;
