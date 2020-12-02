var express = require('express');
var Users = require('../models/users');

var router = express.Router();


//________GET_________

router.get('/', (req, res) => {
  Users.getAllUsers((err, users) => {
    if (err)
      return res.json(err);
    return res.json(users);
  });
});

router.get('/:username', (req, res) => {
  Users.getUserId(req.params.username, (err, user_id) => {
    if (err)
      return res.json(err);
    return res.json(user_id);
  });
});


//http://localhost:5000/api/users/[username]/pantry
router.get('/:username/saved', (req, res) => {
  Users.getSaved(req.params.username, (err, users) => {
    if (err)
      return res.json(err);
    return res.json(users);
  });
});

router.get('/:username/recommendations', (req, res) => {
  Users.getRecTrending(req.params.username, (err, users) => {
    if (err)
      return res.json(err);
    return res.json(users);
  });
});

//http://localhost:5000/api/users/[username]/pantry
router.get('/:username/pantry', (req, res) => {
  Users.getPantry(req.params.username, (err, users) => {
    if (err)
      return res.json(err);
    return res.json(users);
  });
});


//________POST_________

//http://localhost:5000/api/users/[username]/pantry
router.post('/:username/pantry', (req, res) => {
  var user_id = Users.getUserId(req.params.username, (error, user_id) => {
    if (error)
      return res.json(error);
    return res.json(user_id);
  });
  Users.addToPantry(req.body.user_id, req.body.ingredient_id, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});


router.post('/', function(req, res) {
  Users.addUser(req.body.first_name, req.body.last_name, req.body.username, req.body.password, req.body.email, function(err, result) {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
