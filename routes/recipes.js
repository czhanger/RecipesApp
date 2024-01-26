const express = require("express");
const router = express.Router();

const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const recipes = require("../controllers/recipes");
const catchAsync = require("../utils/catchAsync");

router
  .route("/")
  .get(recipes.index)
  .post(upload.array("image"), catchAsync(recipes.createRecipe));

// ---------- New Recipe ---------- //
router.get("/new", recipes.renderNewForm);

// ---------- Show Recipe ---------- //
router
  .route("/:id")
  .get(catchAsync(recipes.showRecipe))
  .put(catchAsync(recipes.updateRecipe))
  .delete(catchAsync(recipes.destroyRecipe));

// ---------- Edit Recipe ---------- //
router.route("/:id/edit").get(catchAsync(recipes.renderEditForm));

module.exports = router;
