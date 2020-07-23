var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var noteSchema = new Schema({

  // headline id associated with the note
  _headlineId: {
    type: Schema.Types.ObjectId,
    ref: "Headline"
  },

  date: {
    type: Date, 
    default: Date.now
  },

  noteText: String
});

// crate Note model using noteSchema
var Note = mongoose.model("Note", noteSchema);


module.exports = Note;