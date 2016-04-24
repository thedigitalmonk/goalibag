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

exports.csvUpload = function(req, res) {
  upload(req, res, function (err) {
    if (err) {
      res.render('csv', {
        uploadMessage: err
      });
    }
    
    convertfile(req.file.filename);
    // Everything went fine
    //console.log("successfully"); 
    res.render('csv', {
      uploadMessage: 'Uploaded file successfully'
    });
    
  })
}

exports.addCsv = function(req, res) {
  res.render('csv');
}

function convertfile(filename) {
  
  //end_parsed will be emitted once parsing finished
  converter.on("end_parsed", function (jsonArray) {
     saveRecords(jsonArray);
  });

  //read from file
  require("fs").createReadStream("./data/"+filename).pipe(converter);
}

function saveRecords(jsonArray){
  listing.create(jsonArray, function(err){
    if(err) throw err;
    console.log("Saved all listings successfully");
  });
}