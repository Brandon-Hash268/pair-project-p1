const Controller = require("../controllers/controller");

const router = require("express").Router();


router.get("/",Controller.userProfiles);
router.get("/stock",Controller.userStock)
router.get("/transaction",Controller.transactionPage);



module.exports = router;

// revisi