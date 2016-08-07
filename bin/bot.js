'use strict';

var WelcomeBot = require('../libs/welcomebot.js');

var token = process.env.BOT_API_KEY;
var name = process.env.BOT_NAME;

var welcomebot = new WelcomeBot({
  token: token,
  name: name
});

welcomebot.run();
