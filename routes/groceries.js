const express = require("express");
const router = express.Router();

const groceries = require("../controllers/groceries");
const catchAsync = require("../utils/catchAsync");

router.route("/").get(groceries.index).delete(groceries.clearList);

router.route("/:id").get(groceries.addToList).delete(groceries.deleteFromList);

module.exports = router;
