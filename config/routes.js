var scrape = require("../scripts/scrape");

var headlinesController = require("../controllers/headlines");
var notesController = require("../controllers/notes");
const { query } = require("express");
const notes = require("../controllers/notes");

module.exports = function(router) {
    router.get("/", function(req, res) {
      res.render("home");
    });

    router.get("/saved", function(req, res) {
      res.render("saved");
    });

    // creating api route to fetch all articles
    router.get("/api/fetch", function(req, res) {
      headlinesController.fetch(function (err, docs) {
        if (!docs || docs.insertedCount === 0) {
          res.json({
            message: `No new articles, today`
          });
        }
        else { 
            res.json({
              message: `Added ${docs.insertedCount} new articles`
            });
        }
      });
    });

    // get route to grab headlines in db
    router.get("/api/headlines", function(req, res) {
      var query = {};
      if(req.query.saved) {
        query = req.query;
      }

      headlinesController.get(query, function (data) {
        res.json(data);
      });
    });

    router.deleted("/api/headlines/:id", function (req, res) {
      var query = {};
      query._id = req.params.id;
      headlinesController.delete(query, function (err, data) {
        res.json(data);
      });
    });

    router.patch("/api/headlines", function (req, res) {
      headlinesController.update(req.body, function (err, data) {
        res.json(data);
      });
    });

    // grabbing notes 
    router.get("/api/notes/:headline_id?", function(req, res) {
      var query = {};
      if (req.params.headline_id) {
        query._id = req.params.headline_id;
      }

      notesController.get(query, function  (err, data) {
        res.json(data);
      });
    });

    // delete note
    router.delete("/api/notes/:id", function(req, res) {
      var query = {};
      query._id = req.params.id;
      notesController.delete(query, function(err, data) {
        res.json(data);
      });
    });

    // post new notes to articles
    router.post("/api/notes", function (req, res) {
      notesController.save(req.body, function (data) {
        res.json(data);
      });
    });
}