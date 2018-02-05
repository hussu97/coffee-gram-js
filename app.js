const express        = require('express'),
      app            = express(),
      bodyParser     = require('body-parser'),
      port           = 8080,
      favicon        = require('serve-favicon'),
      path           = require('path'),
      passport       = require('passport'),
      LocalStrategy  = require('passport-local'),
      Coffee         = require('./models/coffee'),
      Comment        = require('./models/comment'),
      User           = require('./models/user'),
      seedDB         = require('./seeds'),
      methodOverride = require('method-override'),
      mongoose       = require('mongoose');

//requiring routes
const coffeeRoutes = require('./routes/coffees'),
      commentRoutes = require('./routes/comments'),
      indexRoutes = require('./routes/index');

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(favicon(path.join(__dirname, 'public','images', 'favicon.ico')));
app.use(methodOverride('_method'));

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

app.use("/coffees", coffeeRoutes);
app.use("/coffees/:id/comments", commentRoutes);
app.use("/", indexRoutes);



app.set('view engine', 'ejs');

//seedDB();

app.listen(port, () => {
  console.log(`Server Starts on ${port}`);
});
