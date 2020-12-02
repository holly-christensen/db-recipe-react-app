var express = require('express');
var Ingredients = require('../models/ingredients');

var router = express.Router();


//________GET_________

router.get('/', (req, res) => {
  Ingredients.getAllIngredients((err, ingredients) => {
    if (err)
      return res.json(err);
    return res.json(ingredients);
  });
});

router.get('/:ingredient_name', (req, res) => {
  Ingredients.getIngredientId(req.params.ingredient_name, (err, ingredient_id) => {
    if (err)
      return res.json(err);
    return res.json(ingredient_id);
  });
});


// router.post('/', function(req, res) {
//   Users.addUser(req.body.first_name, req.body.last_name, req.body.username, req.body.password, req.body.email, function(err, result) {
//     if (err)
//       return res.json(err);
//     return res.json(result);
//   });
// });

module.exports = router;
