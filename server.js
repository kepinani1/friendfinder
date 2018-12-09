var express = require("express");
var bodyParser = require("body-parser");


var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//port from which client requests will be listening
app.listen(PORT, function() {
    //server
    console.log("Server listening on: http://localhost:" + PORT);
  });

  require("./FriendFinder/app/routing/apiRoutes")(app);
  require("./FriendFinder/app/routing/htmlRoutes")(app);