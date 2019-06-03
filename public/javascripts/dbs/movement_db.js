const mongoose = require('mongoose');
const dbUrl = require('./db_url');

var connection = mongoose.createConnection(dbUrl + '/movement', {
    auth: { authSource: "admin" },
    user: 'carlo',
    pass: 'Dittoenbram1234',
    useNewUrlParser: true
});

var voteSchema = new mongoose.Schema({
    name: String,
    email: String,
    date: String
});

connection.model('vote', voteSchema);

module.exports = connection;