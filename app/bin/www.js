var conf = require("gen").conf;
var express = require('express');
var app = express();
var server = require('http').createServer(app);

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//###############################################################################################

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,App-Id,Password');

    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

app.use('/images', express.static(__dirname.replace('app', "www").replace('bin', 'uploads')));
app.use('/logo', express.static(__dirname.replace('app', "www").replace('bin', 'logo')));

// ##############################################################################################	

var routes = require("../routes/routes.js")(app);
// ##############################################################################################

// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// ##############################################################################################

// start API server

var expserver = server.listen(conf.server.port, conf.server.ip, function() {
    console.log("API Server is listening on port %s...", expserver.address().port);
});



