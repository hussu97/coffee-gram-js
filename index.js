const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8080;
const favicon = require('serve-favicon');
const path = require('path');

var campgrounds = [
  {name: "New Wark", image:"https://source.unsplash.com/5dehYy5BkRw"},
  {name: "Holy Cow", image:"https://source.unsplash.com/26f8ZvTWV4E"},
  {name: "WOWOWO", image:"https://source.unsplash.com/oT4hTqWoZ6M"},
  {name: "New Wark", image:"https://source.unsplash.com/5dehYy5BkRw"},
  {name: "Holy Cow", image:"https://source.unsplash.com/26f8ZvTWV4E"},
  {name: "WOWOWO", image:"https://source.unsplash.com/TwIXMn7iNnw"},
  {name: "New Wark", image:"https://source.unsplash.com/5dehYy5BkRw"},
  {name: "Holy Cow", image:"https://source.unsplash.com/26f8ZvTWV4E"},
  {name: "WOWOWO", image:"https://source.unsplash.com/TwIXMn7iNnw"}
];

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(favicon(path.join(__dirname, 'public','images', 'favicon.ico')));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render("landing");
});
app.get('/campgrounds', (req, res) => {
  res.render("campgrounds",{campgrounds:campgrounds});
});
app.get('/campgrounds/new', (req, res) => {
  //Showing the form that the user can fill out
  res.render("new");
});

app.post('/campgrounds', (req, res) => {
  //A form is created to allow user to add a new campground
  var name = req.body.name;
  var url = req.body.image;
  var newCampground = {name:name,image:url};
  campgrounds.push(newCampground)
  //redirect back to campgrounds page
  res.redirect('/campgrounds');
});

app.listen(port, () => {
  console.log(`Server Starts on ${port}`);
});
