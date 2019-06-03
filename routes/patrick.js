var express = require('express');
var router = express.Router();
const mongoose = require('../public/javascripts/dbs/patricksblog_db.js');

var Article = mongoose.model('article');

// Get all articles
router.get('/all', (req, res, next) => {
  Article.find((err, articles) => {
    res.send(articles);
    res.end();
  });
});

// Get article by ID
router.get('/article/:id', (req, res, next) => {
  var id = req.params.id;
  Article.findById(id, (err, article) => {
    if (err) {
      res.send(err);
      res.end();
    }
    if (article) {
      res.send(article);
      res.end()
    }
  });
});

// Create new article
router.post('/create', (req, res, next) => {
  const password = "Patrick4321!";
  const passwordCandidate = req.body.password;
  if (password !== passwordCandidate) {
    res.send("Unauthorized");
    res.end();
  }
  var article = req.body.article;
  const newArticle = Article({
    title: article.title,
    subtitle: article.subtitle,
    body: article.body,
    author: article.author,
    date: article.date,
    tags: article.tags
  });
  newArticle.save().then(() => {
    res.send(true);
    res.end();
  });
});

// Get articles by tag
router.get('/tag/:tag', (req, res, next) => {
  var tag = req.params.tag;
  Article.find({tags: tag}, (err, articles) => {
    if (err) {
      res.json(err);
      res.end();
    }
    if (articles) {
      res.send(articles);
      res.end();
    }
  });
})

router.post('/delete', (req, res, next) => {
  var id = req.body.id;
  var password = req.body.password;
  if (password == "Patrick4321!") {
    Article.findByIdAndRemove(id, (err, article) => {
      if (err) {
        res.send(err);
        res.end();
      } else {
        res.send(true);
        res.end();
      }
    });
  } else {
    res.send("Unauthorized");
    res.end();
  }
});

router.post('/update', (req, res, next) => {
  var id = req.body.id;
  var password = req.body.password;
  var newArticle = req.body.article;
  if (password == "Patrick4321!") {
    Article.findByIdAndUpdate(id, newArticle, (err, article) => {
      if (err) {
        res.send(err);
        res.end();
      } else {
        res.send(true);
        res.end();
      }
    });
  } else {
    res.send("Unauthorized");
    res.end();
  }
})

module.exports = router;
