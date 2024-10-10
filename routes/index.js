// login,post,register,postregister
const router = require("express").Router();


router.get("/login");
router.get("/post");
router.get("/register");
router.get("/postRegister");

app.use("/user",require("./user"))
app.use("/stock",require("./stock"))


module.exports = router;