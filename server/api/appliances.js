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

router.post('/:recipe_id', (req, res) => {
  Recipes.addRecipeAppliance(req.params.recipe_id, req.body.appliance_id, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});


module.exports = router;
