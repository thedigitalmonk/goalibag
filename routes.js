var listController = require('./controllers/listing');
var listings = require('./models/Listing');


// expose the routes to our app with module.exports
module.exports = function(app) {


app.get('/', listController.getListings);

app.get('/listing', listController.getListings);

app.get('/listing/new', listController.addNewListing);

app.get('/listing/:index', listController.getSingleListing);

app.post('/listing', listController.addListing);

app.get('/listing/:index/edit', listController.editListing);

app.post('/listing/:index/edit', listController.updateListing);

app.get('/listing/:index/delete', listController.removeListing);

app.post('/search', listController.searchListing);


}
