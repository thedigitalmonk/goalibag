// load mongoose since we need it to define a model
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create a schema
var listingSchema = new Schema({
  name: String,
  price: Number,
  location: String,
  features: Array,
  created_at: Date,
  updated_at: Date
});

// on every save, add the date
listingSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

// the schema is useless so far
// we need to create a model using it
var listing = mongoose.model('listing', listingSchema);
module.exports = listing;
