var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/coffee_gram");

var coffeeSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

module.exports = mongoose.model("Coffee",coffeeSchema);
