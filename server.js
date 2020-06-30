var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
// Require all models
var db = require("./models");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Require our routes
var routes = require("./routes");

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect Handlebars to our Express app
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Have every request go through our route middleware
app.use(routes);


// Connect to the Mongo DB
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/news-scraper";

mongoose.connect(MONGODB_URI);
// start server
app.listen(PORT, function() {
    console.log("App running on port %s. Visit http://localhost:%s/ in your browser", PORT, PORT);
});