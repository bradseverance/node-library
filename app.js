// set up express
var express = require('express');
var app = express();

// port
var port = process.env.PORT || 5000;

// nav
var nav = [
  {
    link: '/Books',
    text: 'Books'
  },
  {
    link: '/Authors',
    text: 'Authors'
  }
];


// book router
var bookRouter = require('./src/routes/bookRoutes')(nav);
// admin router
var adminRouter = require('./src/routes/adminRoutes')(nav);


app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

// use our routes
app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);


app.get('/', function (req, res) {
  res.render('index', {
    title: 'Library',
    nav: nav
  });
});

app.get('/books', function (req, res) {
  res.send('Hello Books');
});

app.listen(port, function (error) {
  console.log('Running server on port' + port);
});