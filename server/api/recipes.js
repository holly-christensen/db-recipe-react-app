var express = require('express');
var Recipes = require('../models/recipes');

var router = express.Router();


router.get('/', (req, res) => {
  Recipes.getAllRecipes((err, recipes) => {
    if (err)
      return res.json(err);
    return res.json(recipes);
  });
});

router.get('/:recipe_id', (req, res) => {
  Recipes.getRecipeInfo(req.params.recipe_id, (err, recipe) => {
    if (err)
      return res.json(err);
    return res.json(recipe);
  });
});

router.get('/:recipe_id/ingredients', (req, res) => {
  Recipes.getRecipeIngredients(req.params.recipe_id, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

router.get('/:recipe_id/appliances', (req, res) => {
  Recipes.getRecipeAppliances(req.params.recipe_id, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

router.get('/:recipe_id/tags', (req, res) => {
  Recipes.getRecipeTags(req.params.recipe_id, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});




//________POST_________

router.post('/', (req, res) => {
  Recipes.createRecipe(req.body.user_id, req.body.title, req.body.description, req.body.photo, req.body.minutes, req.body.servings, req.body.instructions, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

router.post('/:recipe_id/ingredients', (req, res) => {
  Recipes.addRecipeIngredient(req.params.recipe_id, req.body.ingredient_id, req.body.amount, req.body.unit, req.body.optional, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

router.post('/:recipe_id/appliances', (req, res) => {
  Recipes.addRecipeAppliance(req.params.recipe_id, req.body.appliance_id, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

router.post('/:recipe_id/tags', (req, res) => {
  Recipes.addRecipeTag(req.params.recipe_id, req.body.tag_id, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});





module.exports = router;
