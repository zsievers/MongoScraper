var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");


var PORT = process.env.PORT || 9000;

// initalize express
var app = express();

// Setup express router
var router = express.Router();

// require routes file 
require("./config/routes")(router)

// Make public a static folder
app.use(express.static(__dirname + "/public"));


// handlebars to express app
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// use bodyParser
app.use(bodyParser.urlencoded({
    extended: false
}));

// every request go through router 
app.use(router);

// deploy to heroku, or locally to mongo db
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScrape";
// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, function(error) {
    if (error) {
        console.log(error);
    }
    else {
        console.log("mongoose connection is successful");
    }
});

// start server
app.listen(PORT, function() {
    console.log("App running on port %s. Visit http://localhost:%s/ in your browser", PORT, PORT);
});