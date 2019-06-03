var express = require('express');
var router = express.Router();
var mongoose = require('../public/javascripts/dbs/movement_db');

var Vote = mongoose.model('vote')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/votes', (req, res, next) => {
	Vote.find({}, (err, votes) => {
	    if (err) {
			console.log(err);
		}
		if (votes) {
			res.json(votes.length);
			res.end();
		}
	});
});

router.post('/new', (req, res, next) => {
	var vote = req.body.vote;
	var date = new Date();
	dateString = date.toString();
	const newVote = Vote({
		name: vote.name,
		email: vote.email,
		date: dateString
	});
	newVote.save().then(() => {
		res.send(newVote);
		res.end();
	});
});

module.exports = router;
