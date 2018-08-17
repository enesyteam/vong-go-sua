// # SimpleServer
// A simple chat bot server
// import facebookAuth from './facebook';

var logger = require('morgan');
var http = require('http');
var bodyParser = require('body-parser');
var express = require('express');
var request = require('request');
var morgan = require('morgan');
var router = express();
var path = require('path');

var cors = require('cors');


const PORT = process.env.PORT || 5000

routes = require('./routes');



var app = express();

// facebookAuth( app );
app.use(logger('dev'));

//support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({
  extended: true
}));
var server = http.createServer(app);

app.use('/assets', express.static('assets'));
app.use('/assets2', express.static('assets2'));
app.use('/css', express.static('css'));
app.use('/images', express.static('images'));
app.use('/js', express.static('js'));
app.use('/node_modules', express.static('node_modules'));

app.get('/chiec-vong-tay-vo-tang-da-thay-doi-cuoc-song-toi-nhu-the-nao',  routes.sale);

app.get( '/', function( req, res ) {
  res.sendFile(path.join(__dirname, 'index.html'));
} );


// development mode
  // server.listen(app.get('port'), app.get('ip'), function() {
  //   console.log("Meo server listening at %s:%d ", app.get('ip'), app.get('port'));
  // });
// productione mode
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));