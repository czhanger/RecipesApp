const Recipes = require("../models/recipes");

module.exports.index = async (req, res) => {
  const recipes = await Recipes.find();
  res.render("recipes/index", { recipes });
};

module.exports.renderNewForm = (req, res) => {
  res.render("recipes/new");
};

module.exports.createRecipe = async (req, res, next) => {
  const recipe = new Recipes(req.body.recipe);
  recipe.images = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  //split string into array
  const ingredients = req.body.recipe.ingredients
    .split(",")
    .map((ingredient) => ingredient.trim());
  recipe.ingredients = ingredients;
  await recipe.save();
  console.log(recipe);
  res.redirect(`/recipes/${recipe._id}`);
};

module.exports.showRecipe = async (req, res) => {
  const recipe = await Recipes.findById(req.params.id);
  if (!recipe) {
    res.redirect("/recipes");
  }
  res.render("recipes/show", { recipe });
};

module.exports.destroyRecipe = async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipes.findByIdAndDelete(id);
  res.redirect("/recipes");
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipes.findById(id);
  let ingredients = "";
  for (let [index, ingredient] of recipe.ingredients.entries()) {
    ingredients += `${ingredient}`;
    if (index != recipe.ingredients.length - 1) {
      ingredients += ", ";
    }
  }
  console.log(ingredients);
  if (!recipe) {
    res.redirect("/recipes");
  }
  res.render("recipes/edit", { recipe, ingredients });
};

module.exports.updateRecipe = async (req, res) => {
  const { id } = req.params;
  const ingredients = req.body.recipe.ingredients
    .split(",")
    .map((ingredient) => ingredient.trim());
  req.body.recipe.ingredients = ingredients;
  const recipe = await Recipes.findByIdAndUpdate(id, {
    ...req.body.recipe,
  });
  res.redirect(`/recipes/${recipe._id}`);
};
