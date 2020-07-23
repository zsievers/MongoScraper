var db = require("../models");

module.exports = {
    find: function(req, res) {
        db.Note.find({ _headlineId: req.params.id }).then(function (dbNote) {
            res.json(dbNote);
        });
    },

    create: function (req, res) {
        db.Note.create(req.body).then(function(dbNote) {
            res.json(dbNote);
        });
    }, 

    delete: function (req, res) {
        db.Note.remove({ id: req.params.id}).then(function(dbNote){
            res.json(dbNote);
        });
    }
};

// finding one note by id then returning that  notes
// creating a note 
// deleting a note