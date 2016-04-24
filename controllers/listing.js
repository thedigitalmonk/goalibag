var listing = require('../models/Listing');
var newListing;
var session;
// listing.find({}, function(err, listings) {
//   if (err) throw err;
//   console.log(listings);
// });

//console.log(listings);

exports.getListings = function(req, res){
  
  if(req.session.user) loggedIn = true;
  if(!req.session.user) loggedIn = false;
  
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
  listing.findById(req.params.id, function(err, listing){

    if (err) throw err;

    res.render('single', {
      pageTitle: 'Listing details',
      listing: listing
    });

  });

};

exports.editListing = function(req, res){
  listing.findById(req.params.id, function(err, listing) {
    if (err) throw err;
    res.render('edit', {
      pageTitle: 'Edit Listing',
      listing : listing
    });  
  });
  
};

exports.removeListing = function(req, res){
  listing.findById(req.params.id).remove().exec();
  res.redirect('/listing');
};

exports.addListing =  function(req, res){
  newListing = new listing({
    name: req.body.name,
    price: req.body.price,
    address: req.body.address,
    email: req.body.email,
    contact: req.body.contact,
    price: req.body.price,
    price_wknd: req.body.price_wknd,
    menu_type: req.body.menu_type,
    toilet_type: req.body.toilet_type,
    hasFood: req.body.hasFood,
    hasWifi: req.body.hasWifi,
    hasAC: req.body.hasAC,
    hasPickup: req.body.hasPickup,
    hasGuide: req.body.hasGuide,
    hasConference: req.body.hasConference,
    hasEvent: req.body.hasEvent,
    hasAlcohol: req.body.hasAlcohol,
    special: req.body.special,
    location: req.body.location,
    features: req.body.features,
    image: req.body.image
  });
  newListing.save(function(err) {
    if (err) throw err;
    console.log('Listing saved successfully!');
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

exports.deleteAllListings = function(req, res) {
  listing.remove({}, function(err, success){
    if (err) throw err;
    res.redirect("/listing");
  });
}