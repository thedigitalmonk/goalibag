var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');              // mongoose for mongodb
var morgan   = require('morgan');
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var database = require('./config/database');
var session = require('express-session');

// configuration ===============================================================
mongoose.connect(database.url);     // connect to mongoDB database on modulus.io

var app = express();
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.set('views',__dirname+"/views");
app.set('view engine','jade');
app.use(session({
  secret: "shblsizuvibvaidsbvo",
  resave: false,
  saveUninitialized: true
}));


// routes ======================================================================
require('./routes.js')(app);

app.listen(80, function(){
  console.log("Express Server at port 80");
});
