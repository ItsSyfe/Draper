const tools = require("../tools");

exports.run = (client, message, args) => {
  tools.embedCreator(message.channel, "Pong!");
};
