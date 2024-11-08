/**
 * Server renders the map page
 * @author Cory Lillis
 */
module.exports = {
    name: "/map",
    method: "get",
    execute(req, res) {
        // Check if the user is logged in based on the presence of the username cookie
        const loggedIn = !!req.cookies.username;

        // If not logged in, redirect to the home page
        if (!loggedIn) {
            res.redirect("/");
            return;
        }

        // Render the map page with the loggedIn variable
        res.render("map", { loggedIn });
    }
};
