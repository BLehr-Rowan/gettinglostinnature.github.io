const path = require("path");
const db = require(path.join(__dirname, "../database.cjs"));
/**
 * adds a trail to the database renders the map page
 * @author Cory Lillis
 */
module.exports = {
    name: "/addTrail",
    method: "post",
    execute(req, res)
    {
        if(!req.cookies.username)
        {
            res.redirect("/");
            return;
        }
        // console.log(req.body);
        db.insertTrail({
            "creator": req.cookies.username,
            "name": req.body.name,
            "x1": req.body.x1,
            "y1": req.body.y1,
            "x2": req.body.x2,
            "y2": req.body.y2
        });
        res.redirect("map");
    }
};
