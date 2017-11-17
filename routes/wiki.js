let express = require('express');
let router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

module.exports = router;

// retrieves all wiki pages:
router.get('/', function (req, res, next) {
  Page.findAll({})
    .then(function (foundPages) {
      res.render('index', {
        pages: foundPages
      });
    })
    .catch(function (err){
      next(err);
    });
});

// submits a new page to the database:
router.post('/', function (req, res, next) {
  // cannot just include email here!
  User.findOrCreate({
    where: {
      email: req.body.userEmail,
      name: req.body.userName
    }
  })
  .spread(function(user, createdBool){ // 'spread' breaks apart the returned array into two arguments
    return Page.create(req.body)
      .then(function(newPage){
        return newPage.setAuthor(user); // REMEMBER: author could be anything!
      });
    })
    .then(function(savedPage){
      res.redirect(savedPage.route);
      // savedPage.route same as '/wiki/' + savedPage.urlTitle
    })
    .catch(next);
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
      if (foundPage === null){
        return next(new Error('That page does not exist!'));
      }
      foundPage.getAuthor()
        .then(function (author){
          foundPage.author = author;
          res.render('wikipage', {
            page: foundPage
          });
        });
    })
    .catch(function (err){
      next(err);
    });
});
