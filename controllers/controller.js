const { Stock } = require("../models");

class Controller {
    static async home(req,res) {
        try {
            let data = await Stock.findAll({
                order:[["price","DESC"]]
            });

        let role = req.session.user?.role;  // Safely access role from session
            res.render("home", { data });
        } catch (err) {
            res.send(err.message)
        }
    }

    static async getBuy(req,res) {
        const {id} = req.params
        try {
            
            res.render("home", { data });
        } catch (err) {
            res.send(err.message)
        }
    }
}

module.exports = Controller;