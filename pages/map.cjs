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
        });
    }
}; 