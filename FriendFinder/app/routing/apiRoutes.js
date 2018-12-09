// Dependencies. If you note, I made another function in the survey.html page. I just wasn't sure if the applicable function for finding array difference between the user and the friends array should be inserted here or in the survey.html file.
var friends = require('../data/friends.js');

// Export the function
module.exports = function (app) {

    // Sets the get for the api/friends route
    app.get('/api/friends', function (req, res) {
        res.json(friends);
    });

    // Set the post for the api/friends route
    app.post('/api/friends', function (req, res) {
        //setting of applicable variables
        var difference = 30;
        var name = '';
        var photo = '';

        // Looping through friends.js to find a match
        friends.forEach(function (friend) {
            // Variables for comparing matches (an array comparing user scores, and another for the total difference). The total difference of 30 is just a number I made up. I thought it would be a reasonable number for max difference.
            var userScores = [];
            var totalDifference = [];

            //Loops through users scores, and compares absolute difference from friend array
            for (var i = 0; i < friend.scores.length; i++) {
                userScores.push(Math.abs(parseInt(req.body.scores[i]) - parseInt(friend.scores[i])));

            }


            // If the above value is smaller than the previous difference...
            if (totalDifference < difference) {
                // Set it as the previous difference...
                difference = totalDifference;
                // And set these variables to the appropriate celeb match
                name = friend.name;
                photo = friend.photo;
            }
        });
        //match with least difference will appear. This will be interpreted as the celeb the user has the highest compatibility with.
        res.json({
            name: name,
            photo: photo
        });

        // This adds the new users sent data object to friends.js
        friends.push(req.body);
    });
}