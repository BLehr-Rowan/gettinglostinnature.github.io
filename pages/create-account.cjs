const path = require("path");
const db = require(path.join(__dirname, "../database.cjs"));
const { password_hash } = require(path.join(__dirname, "../password.cjs"));
/**
 * If account creation successful, server redirects to index page,
 * else renders create account page
 * @author Cory Lillis
 */
module.exports = {
    name: "/create-account",
    method: "post",
    async execute(req, res)
    {
        if(req.cookies.username)
        {
            res.redirect("/profile");
            return;
        }
        if(req.body.username && req.body.password)
        {
            db.insertUser({
                "username": req.body.username,
                "hash": password_hash(req.body.password)
            });
            res.redirect("/");
            return;
        }
        res.render("signup", req.query);
    }
};
