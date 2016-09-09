// Dependencies
var bodyParser = require('body-parser'),
    express = require('express'),
    expressSession = require('express-session'),
    mongoose = require('mongoose'),
    config = require('./configs/config.js'),
    port = config.port;

// Express
var app = express();

// Database
mongoose.connect(config.database.url);
mongoose.connection.once('open', function () {
    console.log('Successfully connected to mongodb')
});

// Express Middleware
app.use(expressSession(config.session));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));

// Upload Image Endpoints
require('./routes/ImageRoute.js')(app);

app.listen(port, function () {
    console.log('Listening on port ' + port);
});