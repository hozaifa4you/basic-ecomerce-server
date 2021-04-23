const router = require("express").Router();

const { register } = require("../controllers/userCtrl");

router.post("/register", register);

module.exports = router;
