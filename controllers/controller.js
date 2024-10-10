const { Op } = require("sequelize");
const currency = require("../helpers/currency");
const { Stock,User,Portofolio,UserProfile } = require("../models");

class Controller {
    static async home(req,res) {
        let {search} = req.query
        try {
            let data = await Stock.findAll({
                order:[["price","DESC"]],
                ...(search?{where:{code:{[Op.iLike]:`%${search}%`}}}:{})
            });

            res.render("home", { data,currency });
        } catch (err) {
            res.send(err.message)
        }
    }

    static async userProfiles(req,res){
        try {
            let id = req.session.user.id
            // console.log(id);
            
            let user = await User.findByPk(id,{
                include:[
                    {
                        model:UserProfile
                    },
                    {
                        model:Portofolio,
                        include:Stock
                    }
                ]
            })
            // console.log(user);
            
            // res.send(user)
            res.render("Profile",{user})
        } catch (error) {
            res.send(error)
        }
    }

    static async userStock(req,res){
        try {
            let id = req.session.user.id
            console.log(id);
            
            let portofolio = await Portofolio.findOne({
                where:{UserId:id},
                include:{model:stock}
            })
            console.log(portofolio);
            
            res.send(user)
            res.render("UserStock",{portofolio})
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller;