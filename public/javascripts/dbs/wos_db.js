const mongoose = require('mongoose');
const dbUrl = require('./db_url');

var connection = mongoose.createConnection(dbUrl + '/worldofscience', {
    auth: { authSource: "admin" },
    user: 'carlo',
    pass: 'Dittoenbram1234',
    useNewUrlParser: true
});

var articleSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    body: String,
    imageUrl: String,
    author: String,
    frontpage: Boolean,
    date: String,
    tags: [String]
});

connection.model('article', articleSchema);

module.exports = connection;