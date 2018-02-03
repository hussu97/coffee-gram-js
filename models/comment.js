var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/coffee_gram");

var commentSchema = new mongoose.Schema({
  text: String,
  author:{
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      username: String
    }
});

module.exports = mongoose.model("Comment",commentSchema);
