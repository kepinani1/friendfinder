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

    var otherFriendScore = req.body.scores;
    var scoresArray = [];
    var userMatch = 0;

     //runs through all current friends in list
     for(var i=0; i<friends.length; i++){
        var scoresDifference = 0;
        //run through scores to compare friends
        for(var j=0; j<otherFriendScore.length; j++){
          scoresDifference += (Math.abs(parseInt(friends[i].scores[j]) - parseInt(otherFriendScore[j])));
        }
  
        //push results into scoresArray
        scoresArray.push(scoresDifference);
      }
  
      //after all friends are compared, find best match
      for(var i=0; i<scoresArray.length; i++){
        if(scoresArray[i] <= scoresArray[userMatch]){
          userMatch = i;
        }
      }
  
      //return bestMatch data
      var idealMate = friends[userMatch];
      res.json(idealMate);
  
      //pushes new submission into the friendsList array
      friends.push(req.body);
    });
  };