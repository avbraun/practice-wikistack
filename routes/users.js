let express = require('express');
let router = express.Router();
let models = require('../models');
let Page = models.Page;
let User = models.User;

module.exports = router;

// retrieves a list of all users:
router.get('/', function (req, res, next){
  User.findAll({})
    .then(function(foundUsers){
      res.render('userpage', {
        users: foundUsers
      });
    })
      .catch(next);
});

// retrieves a list of all pages written by one user:
router.get('/:id', function (req, res, next){
  let userPromise = User.findOne({ where: { id: req.params.id }});
  let pagePromise = Page.findAll({ where: {authorId: req.params.id }});

  Promise.all([
    userPromise,
    pagePromise
  ])
    .then(function(values){
      let user = values[0];
      let pages = values[1];
      res.render('singleuserpage', {
        pages: pages,
        user: user
      });
    })
      .catch(next);
});
