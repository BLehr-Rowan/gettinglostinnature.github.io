const path = require("path");
const db = require(path.join(__dirname, "../database.cjs"));
/**
 * remove a trail from the database and returns to profile
 * @author Cory Lillis
 */
module.exports = {
    name: "/removeTrail",
    method: "post",
    async execute(req, res)
    {
        if(!req.cookies.username)
        {
            res.redirect("/");
            return;
        }
        await db.removeTrail(req.body.trail);
        res.redirect("profile");
    }
};
