const { Op } = require("sequelize");
const currency = require("../helpers/currency");
const { Stock,User,Portofolio,UserProfile,Transaction } = require("../models");
const io = require("../app")

class Controller {
    static async home(req,res) {
        let {search} = req.query
        let {error} = req.query
        try {
            let data = await Stock.findAll({
                order:[["price","DESC"]],
                ...(search?{where:{code:{[Op.iLike]:`%${search}%`}}}:{})
            });

            res.render("home", { data,currency,error });
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
            // console.log(user);
            
            
            
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
            // console.log(totalStock);
            
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
            global.io.emit(`Succesfully bought ${stock.code}`);
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
            // console.log(error);
            
            if(error)error = error.split(",")
            
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
            // console.log(user);

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
            // console.log(totalStock);
            
            const stock = await Stock.findByPk(id);
            let portofolio = await Portofolio.findOne({where:{StockId:id}})

            if (!portofolio && portofolio.totalStock == 0) {
                throw new Error(`You dont own Any stock`)
            }else{
                if(totalStock > portofolio.totalStock)throw Error(`You dont have that much Stocks`)
                portofolio.totalStock -= Number(totalStock)
                portofolio.totalValue -= Portofolio.totalMoney(stock.price,totalStock)
                await portofolio.save()
            }
            await Transaction.create({UserId:userId,StockId:id,totalStock,price:stock.price,type:`Sell`,transactionDate:new Date()})

            // res.send(user)
            res.redirect("/stock");
        } catch (error) {
            if (error.name == 'SequelizeValidationError') {
                let errors = error.errors.map(e => e.message)
                console.log(error);
                res.redirect(`/stock/${id}/sell?error=${errors}`)        
            }else{
                res.redirect(`/stock/${id}/sell?error=${error.message}`)       
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
            // console.log(totalBalance);
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
            
            let portofolio = await Portofolio.findAll({
                where:{
                    UserId:id,
                    totalStock:{[Op.gt]:0}
                },
                include:Stock
            })
            console.log(portofolio);
            
            // res.send(portofolio)
            res.render("UserStock",{portofolio,currency})
        } catch (error) {
            res.send(error)
        }
    }

    static async transactionPage(req,res){
        try {
            let id = req.session.user.id
            // console.log(id);
            
            let transaction = await Transaction.findAll({
                where:{UserId:id, },
                include:Stock
            })
            // console.log(portofolio);
            
            // res.send(portofolio)
            res.render("Transaction",{transaction,currency})
        } catch (error) {
            res.send(error)
        }
    }
    
}

module.exports = Controller;