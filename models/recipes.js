const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const opts = { toJSON: { virtuals: true } };

const recipeSchema = new Schema(
  {
    title: String,
    images: [ImageSchema],
    ingredients: [String],
    instructions: String,
  },
  opts
);

module.exports = mongoose.model("Recipe", recipeSchema);
