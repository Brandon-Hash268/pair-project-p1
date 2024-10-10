const { adminController } = require("../controllers/adminController");
const Controller = require("../controllers/controller");

const router = require("express").Router();

router.get("/",Controller.home);

router.get("/:id/edit",adminController.getEdit);
router.post("/:id/edit",adminController.postEdit);

router.get("/:id/delete",adminController.getdelete);

router.get("/add",adminController.getAdd);
router.post("/add",adminController.postAdd);


router.get("/:id/buy",Controller.formBuy);
router.post("/:id/buy",Controller.postBuy);

router.get("/:id/sell",Controller.formSell);
router.post("/:id/sell",Controller.postSell);



module.exports = router;