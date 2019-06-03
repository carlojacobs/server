var express = require('express');
var router = express.Router();
const mongoose = require('../public/javascripts/dbs/wos_db.js');

var Article = mongoose.model('article')

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

router.get('/front', (req, res, next) => {
  Article.find({frontpage: true}, (err, articles) => {
    if (err) {
      res.send(err);
      res.end();
    }
    if (articles) {
      var frontPageArticles = articles.sort((a, b) => {
        return (Date.parse(b.date) - Date.parse(a.date));
      });
      res.send(frontPageArticles);
      res.end()
    }
  });
});

// Get fresh articles
router.get('/fresh/:limit', (req, res, next) => {
  var limit = req.params.limit;
  Article.find().exec((err, articles) => {
    if (err) {
      res.send(err);
      res.end();
    }
    var freshArticles = articles.sort((a, b) => {
      return (Date.parse(b.date) - Date.parse(a.date));
    });
    freshArticles.length = limit;
    res.send(freshArticles);
    res.end();
  });
});

// Get all articles
router.get('/all', (req, res, next) => {
  Article.find((err, articles) => {
    res.send(articles);
    res.end();
  });
});

// Create new article
router.post('/create', (req, res, next) => {
  const password = "WOS";
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
    imageUrl: article.imageUrl,
    frontpage: article.frontpage,
    date: article.date,
    tags: article.tags
  });
  newArticle.save().then(() => {
    res.send(newArticle);
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

module.exports = router;