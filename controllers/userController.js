const bcrypt = require("bcryptjs/dist/bcrypt")
const{User,UserProfile} = require("../models")

class userController{
    static async loginForm(req,res){
        const {error} = req.query
        try {
            
            res.render("Login",{error})
        } catch (error) {
            res.send(error)
        }
    }

    static async postLogin(req,res){
        const{email,password} = req.body
        try {
            if(!email || !password)throw new Error(`Please fill the Password and Email`)

            let user = await User.findOne({
                where:{email}
            })
            // console.log(user);
            if(!user)throw new Error(`Cant find user with that Email`)

            let isValid = bcrypt.compareSync(password,user.password)
            if(isValid == true){
                req.session.user = {id:user.id,role:user.role}
            }
            if(isValid == false)throw new Error(`Your Password is wrong`)

            res.redirect("/stock")
        } catch (error) {
            res.redirect(`/login?error=${error.message}`)
        }
    }

    static async registerForm(req,res){
        try {
            let error = ""
            res.render("register",{error})
        } catch (error) {
            if (typeof error == "object") {
                let errors = error.errors.map(e => e.message)

                res.send(errors)        
            }else{
                res.send(error)        
            }
        }
    }

    static async postRegister(req,res){
        const{email,password,firstName,lastName,birthDate,role} = req.body
        try {
            // console.log(email,password,firstName,lastName,birthDate,role);
            let data = await User.create({email,password,role})
            await UserProfile.create({firstName,lastName,birthDate,UserId:data.id})

            res.redirect("/login")
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = {userController}