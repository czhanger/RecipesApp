const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("suggestions/suggestions")
})

module.exports = router