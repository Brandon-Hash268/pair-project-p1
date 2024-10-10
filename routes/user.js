const Controller = require("../controllers/controller");

const router = require("express").Router();

router.get("/",Controller.userProfiles);
router.get("/stock",Controller.userStock)

module.exports = router;

// revisi