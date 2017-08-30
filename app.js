// setting up all the dependencies/engines/views/etc
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const mongoose = require('mongoose');
const port = 3000;

const Books = require('./models/books');

const mongoURL = 'mongodb://localhost:27017/books';
mongoose.connect(mongoURL, {
 useMongoClient: true
});
mongoose.Promise = require('bluebird');

const app = express();

app.use(bodyParser.urlencoded({
 extended: true
}));

app.engine('mustache', mustacheExpress());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');

app.use(express.static(__dirname + '/public'));

// setting up all routes to pages
app.get('/add', function(req, res) {
 res.render('add');
});

app.post('/add', function(req, res) {
 Books.create(req.body).then(function(books) {
  res.redirect('/');
 });
});

app.get('/:id/edit', function(req, res) {
 Books.find({
  _id: req.params.id
 }).then(function(books) {
  res.render('edit', {
   books: books
  });
 });
});

app.post('/:id/edit', function(req, res) {
 Books.findOneAndUpdate({
  _id: req.params.id
 }, req.body).then(function(books) {
  res.redirect('/')
 });
});

app.get('/:id', function(req, res) {
 Books.find({
  _id: req.params.id
 }).then(function(books) {
  res.render('id', {
   books: books
  });
 });
});

app.post('/:id', function(req, res) {
 Books.findByIdAndRemove({
  _id: req.params.id
 }).then(function(books) {
  res.redirect('/');
 })
})

app.get('/', function(req, res) {
 Books.find().then(function(books) {
  res.render('index', {
   books: books
  });
 });
});

// listen for port
app.listen(port);
