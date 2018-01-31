var mongoose = require('mongoose');
var Comment 
mongoose.connect("mongodb://localhost/coffee_gram");

var coffeeSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Coffee",coffeeSchema);
