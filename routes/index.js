const Controller = require("../controllers/controller");
const { userController } = require("../controllers/userController");
const session = require("express-session")

// login,post,register,postregister
const router = require("express").Router();


router.get("/login",userController.loginForm);
router.post("/login",userController.postLogin)

router.get("/register",userController.registerForm);
router.post("/register",userController.postRegister);

router.use(function(req,res,next){
    console.log(req.session);
    if (!req.session.user) {
        let error = `Please Login First`
        res.redirect(`/login?error=${error}`)
    }else{
        if (req.session && req.session.user) {
            res.locals.role = req.session.user.role;
        } else {
            res.locals.role = null;  // Handle unauthenticated users
        }
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