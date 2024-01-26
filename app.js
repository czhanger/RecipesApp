if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const session = require("express-session");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const ExpressError = require("./utils/ExpressError");

const ejsMate = require("ejs-mate");

const Recipes = require("./models/recipes");
const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/recipes-app";
mongoose.connect(dbUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(
  session({
    secret: "secret-here",
    resave: false,
    saveUninitialized: true,
  })
);

// ---------- Routes ---------- //
const recipeRoutes = require("./routes/recipes");
const suggestionRoutes = require("./routes/suggestions");
const groceryRoutes = require("./routes/groceries");

app.use("/recipes", recipeRoutes);
app.use("/suggestions", suggestionRoutes);
app.use("/groceries", groceryRoutes);

app.get("/", (req, res) => {
  res.render("home");
});

// ---------- Error Handling---------- //
app.all((err, req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  if (!err.message) err.message = "Something went wrong";
  res.status(statusCode).render("error", { err });
});

// ---------- PORT---------- //
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Serving on port 3000");
});
