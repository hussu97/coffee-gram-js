const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      port       = 8080,
      favicon    = require('serve-favicon'),
      path       = require('path'),
      Coffee     = require('./models/coffee');
      mongoose   = require('mongoose');

var coffees = [
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
app.get('/coffees', (req, res) => {
  Coffee.find({},(err,allCoffee)=>{
    if(err){
      console.log(err);
    } else{
      res.render("index",{coffees:allCoffee});
    }
  });
});
app.get('/coffees/new', (req, res) => {
  //Showing the form that the user can fill out
  res.render("new");
});
app.get('/coffees/:id', (req, res) => {
  Coffee.findById(req.params.id,(err,foundCoffee) =>{
    if(err){
      console.log(err);
    } else{
      res.render("show",{coffee:foundCoffee});
    }
  });

});

app.post('/coffees', (req, res) => {
  //A form is created to allow user to add a new coffee
  Coffee.create(
    {
      name:        req.body.name,
      image:       req.body.image,
      description: req.body.description
    },(err,newCoffee) =>{
      if(err){
        console.log(err);
      } else{
        console.log("Coffee created!");
        console.log(newCoffee);
      }
    }
  )

  //redirect back to coffees page
  res.redirect('/coffees');
});

app.listen(port, () => {
  console.log(`Server Starts on ${port}`);
});
