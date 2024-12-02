const path = require("path");
const { password_hash, password_verify } = require(path.join(__dirname, "../password.cjs"));
const db = require(path.join(__dirname, "../database.cjs"));
/**
 * If login successful, server redirects to profile page,
 * else renders
 * @author Cory Lillis
 */
module.exports = {
    name: "/login",
    method: "get",
    async execute(req, res)
    {
        if(req.cookies.username)
        {
            res.redirect("/profile");
            return;
        }
        res.render("login");
    }
};
