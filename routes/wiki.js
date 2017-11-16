let express = require('express');
let router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

module.exports = router;

router.get('/', function (req, res, next) {
  res.redirect('/');
  // retieve all wiki pages
});

router.post('/', function (req, res, next) {
  // submit a new page to the db
  var newPage = Page.build(req.body
    // { title: req.body.title,
    // content: req.body.content,
    // status: req.body.status }
  );
  newPage.save()
    .then(function (){
      res.redirect('/wiki');
    })
    .catch(function (err){
      next(err);
    });
});

router.get('/add/', function (req, res, next) {
  res.render('addpage');
  //  retrieve the 'add a page' form
});
