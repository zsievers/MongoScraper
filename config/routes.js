var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var db = require("../models");
const { Router } = require("express");

module.exports = function(router) {
    router.get("/", function(req, res) {
      res.render("home");
    });

    router.get("/saved", function(req, res) {
      res.render("saved");
    });
}