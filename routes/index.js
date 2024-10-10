const Controller = require("../controllers/controller");
const { userController } = require("../controllers/userController");

// login,post,register,postregister
const router = require("express").Router();


router.get("/login",userController.loginForm);
router.post("/login",userController.postLogin)

router.get("/register",userController.registerForm);
router.post("/register",userController.postRegister);

router.use(function(req,res,next){
    if (!req.session.user) {
        let error = `Please Login First`
        res.redirect(`/login?error=${error}`)
    }else{
        next()
    }
})

router.get("/logout",async(req,res) => {
    req.session.destroy(function(err){

    })
})

router.use("/user",require("./user"))
router.use("/stock",require("./stock"))


module.exports = router;