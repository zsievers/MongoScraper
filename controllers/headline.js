var db = require("../models");

module.exports = {
  findAll: function (req, res) {
    db.Headline.find(req.query)
      .sort({ date: -1 })
      .then(function (dbHeadline) {
        res.json(dbHeadline);
      });
  },

  delete: function (req, res) {
    db.Headline.remove({ _id: req.params.id }).then(function (dbHeadline) {
      res.json(dbHeadline);
    });
  },

  update: function (req, res) {
    db.Headline.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    ).then(function (dbHeadline) {
      res.json(dbHeadline);
    });
  },
};


// navigating the mongo db using findAll, Delete, update (crud)
// findAll: is finding all the headlines
// then sorting them by date
// then sending them back to the dbHeadline

// delete: removing the specific headline by id

// update: updating the specific headline by id
// then sending it back to the db