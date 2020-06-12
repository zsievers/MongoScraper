var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var logger = require("morgan");

// scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

// require models
// var db = require("./models");

var PORT = 9000;

// initalize express
var app = express();

// Make public a static folder
app.use(express.static("/public"))

// Morgan to log requests
app.use(logger("dev"));

// body parse as a json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// handlebars to express app
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// deploy to heroku, or locally to mongo mongoESPN db
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoESPN";
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