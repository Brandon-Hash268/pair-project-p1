const Controller = require("../controllers/controller");

// login,post,register,postregister
const router = require("express").Router();


router.get("/login",);
router.get("/post");
router.get("/register");
router.get("/postRegister");

router.use("/user",require("./user"))
router.use("/stock",require("./stock"))


module.exports = router;