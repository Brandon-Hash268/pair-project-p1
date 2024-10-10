const { adminController } = require("../controllers/adminController");
const Controller = require("../controllers/controller");

const router = require("express").Router();

router.get("/",Controller.home);

router.get("/:id/edit",adminController.getEdit);
router.post("/:id/edit",adminController.postEdit);

router.get("/:id/delete",adminController.getdelete);

router.get("/add",adminController.getAdd);
router.post("/add",adminController.postAdd);


module.exports = router;