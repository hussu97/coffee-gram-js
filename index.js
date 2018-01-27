const app = require('express')();
const port = 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render("landing");
});
app.get('/campgrounds', (req, res) => {

});

app.listen(port, () => {
  console.log(`Server Starts on ${port}`);
});
