let express = require('express');
let router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

module.exports = router;

// retrieves all wiki pages:
router.get('/', function (req, res, next) {

  Page.findAll()
  .then(function (foundPages) {
    res.render('index', {
      pages: foundPages
    });
  })
  .catch(function (err){
    next(err);
  })
});

// submits a new page to the database:
router.post('/', function (req, res, next) {
  var newPage = Page.build(req.body
    // { title: req.body.title,
    // content: req.body.content,
    // status: req.body.status }
  );
  newPage.save()
    .then(function (savedPage){
      res.redirect('/wiki' + savedPage.route);
    })
    .catch(function (err){
      next(err);
    });
});

// retrieves the 'add a page' form:
router.get('/add', function (req, res, next) {
  res.render('addpage');
});

// retrieves one wiki page:
router.get('/:urlTitle', function (req, res, next){
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
    .then(function (foundPage){
      res.render('wikipage', {
        page: foundPage
      });
    })
    .catch(function (err){
      next(err);
    });
});
