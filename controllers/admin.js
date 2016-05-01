// CSV to JSON converter
var Converter = require("csvtojson").Converter;
var converter = new Converter({});
var listing = require('../models/Listing');
var multer = require('multer');
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './data');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now()+ '.csv');
  }
});
var upload = multer({ storage : storage}).single('database');
var newListing;

exports.getDashboard = function(req, res) {
  listing.count({}, function( err, count){
    res.render('dashboard', {
      count : count
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
