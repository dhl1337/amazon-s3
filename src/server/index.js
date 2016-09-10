'use strict';

// Dependencies
import bodyParser from 'body-parser';
import express from 'express';
import expressSession from 'express-session';
import mongoose from 'mongoose';
import config from './configs/config';

let port = config.port;

// Express
let app = express();

// Database
mongoose.connect(config.database.url);
mongoose.connection.once('open', () => {
    console.log('Successfully connected to mongodb')
});

// Express Middleware
app.use(expressSession(config.session));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));

// Upload Image Endpoints
require('./image/ImageRoute.js')(app);

app.listen(port, () => {
    console.log('Listening on port ' + port);
});