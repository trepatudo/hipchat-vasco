var ack = require('ac-koa').require('hipchat');
var pkg = require('./package.json');
var app = ack(pkg);

var addon = app.addon(
{
  "capabilities": {
    "hipchatApiConsumer": {
      "scopes": [
        "send_notification"
      ]
    },
    "installable": {
      "allowRoom": true,
      "allowGlobal": false,
      "callbackUrl": "https://ack-greeter.ngrok.com/addon/installable"
    },
    "webhook": []
  },
  "key": "ac-koa-hipchat-greeter's paradise",
  "name": "greeter",
  "description": "Listens to HipChat rooms for configurable text patterns and responds with canned responses",
  "version": "0.1.4",
  "vendor": {
    "name": "Atlassian",
    "url": "http://atlassian.com"
  },
  "links": {
    "self": "https://ack-greeter.ngrok.com/addon/capabilities",
    "homepage": "https://ack-greeter.ngrok.com/"
  }
}
);
//var addon = app.addon()
//  .hipchat()
//  .allowRoom(true)
//  .scopes('send_notification');

addon.webhook('room_enter', function *() {
  yield this.roomClient.sendNotification('Hi, ' + this.sender.name + '!');
});

app.listen();
