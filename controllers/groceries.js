const Recipes = require("../models/recipes");

module.exports.index = async (req, res) => {
  const groceryList = req.session.groceryList || [];
  res.render("groceries/groceries", { groceryList });
};

module.exports.addToList = async (req, res) => {
  const recipe = await Recipes.findById(req.params.id);
  req.session.groceryList = req.session.groceryList || [];
  const isRecipeInList = req.session.groceryList.some(
    (item) => String(item._id) == String(recipe._id)
  );
  if (!isRecipeInList) {
    req.session.groceryList.push(recipe);
  }
  res.redirect("/groceries");
};

module.exports.deleteFromList = async (req, res) => {
  const recipe = await Recipes.findById(req.params.id);
  req.session.groceryList = req.session.groceryList || [];

  req.session.groceryList = req.session.groceryList.filter(
    (item) => String(item._id) !== String(recipe._id)
  );

  res.redirect("/groceries");
};

module.exports.clearList = async (req, res) => {
  req.session.groceryList = [];
  res.redirect("/groceries");
};
