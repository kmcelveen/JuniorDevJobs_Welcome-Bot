var express = require('express');
var app = express();
var apiKey = require('./config.js');
var PORT = process.env.PORT || 3000;

var SlackBot = require('slackbots');

// create a bot
var bot = new SlackBot({
  token: apiKey.SLACK_API_KEY,
  name: 'jrdevjobs_welcome-bot'
});

// bot.on('start', function() {
//   // more information about additional params https://api.slack.com/methods/chat.postMessage
//
// });

bot.on('message', function(data) {
  // all ingoing events https://api.slack.com/rtm

  // console.log('message event fired', data);

  if (data.channel === 'G1YSWB1DK') {
    // console.log('heyyy');

    var allUsers = bot.getUsers();
    var user = allUsers._value.members.filter(function(val) {
      return val.id === data.user ? val.name : null;
    });
    // var introChannel = bot.getChannelId('introductions');
    // console.log('the channel', introChannel)

    // console.log("this is the user", user);
    bot.postMessageToChannel('Enter Channel', 'Welcome @' + user[0].name + ' to Junior Dev Jobs Slack group. Head over to the #introductions channel to introduce yourself to the group. Tells us where you are located, your expertise and what you are currently working on.', {
      as_user: true
    });
  }
});


// bot.on('team_join', function(data) {
//   console.log("someone joined", data);
//
// });




app.listen(PORT, function() {
  console.log('Listening on port ' + PORT);
});
