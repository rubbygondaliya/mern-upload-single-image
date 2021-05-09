const express = require("express");
const router = express.Router();

//routes
router.get("/", (req, res) => {
    res.json({ time: Date().toString() });
});

module.exports = router;
