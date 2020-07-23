var db = require("../models");

module.exports = {
    clearDB: function(req, res) {
      db.Headline.remove({})
        .then(function() {
          return db.Note.remove({});
        })
        .then(function() {
          res.json({ ok: true });
        });
    }
  };

// creating a functino called clearDB 
// when called upon this function will remove notes from the db.  