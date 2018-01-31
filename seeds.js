var mongoose = require("mongoose");
var Coffee = require("./models/coffee");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Starbucks Cappuccino",
        image: "https://i.pinimg.com/736x/05/d4/85/05d48515bed6ff2986f134c28313a12e--starbucks-frappuccino-starbucks-coffee.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Tim Hortons Ice Cappuccino",
        image: "https://www.bargainmoose.ca/media/images/2015/12/162-595x446.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Tim Hortons Drink",
        image: "https://s3-media4.fl.yelpcdn.com/bphoto/1xkxNDI9YU1vtq-XcP9XSw/348s.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]

function seedDB() {
   //Remove all coffees
   Coffee.remove({}, (err) =>{
        if(err){
            console.log(err);
        }
        Comment.remove({}, (err) =>{
            if(err){
                console.log(err);
            }
             //add a few coffees
            data.forEach((seed) =>{
                Coffee.create(seed, (err, coffee) =>{
                    if(err){
                        console.log(err)
                    } else {
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, (err, comment) =>{
                                if(err){
                                    console.log(err);
                                } else {
                                    coffee.comments.push(comment._id);
                                    coffee.save();
                                }
                            });
                    }
                });
            });
        });
    });
    //add a few comments
}

module.exports = seedDB;
