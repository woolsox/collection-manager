const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
 title: {type: String, required: true},
 author: {type: String, required: true},
 publisher: {type: String, required: true},
 released: {type: Number},
 genre: {type: String, required: true},
 specs: [{
  lang: {type: String},
  cover: {type: String},
  pages: {type: Number}
 }]
});

const Books = mongoose.model('Books', bookSchema);

module.exports = Books;
