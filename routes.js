var listController = require('./controllers/listing');
var adminController = require('./controllers/admin');
var userController = require('./controllers/user');
var listings = require('./models/Listing');
var loggedIn;

// expose the routes to our app with module.exports
module.exports = function(app) {

  //app.get('/', homeController.workInProgress);

  app.get('/', listController.getListings);

  app.get('/listing/new', loggedIn, listController.addNewListing);

  app.get('/listing/:id', listController.getSingleListing);

  app.post('/listing', listController.addListing);

  app.get('/listing/:id/edit', loggedIn, listController.editListing);

  app.post('/listing/:id/edit', loggedIn, listController.updateListing);

  app.get('/listing/:id/delete', loggedIn, listController.removeListing);

  app.post('/search', listController.searchListing);

  app.post('/search/:location', listController.searchListingByLocation);



  //Admin
  app.get('/dashboard', loggedIn, adminController.getDashboard);

  app.get('/deleteAllListings', listController.deleteAllListings);

  app.post('/upload', adminController.csvUpload);

  app.post('/search', listController.searchListing);

  app.get('/register', function(req, res) { res.render('register'); });

  app.get('/login', function(req, res) { res.render('login'); });

  app.post('/login', userController.loginUser);

  app.post('/register', loggedIn, userController.addUser);

  app.get('/logout', userController.logout);

}

function loggedIn(req, res, next) {
  if(req.session.user) {
    loggedIn = true;
    next();
  } else {
    res.redirect('/login');
  }
}
