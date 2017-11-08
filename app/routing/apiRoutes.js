// Declaring variable from API routing
// Getting info from the default friend.js
var friendTable = require("../data/friend");

// This function would calculate the total of the point inside the array
var calcTotalScore = function(array) {
    var totalScore = 0;
    for (var w = 0; w < array.length; w++) {
        totalScore += parseInt(array[w]);
    }
    return totalScore;
}

// This function find the best match of friend  
var best_match = function(friends, new_user) {
    var new_array = [];
    //This section would create a new array with the user information but with the score totalized.
    //The we evaluate total and find the closer results
    for (var i = 0; i < friends.length; i++) {
        var score_eva = friends[i].score;
        new_array.push({ user: friends[i].name, photo: friends[i].photo, score: calcTotalScore(score_eva) });
    }
    //To start the evaluation we choose the as max score (10 questions, 5 point max = 50)
    var max_choice = 40;
    var user_match = "";
    for (var x = 0; x < new_array.length; x++) {
        var calc = Math.abs(new_user - new_array[x].score);
        if (calc <= max_choice) {
            max_choice = calc;
            //sending back the name and picture address
            user_match = new_array[x].user;
            photo_address = new_array[x].photo;

        };
    }
    return [user_match, photo_address];
};
module.exports = function(app) {
    //This section would let the server to handle the routing and let the user to see the array
    app.get("/api/friendTable", function(req, res) {
        res.json(friendTable);
    });

    // Here is the metod to allow the adding from te form into the array friends.
    app.post("/api/friendTable", function(req, res) {
        //this would updat the array friends.
        var new_user_score = calcTotalScore(req.body.score);
        var best_result = best_match(friendTable, new_user_score);

        //This line say to the json on survey.html, Yes! there is data added
        friendTable.push(req.body);
        res.json(best_result);
    })
};