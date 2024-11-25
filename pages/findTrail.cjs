const path = require("path");
const db = require(path.join(__dirname, "../database.cjs"));
/**
 * find a trail in the database and render it to the map page
 * @author Cory Lillis
 */
module.exports = {
    name: "/findTrail",
    method: "get",
    async execute(req, res)
    {
        if(!req.cookies.username)
        {
            // res.redirect("/");
            // return;
        }
        const trail = await db.findTrail(req.query.trailName);
        if(trail === null)
        {
            res.redirect("map");
        }
        else
        {
            res.redirect(`map?x1=${trail.x1}&y1=${trail.y1}&x2=${trail.x2}&y2=${trail.y2}`);
        }
    }
};
