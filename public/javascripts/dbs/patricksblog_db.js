const mongoose = require('mongoose');
const dbUrl = require('./db_url');

var connection = mongoose.createConnection(dbUrl + '/patrick', {
    auth: { authSource: "admin" },
    user: 'carlo',
    pass: 'Dittoenbram1234',
    useNewUrlParser: true,
    w: 1
});

var articleSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  body: String,
  author: String,
  date: String,
  tags: Array
});

connection.model('article', articleSchema);

module.exports = connection;