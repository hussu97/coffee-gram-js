const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      port       = 8080,
      favicon    = require('serve-favicon'),
      path       = require('path'),
      mongoose   = require('mongoose');

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

//MONGOOSE
mongoose.connect("mongodb://localhost/tent_out");

var tentSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Tent = mongoose.model("Tent",tentSchema);

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(favicon(path.join(__dirname, 'public','images', 'favicon.ico')));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render("landing");
});
app.get('/index', (req, res) => {
  Tent.find({},(err,allTents)=>{
    if(err){
      console.log(err);
    } else{
      res.render("index",{campgrounds:allTents});
    }
  });
});
app.get('/index/new', (req, res) => {
  //Showing the form that the user can fill out
  res.render("new");
});
app.get('/index/:id', (req, res) => {
  Tent.findById(req.params.id,(err,foundTent) =>{
    if(err){
      console.log(err);
    } else{
      res.render("show",{campground:foundTent});
    }
  });

});

app.post('/index', (req, res) => {
  //A form is created to allow user to add a new campground
  Tent.create(
    {
      name:        req.body.name,
      image:       req.body.image,
      description: req.body.description
    },(err,newTent) =>{
      if(err){
        console.log(err);
      } else{
        console.log("Tent created!");
        console.log(newTent);
      }
    }
  )

  //redirect back to campgrounds page
  res.redirect('/index');
});

app.listen(port, () => {
  console.log(`Server Starts on ${port}`);
});
