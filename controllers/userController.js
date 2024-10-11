const bcrypt = require("bcryptjs/dist/bcrypt");
const { User, UserProfile } = require("../models");

class userController {
    static async loginForm(req, res) {
        const { error } = req.query;
        try {
            res.render("Login", { error });
        } catch (error) {
            res.send(error);
        }
    }

    static async postLogin(req, res) {
        const { email, password } = req.body;
        try {
            if (!email || !password) throw new Error(`Please fill the Password and Email`);

            let person = await User.findOne({
                where: { email }
            });

            if (!person) throw new Error(`Can't find user with that Email`);

            let isValid = bcrypt.compareSync(password, person.password);
            if (isValid) {
                req.session.user = { id: person.id, role: person.role };

                // Emit a login notification
                global.io.emit('notification', `Welcome back, ${person.email}! You have successfully logged in.`);
                res.redirect("/stock"); // Move this inside after successful login
            } else {
                throw new Error(`Your Password is wrong`);
            }
        } catch (error) {
            console.log(error);
            res.redirect(`/login?error=${error.message}`);
        }
    }

    static async registerForm(req, res) {
        let { error } = req.query;
        try {
            if (error) {
                error = error.split(",");
            }
            console.log(error);

            res.render("register", { error });
        } catch (error) {
            res.send(error);
        }
    }

    static async postRegister(req, res) {
        const { email, password, firstName, lastName, birthDate, role } = req.body;
        try {
            let data = await User.create({ email, password, role });
            await UserProfile.create({ firstName, lastName, birthDate, UserId: data.id });

            res.redirect("/login");
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                let errors = error.errors.map(e => e.message);
                res.redirect(`/register?error=${errors}`);
            } else {
                res.redirect(`/register?error=${error.message}`);
            }
        }
    }
}

module.exports = { userController };
