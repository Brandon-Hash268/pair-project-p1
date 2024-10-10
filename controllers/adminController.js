const {Stock} = require("../models")

class adminController{
    static async getEdit(req,res){
        const{id} = req.params
        try {
            let stock = await Stock.findByPk(id)
            res.render("EditAdd",{stock})
        } catch (error) {
            res.send(error)
        }
    }

    static async postEdit(req,res){
        const{id} = req.params
        try {
            await Stock.update(req.body,{
                where:{id}
            })
            res.redirect("/stock")
        } catch (error) {
            res.send(error)
        }
    }

    static async getdelete(req,res){
        const{id} = req.params
        try {
            await Stock.destroy({
                where:{id}
            })
            res.redirect("/stock")
        } catch (error) {
            res.redirect("/stock?error=Cant delete Stocks that User Have")
        }
    }

    static async getAdd(req,res){
        try {
            let stock = "" 
            res.render("EditAdd",{stock})
        } catch (error) {
            res.send(error)
        }
    }

    static async postAdd(req,res){
        const{id} = req.params
        try {
            await Stock.create(req.body)
            res.redirect("/stock")
        } catch (error) {
            res.send(error)
        }
    }
}
module.exports ={adminController}