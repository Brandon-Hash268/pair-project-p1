const Controller = require("../controllers/controller");

const router = require("express").Router();

router.get("/");
router.get("/:id/transaction",Controller.formBuy);

module.exports = router;

// revisi