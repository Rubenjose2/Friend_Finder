// Dependencies

var express = require("express");
var bodyParser = require("body-parser");

// Express Configuration

var app = express();

// Set the port to start listeing 

var PORT = process.env.PORT || 8000;

// Set the handle and data parsing 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// start the server and listen

app.listen(PORT, function() {
    console.log("App listening on PORT" + PORT);
})