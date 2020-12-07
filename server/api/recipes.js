var express = require('express');
var Recipes = require('../models/recipes');

var router = express.Router();


router.get('/', (req, res) => {
  Recipes.getAllRecipes((err, recipe) => {
    if (err)
      return res.json(err);
    return res.json(recipe);
  });
});

router.get('/:recipe_id', (req, res) => {
  Recipes.getRecipeInfo(req.params.recipe_id, (err, recipe) => {
    if (err)
      return res.json(err);
    return res.json(recipe);
  });
});


// router.post('/', function(req, res) {
//   var user = req.body.user;
//
//   Users.insert(user, function(err, result) {
//     if (err)
//       return res.json(err);
//     return res.json(result);
//   });
// });

module.exports = router;
