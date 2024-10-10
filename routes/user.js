const Controller = require("../controllers/controller");

const router = require("express").Router();


router.get("/",Controller.userProfiles);
router.get("/stock",Controller.userStock)
router.get("/:id/transaction",Controller.formBuy);

module.exports = router;

// revisi