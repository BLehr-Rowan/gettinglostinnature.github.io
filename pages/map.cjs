/**
 * Server renders the map page
 * @author Cory Lillis
 */
module.exports = {
    name: "/map",
    method: "get",
    execute(req, res) {
        if (!req.cookies.username) {
            res.redirect("/");
            return;
        }
        res.render("map", {
            loggedIn: req.cookies.username !== undefined,
            "x1": req.query.x1,
            "y1": req.query.y1,
            "x2": req.query.x2,
            "y2": req.query.y2
        });
    }
}; 