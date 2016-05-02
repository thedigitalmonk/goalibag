// CSV to JSON converter
var Converter = require("csvtojson").Converter;
var converter = new Converter({});
var listing = require('../models/Listing');

//File Upload
var multer = require('multer');

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './data');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now()+ '.csv');
  }
});

var imageStorage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname + '.jpg');
  }
});

var upload = multer({ storage : storage}).single('database');

var imageUpload = multer({ storage : imageStorage}).single('image');

var newListing;

exports.getDashboard = function(req, res) {
  listing.find({}, function(err, listings) {
    if (err) throw err;
    res.render('dashboard',{
      pageTitle: 'Alibag hotels and cottages',
      listings: listings
    });
  });
}

exports.csvUpload = function(req, res) {

  upload(req, res, function (err) {

    if (err) {
      res.render('dashboard', {
        message: err + '. Sorry, no records were added.'
      });
    }

    //end_parsed will be emitted once parsing finished
    converter.on("end_parsed", function (jsonArray) {
      listing.create(jsonArray, function(err){
        if(err) throw err;
        listing.count({}, function(err, count){
          res.render('dashboard', {
            count : count,
            message: 'Uploaded file successfully. ' + count + ' records were added.'
          });
        });
      });
    });

    //read from file
    require("fs").createReadStream("./data/"+req.file.filename).pipe(converter);
  })
}


exports.uploadImage = function(req, res) {

  imageUpload(req, res, function (err) {
    if (err) {
      res.render('dashboard', {
        message: err + '. Sorry, no images were added.'
      });
    }

    listing.find({}, function(err, listings) {
      if (err) throw err;
      res.render('dashboard',{
        pageTitle: 'Alibag hotels and cottages',
        listings: listings,
        message: 'Image uploaded successfully.'
      });
    });

  })
}
