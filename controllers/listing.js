var listing = require('../models/Listing');
var newListing;
var session;
var moment = require('moment');
exports.getListings = function(req, res){

  listing.find({status: 'active'}, function(err, listings) {
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
    description: req.body.description,
    attractions: req.body.attractions,
    image: req.body.image,
    status: req.body.status
  });
  newListing.save(function(err) {
    if (err) throw err;
    console.log('Listing saved successfully!');
  });
  res.redirect('/');
};

exports.updateListing = function(req, res){

    listing.findById(req.params.id, function(err, listing) {

      listing.name = req.body.name,
      listing.price = req.body.price,
      listing.address = req.body.address,
      listing.email = req.body.email,
      listing.contact = req.body.contact,
      listing.price = req.body.price,
      listing.price_wknd = req.body.price_wknd,
      listing.menu_type = req.body.menu_type,
      listing.toilet_type = req.body.toilet_type,
      listing.hasFood = req.body.hasFood,
      listing.hasWifi = req.body.hasWifi,
      listing.hasAC = req.body.hasAC,
      listing.hasPickup = req.body.hasPickup,
      listing.hasGuide = req.body.hasGuide,
      listing.hasConference = req.body.hasConference,
      listing.hasEvent = req.body.hasEvent,
      listing.hasAlcohol = req.body.hasAlcohol,
      listing.special = req.body.special,
      listing.location = req.body.location,
      listing.description = req.body.description,
      listing.attractions = req.body.attractions,
      listing.image = req.body.image,
      listing.status = req.body.status

      listing.save(function(err) {
        if (err) throw err;
        console.log('Listing updated successfully!');
      });
    });

    res.redirect('/');

};





exports.searchListing = function(req, res){
    var budget = req.body.budget.split("-");
    var query = {
      location: req.body.location,
      status: 'active'
    }
    //var querylog = JSON.stringify(query, null, 4);
    listing.find(query).
    where('price').gt(budget[0]).lt(budget[1]).
    exec(function(err, listings) {
      if(err) throw err;
      res.render('results', {
        listings : listings,
        query: query
      });
    });
};

exports.searchListingByLocation = function(req, res){
    var query = {
      location: req.params.location,
      status: 'active'
    }
    //var querylog = JSON.stringify(query, null, 4);
    listing.find(query).
    exec(function(err, listings) {
      if(err) throw err;
      res.render('results', {
        listings : listings,
        query: query
      });
    });
};



exports.removeListing = function(req, res){

  listing.findById(req.params.id).remove().exec();
  res.redirect('/');

};

exports.deleteAllListings = function(req, res) {
  listing.remove({}, function(err, success){
    if (err) throw err;
    res.render('dashboard', {
      message: "Successfully deleted all listings."
    });
  });
}
