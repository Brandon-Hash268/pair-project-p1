const currency = require("../helpers/currency");
const { Stock } = require("../models");

class Controller {
    static async home(req,res) {
        try {
            let data = await Stock.findAll({
                order:[["price","DESC"]]
            });

            res.render("home", { data,currency });
        } catch (err) {
            res.send(err.message)
        }
    }

    // static async getBuy(req,res) {
    //     const {id} = req.params
    //     try {
            
    //         res.render("home", { data });
    //     } catch (err) {
    //         res.send(err.message)
    //     }
    // }

    
    static async formBuy(req,res) {
        const {id} = req.params;
        try {
            const data = await Stock.findByPk(id);
            res.render("formbuy", {data});
            // console.log(data);
            
            // res.send(data);
        } catch (err) {
            res.send(err.message)
        }
    }

}

module.exports = Controller;