const { Op } = require("sequelize");
const currency = require("../helpers/currency");
const { Stock,User,Portofolio,UserProfile,Transaction } = require("../models");
const transaction = require("../models/transaction");

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

    static async formBuy(req,res) {
        const {id} = req.params;
        const userId = req.session.user.id
        try {
            const stock = await Stock.findByPk(id);
            // console.log(stock);
            const user = await User.findByPk(userId,{
                include:{
                    model:Portofolio,
                    where:{
                        StockId:id
                    },
                    required:false
                }
            })
            console.log(user);
            
            
            
            // res.send(user)
            res.render("formbuy", {stock,user,currency});
        } catch (err) {
            res.send(err.message)
        } 
    }

    static async postBuy(req,res) {
        const {id} = req.params;
        const userId = req.session.user.id
        const{totalStock} = req.body
        try {
            console.log(totalStock);
            
            const stock = await Stock.findByPk(id);
            let portofolio = await Portofolio.findOne({where:{StockId:id}})

            if (!portofolio) {
                await Portofolio.create({UserId:userId,StockId:id,totalStock:totalStock})
            }else{
                portofolio.totalStock += Number(totalStock)
                portofolio.totalValue += Portofolio.totalMoney(stock.price,totalStock)
                await portofolio.save()
            }
            await Transaction.create({UserId:userId,StockId:id,totalStock,price:stock.price,type:`Buy`,transactionDate:new Date()})

            // res.send(user)
            res.redirect("/stock");
        } catch (err) {
            res.send(err)
        } 
    }

    static async formSell(req,res) {
        const {id} = req.params;
        const userId = req.session.user.id
        let {error} = req.query
        try {
            if(error)error = error.split(",")
            
            const stock = await Stock.findByPk(id);
            console.log(stock);
            const user = await User.findByPk(userId,{
                include:{
                    model:Portofolio,
                    where:{
                        StockId:id
                    },
                    required:false
                }
            })
            console.log(user);
            
            
            
            // res.send(user)
            res.render("FormSell", {stock,user,currency,error});
        } catch (err) {
            res.send(err.message)
        } 
    }

    static async postSell(req,res) {
        const {id} = req.params;
        const userId = req.session.user.id
        const{totalStock} = req.body
        try {
            console.log(totalStock);
            
            const stock = await Stock.findByPk(id);
            let portofolio = await Portofolio.findOne({where:{StockId:id}})

            if (!portofolio) {
                throw new Error(`You dont own Any stock`)
            }else{
                portofolio.totalStock -= Number(totalStock)
                portofolio.totalValue -= Portofolio.totalMoney(stock.price,totalStock)
                await portofolio.save()
            }
            await Transaction.create({UserId:userId,StockId:id,totalStock,price:stock.price,type:`Sell`,transactionDate:new Date()})

            // res.send(user)
            res.redirect("/stock");
        } catch (err) {
            if (error.name == 'SequelizeValidationError') {
                let errors = error.errors.map(e => e.message)
                // console.log(errors);
                res.redirect(`/register?error=${errors}`)        
            }else{
                res.redirect(`/register?error=${error.message}`)       
            }
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
                        model:Portofolio
                    }
                ]
            })
            console.log(user.Portofolios);
            
            const totalBalance = await Portofolio.Total(user.id);
            console.log(totalBalance);
            if (user.Portofolios) {
                
                res.render('profile', { user, totalBalance,currency });
              } else {
                // Handle the case when the user has no portfolio
                res.render('profile', { user, totalBalance: 0,currency });
              }
        } catch (error) {
            res.send(error)
        }
    }

    static async userStock(req,res){
        try {
            let id = req.session.user.id
            // console.log(id);
            
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