const bcrypt = require("bcryptjs/dist/bcrypt")
const{User,UserProfile} = require("../models")
// const session = require("express-session")

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

            let person = await User.findOne({
                where:{email}
            })
            // console.log(user);
            if(!person)throw new Error(`Cant find user with that Email`)

            let isValid = bcrypt.compareSync(password,person.password)
            if(isValid == true){
                // console.log(req.session);
                req.session.user = {id:person.id,role:person.role}
                
            }
            if(isValid == false)throw new Error(`Your Password is wrong`)

            res.redirect("/stock")
        } catch (error) {
            console.log(error);
            
            res.redirect(`/login?error=${error.message}`)
        }
    }

    static async registerForm(req,res){
        let {error} = req.query
        try {
            if(error){
               error = error.split(",")
            }
            console.log(error);
            
            res.render("register",{error})
        } catch (error) {
            res.send(error)        
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
            if (error.name == 'SequelizeValidationError') {
                let errors = error.errors.map(e => e.message)
                // console.log(errors);
                res.redirect(`/register?error=${errors}`)        
            }else{
                res.redirect(`/register?error=${error.message}`)       
            }   
        }
    }
}

module.exports = {userController}