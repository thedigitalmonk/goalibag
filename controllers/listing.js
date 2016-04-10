var listing = require('../models/Listing');

// listing.find({}, function(err, listings) {
//   if (err) throw err;
//   console.log(listings);
// });

//console.log(listings);

exports.getListings = function(req, res){
  listing.find({}, function(err, listings) {
    if (err) throw err;
    res.render('list',{
      pageTitle: 'Alibag hotels and cottages',
      listings: listings
    });
  });
};

exports.addNewListing = function(req, res){
  res.render('add');
};

exports.getSingleListing = function(req, res){
  var listing = listings[req.params.index];
  res.render('single', {
    pageTitle: 'Listing details',
    listings: listings
  });
};

exports.editListing = function(req, res){
  var listing = listings[req.params.index];
  res.render('edit', {
    listings : listings
  });
};

exports.removeListing = function(req, res){
  listing.findOne({'name': 'Shripad'}, function(err, listings) {
    if (err) throw err;

    //Remove this listing
    listing.remove(function(err, removed) {
      if (err) throw err;
      console.log('Listing successfully deleted!');
    });

    //redirect to homepage
    res.redirect('/listing');
  });
};

exports.addListing =  function(req, res){
  listings.push({
    name:   req.body.name,
    price:  req.body.price
  });
  res.redirect('/listing');
};

exports.updateListing = function(req, res){
    listings[req.params.index].name = req.body.name;
    listings[req.params.index].price = req.body.price;
    res.redirect("/listing");
};

exports.searchListing = function(req, res){
    var keyword = req.body.keyword;
    var Results = listings.filter(function(el){
      return (el.name == keyword);
    });
    res.render('results', {
      results: Results
    });
};
