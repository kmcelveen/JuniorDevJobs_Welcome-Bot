var express = require('express');
var app = express();
var apiKey = require('./config.js');
var PORT = process.env.PORT || 3000;

var SlackBot = require('slackbots');

// create a bot
var bot = new SlackBot({
  token: apiKey.SLACK_API_KEY_TEST,
  name: 'welcomebot'
});


bot.on('start', function() {
  console.log('i started');
});


bot.on('message', function(data) {

  console.log('message event fired', data.type);
  if(data.type === 'team_join'){
    console.log("Someone joined the team", data);

    console.log('***************** this is the users name', data.user.name);

    bot.postMessageToChannel('general', 'Welcome @'+ data.user.name + ' to the Junior Dev Jobs community! Go to the introductions channel and tell us about yourself! 1. Name 2. Location 3. Expertise', { as_user: true});
  }
});



app.listen(PORT, function() {
  console.log('Listening on port ' + PORT);
});
