const { Stock } = require("../models");

class Controller {
    static async home(req,res) {
        try {
            let data = await Stock.findAll();
            res.render("home", { data });
        } catch (err) {
            res.send(err.message)
        }
    }
}

module.exports = Controller;