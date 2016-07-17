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
// flash messaging
var flash = require('connect-flash');

var app = express();

// port
var port = process.env.PORT || 5000;

// nav
var nav = [
  {
    link: '/books/list',
    text: 'Books'
  },
  {
    link: '/books/authors',
    text: 'Authors'
  }
];

// main router
var mainRouter = require('./src/routes/mainRoutes')(nav);
// auth router
var authRouter = require('./src/routes/authRoutes')(nav);
// book router
var bookRouter = require('./src/routes/bookRoutes')(nav);
// admin router
var adminRouter = require('./src/routes/adminRoutes')(nav);

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
app.use(flash());

// passport
require('./src/config/passport')(app);

// views
app.set('views', './src/views');

// handlebars
var handlebars = require('express-handlebars');

app.engine('.hbs', handlebars({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: 'src/views/layouts',
  helpers: {
    compare: function (var1, var2, options) {
      if (var1 == var2) {
        return options.fn(this);
      }
      return options.inverse(this);
    }
  }
}));
app.set('view engine', '.hbs');

// use our routes
app.use('/', mainRouter);
app.use('/auth', authRouter);
app.use('/books', bookRouter);
app.use('/admin', adminRouter);

app.listen(port, function (error) {
  console.log('Running server on port' + port);
});