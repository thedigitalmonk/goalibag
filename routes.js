var listController = require('./controllers/listing');
var csvController = require('./controllers/csv');
var userController = require('./controllers/user');
var listings = require('./models/Listing');
var homeController = require('./controllers/home');

// expose the routes to our app with module.exports
module.exports = function(app) {

  app.get('/', homeController.workInProgress);

  //app.get('/', listController.getListings);

  app.get('/listing', listController.getListings);

  app.get('/listing/new', loggedIn, listController.addNewListing);

  app.get('/listing/:id', listController.getSingleListing);

  app.post('/listing', listController.addListing);

  app.get('/listing/:id/edit', loggedIn, listController.editListing);

  app.post('/listing/:id/edit', loggedIn, listController.updateListing);

  app.get('/listing/:id/delete', loggedIn, listController.removeListing);

  app.post('/search', listController.searchListing);



  //Admin
  app.get('/upload', loggedIn, csvController.addCsv);

  app.get('/deleteAllListings', listController.deleteAllListings);

  app.post('/csv/upload', csvController.csvUpload);

  app.get('/register', function(req, res) { res.render('register'); });

  app.get('/login', function(req, res) { res.render('login'); });

  app.post('/login', userController.loginUser);

  app.post('/register', loggedIn, userController.addUser);

  app.get('/logout', userController.logout);

}

function loggedIn(req, res, next) {
  if(req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}
