const path = require("path");
const db = require(path.join(__dirname, "../database.cjs"));
/**
 * adds a trail to the database renders the map page
 * @author Cory Lillis
 */
module.exports = {
    name: "/addTrail",
    method: "get",
    execute(req, res)
    {
        if(!req.cookies.username)
        {
            res.redirect("/");
            return;
        }
        db.insertTrail({
            "creator": req.cookies.username,
            "x1": req.query.x1,
            "y1": req.query.y1,
            "x2": req.query.x2,
            "y2": req.query.y2
        });
        res.redirect("map");
    }
};
