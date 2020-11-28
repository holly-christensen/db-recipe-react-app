var express = require('express');
var Users = require('../models/users');

var router = express.Router();

router.get('/', (req, res) => {
  //res.send('this works');
  Users.retrieveAll((err, users) => {
    if (err)
      return res.json(err);
    return res.json(users);
  });

});


router.post('/', function(req, res) {
  var user = req.body.user;

  Users.insert(user, function(err, result) {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
