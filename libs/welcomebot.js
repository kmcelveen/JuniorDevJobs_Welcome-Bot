'use strict';

var util = require('util');
var Bot = require('slackbots');

var WelcomeBot = function Constructor(settings) {
  this.settings = settings;
  this.settings.name = this.settings.name || 'welcomebot';
  this.user = null;
};

// inherits methods and properties from the Bot constructor
util.inherits(WelcomeBot, Bot);

WelcomeBot.prototype.run = function() {
  WelcomeBot.super_.call(this, this.settings);

  // this.on('start', this._onStart);
  this.on('message', this._onMessage);
};


WelcomeBot.prototype._loadBotUser = function() {
  var self = this;
  this.user = this.users.filter(function(user) {
    return user.name === self.name;
  })[0];
};


WelcomeBot.prototype._welcomeMessage = function() {
  this.postMessageToChannel(this.channels[0].name, 'Hey, hey, hey,', {
    as_user: true
  });
};

WelcomeBot.prototype._onMessage = function(message) {
  if (this._isChatMessage(message) && this._isChannelConversation(message)) {
    this._replyWithWelcomeMessage(message);
  }
};

WelcomeBot.prototype._replyWithWelcomeMessage = function(originalMessage) {
  var self = this;
  var channel = self._getChannelById(originalMessage.channel);
  self.postMessageToChannel(channel.name, 'Welcome to Junior Dev Jobs Slack group. Head over to the @introduction channel to introduce yourself to the group. Tells us where you are located, your expertise and what you are currently working on.', {
    as_user: true
  });
};

WelcomeBot.prototype._getChannelById = function(channelId) {
  return this.channels.filter(function(item) {
    return item.id === channelId;
  })[0];
};
module.exports = WelcomeBot;
