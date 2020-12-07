var express = require('express');
var Appliances = require('../models/appliances');

var router = express.Router();


//________GET_________

router.get('/', (req, res) => {
  Appliances.getAllAppliances((err, appliances) => {
    if (err)
      return res.json(err);
    return res.json(appliances);
  });
});


module.exports = router;
