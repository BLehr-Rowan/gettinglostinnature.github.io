const path = require("path");
const db = require(path.join(__dirname, "../database.cjs"));
/**
 * Server renders the profile page
 * @author Cory Lillis
 */
module.exports = {
    name: "/profile",
    method: "get",
    async execute(req, res)
    {
        if(!req.cookies.username)
        {
            res.redirect("/");
            return;
        }
        const trails = await db.getTrails(req.cookies.username);
        let pfp, bio;
        res.render("profile", {
            username: req.cookies.username,
            trails: trails,
            pfp: pfp ?? "/images/default.jpg",
            bio: bio ?? "About Me...",
        });
    }
};
