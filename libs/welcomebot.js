'use strict';

var util = require('util');
var Bot = require('slackbots');

var WelcomeBot = function Constructor(settings) {
  this.settings = settings;
  this.settings.name = this.settings.name || 'welcomebot';
};

// inherits methods and properties from the Bot constructor
util.inherits(WelcomeBot, Bot);

WelcomeBot.prototype.run = function() {
  WelcomeBot.super_.call(this, this.settings);

  this.on('start', this._onStart);
  this.on('message', this._onMessage);
};

WelcomeBot.prototype._isTeamJoinEvent = function(message) {
  if (message.type === 'team_join') {
    return true;
  } else {
    return false;
  }
};

WelcomeBot.prototype._onStart = function() {
  var self = this;
  console.log('Started');
  self.postMessageToChannel('random', 'I\'m the lion', {
    as_user: true
  });
};

WelcomeBot.prototype._onMessage = function(message) {
  if (this._isTeamJoinEvent(message)) {
    this._replyWithWelcomeMessage(message);
  }
};

WelcomeBot.prototype._replyWithWelcomeMessage = function(originalMessage) {
  var self = this;
  self.postMessageToChannel('general', 'Welcome @' + originalMessage.user.name + ' to Junior Dev Jobs community. Go to the introduction channel and tell us about yourself! 1. Name 2. Location 3. Expertise', {
    as_user: true
  });
};


module.exports = WelcomeBot;
