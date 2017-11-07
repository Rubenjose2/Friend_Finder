// Declaring variable from API routing
// Getting info from the default friend.js

var friendTable = require("../data/friend");
module.exports = function(app) {
    //This section would let the server to handle the routing and let the user to see the array
    app.get("/api/friendTable", function(req, res) {
        res.json(friendTable);
    });

    // Here is the metod to allow the adding from te form into the array friends.
    app.post("/api/friendTable", function(req, res) {
        //this would updat the array friends.
        friendTable.push(req.body);
        //This line say to the json on survey.html, Yes! there is data added
        res.json(true);
    })
};