var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require ('fs');


/* GET phoneBook. */
router.get('/', function(req, res, next) {
  fs.readFile('./phonebook.json','utf8',function(err,data){
    if (data){
      res.send(data);
    }
  });
});

/* save phoneBook. */
router.post('/', function(req, res, next) {
  var data = JSON.stringify(req.body);
  console.log(data);
  fs.writeFile('./phonebook.json', data, 'utf8', function(err){
    if (!err){
      console.log("yey");
      res.send('saved!')
    }
    else {
      console.log(err);
    }

  });
});


module.exports = router;
