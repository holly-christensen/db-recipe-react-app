var express = require('express');
var Utils = require('../models/utils');

var router = express.Router();

router.get('/', (req, res) => {
  Utils.getHome((err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

router.get('/lastid', (req, res) => {
  Utils.getLastId((err, id) => {
    if (err)
      return res.json(err);
    return res.json(id);
  });
});



//________POST_________




module.exports = router;
