let express = require('express');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let nunjucks = require('nunjucks');
let app = express();

// ROUTERS:
let models = require('./models');
let wikiRouter = require('./routes/wiki');
let userRouter = require('./routes/user');

let Page = models.Page;
let User = models.User;

let env = nunjucks.configure('views', {noCache: true});

// NUNJUCKS:
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

// MIDDLEWARE:
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/public'));

// ROUTERS:
app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

// ERROR-HANDLING MIDDLEWARE:
app.use(function (err, req, res, next){
  console.error(err);
  res.status(500).send(err.message);
});

// MAIN PAGE:
app.get('/', function(req, res){
  res.render('index');
});

// DATABASE SYNC:
models.db.sync({})
.then(function () {
  app.listen(3000, function(req, res){
    console.log('Server is listening on port 3000!');
  });
})
.catch(console.error);
