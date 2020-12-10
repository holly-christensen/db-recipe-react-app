var express = require('express');
var Tags = require('../models/tags');

var router = express.Router();


//________GET_________

router.get('/', (req, res) => {
  Tags.getAllTags((err, tags) => {
    if (err)
      return res.json(err);
    return res.json(tags);
  });
});


module.exports = router;
