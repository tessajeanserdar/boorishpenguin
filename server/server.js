var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 8001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static(__dirname + '/../client'));
require('./config/routes.js')(app, express);

app.listen(port);
module.exports = app;
