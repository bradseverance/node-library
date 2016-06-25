// set up express
var express = require('express');
// parse that body
var bodyParser = require('body-parser');
// parse those cookies
var cookieParser = require('cookie-parser');
// passport
var passport = require('passport');
// session
var session = require('express-session');

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
// auth router
var authRouter = require('./src/routes/authRoutes')(nav);

// middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));
app.use(cookieParser());
app.use(session({
  secret: 'library',
  resave: false,
  saveUninitialized: true
}));

// passport
require('./src/config/passport')(app);

// views
app.set('views', './src/views');

// handlebars
var handlebars = require('express-handlebars');
app.engine('.hbs', handlebars({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: 'src/views/layouts'
}));
app.set('view engine', '.hbs');

// use our routes
app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

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