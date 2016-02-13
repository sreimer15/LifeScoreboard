var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');

var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/routes');

var app = express();
var port = process.env.PORT || 4556;
app.use(express.static(__dirname + '/../client'));

app.use(morgan('dev'));

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.use(session({ secret: 'nyan cat' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require('./auth/passport.js')(passport); //pass passport for configuration



app.use('/api', routes);
console.log('Server now listening on port ' + port);
app.listen(port);

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/LifeScoreBoard'); //Test local db
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {

console.log('LifeScoreBoard db opened');
});


module.exports = app;





