var express = require('express');
var Users = require('../models/users');

var router = express.Router();

router.get('/', (req, res) => {
  Users.retrieveAll((err, users) => {
    if (err)
      return res.json(err);
    return res.json(users);
  });
});

router.get('/:userId', (req, res) => {
  Users.getUser(req.params.userId, (err, users) => {
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
