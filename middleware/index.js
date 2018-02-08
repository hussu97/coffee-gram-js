const Coffee  = require('../models/coffee'),
      Comment = require('../models/comment');

var middlewareObj = {};

middlewareObj.checkCommentAuthorization = (req, res, next) =>{
  //checks if user logged in
  if(req.isAuthenticated()){
    Comment.findById(req.params.commentID, (err,foundComment) =>{
      if(err||!foundComment){
        req.flash('error','comment does not exist!');
        res.redirect('back');
      } else {
        //checks if user owns comment
        if(foundComment.author.id.equals(req.user._id)||req.use.isAdmin) {
          next();
        } else {
          req.flash('error','you do not have permission to do that');
          res.redirect('back');
        }
      }
    });
  } else {
    req.flash('error','You need to be logged in to do that!');
    res.redirect('back');
  }
}

middlewareObj.checkCoffeeAuthorization = (req, res, next) =>{
  //checks if user logged in
  if(req.isAuthenticated()){
    Coffee.findById(req.params.id, (err,foundCoffee) =>{
      if(err || !foundCoffee){
        req.flash('error','coffee does not exist');
        res.redirect('back');
      } else {
        //checks if user owns coffee post
        if(foundCoffee.author.id.equals(req.user._id)||req.user.isAdmin) {
          next();
        } else {
          req.flash('error','You dont have permission to do that');
          res.redirect('back');
        }
      }
    });
  } else {
    req.flash('error','You need to be logged in to do that!');
    res.redirect('back');
  }
}

middlewareObj.isLoggedIn = (req, res, next) =>{
  if(req.isAuthenticated()){
    return next();
  }
  req.flash('error','You need to be logged in to do that!');
  res.redirect('/login');
}

module.exports = middlewareObj;
