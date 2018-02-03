const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      port       = 8080,
      favicon    = require('serve-favicon'),
      path       = require('path'),
      passport   = require('passport'),
      LocalStrategy = require('passport-local'),
      Coffee     = require('./models/coffee'),
      Comment    = require('./models/comment'),
      User       = require('./models/user'),
      seedDB     = require('./seeds'),
      mongoose   = require('mongoose');

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(favicon(path.join(__dirname, 'public','images', 'favicon.ico')));

//PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: 'I like trains',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    next();
});

app.set('view engine', 'ejs');

seedDB();

app.get('/', (req, res) => {
  res.render("landing");
});
app.get('/coffees', (req, res) => {
  Coffee.find({},(err,allCoffee)=>{
    if(err){
      console.log(err);
    } else{
      res.render("coffee/index",{coffees:allCoffee, currentUser:req.user});
    }
  });
});
app.get('/coffees/new', (req, res) => {
  //Showing the form that the user can fill out
  res.render("coffee/new");
});
app.get('/coffees/:id', (req, res) => {
  Coffee.findById(req.params.id).populate('comments').exec((err,foundCoffee) =>{
    if(err){
      console.log(err);
    } else{
      res.render("coffee/show",{coffee:foundCoffee});
    }
  });

});
app.get('/coffees/:id/comments/new', isLoggedIn, (req, res) => {
  Coffee.findById(req.params.id,(err,foundCoffee) =>{
    if(err){
      console.log(err);
    } else{
      res.render("comment/new",{coffee:foundCoffee});
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
app.post('/coffees/:id/comments', isLoggedIn, (req, res) => {
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
          foundCoffee.comments.push(comment._id);
          foundCoffee.save();
          console.log("comment pushed");
          res.redirect(`/coffees/${foundCoffee._id}`);
        }
      }
    )}
  });
});

//AUTH ROUTES
app.get('/register', (req, res) => {
  res.render('register');
});
app.post('/register', (req, res) => {
  var newUser = new User({username:req.body.username});
  User.register(newUser,req.body.password,(err,user)=>{
    if(err){
      console.log(err);
      return res.render('register');
    }
    passport.authenticate("local")(req,res,()=>{
      res.redirect('coffees');
    })
  })
});
app.get('/login', (req, res) => {
  res.render('login');
});
app.post('/login',passport.authenticate("local",
  {
    successRedirect: '/coffees',
    failureRedirect: '/login'
  }), (req, res) => {
});
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

app.listen(port, () => {
  console.log(`Server Starts on ${port}`);
});
