var express = require('express');
var Recommendations = require('../models/recommendations');

var router = express.Router();

router.get('/trending', (req, res) => {
  Recommendations.getTrending((err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

router.get('/lowcost/:user_id', (req, res) => {
  Recommendations.getLowCost(req.params.user_id, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

router.get('/similartags/:user_id', (req, res) => {
  Recommendations.getSimilarTags(req.params.user_id, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

router.get('/byfollow/:user_id', (req, res) => {
  Recommendations.getByFollow(req.params.user_id, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});


//________POST_________




module.exports = router;
