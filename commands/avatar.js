const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  const user =
    message.mentions.users.first() ||
    client.users.cache.find((user) => user.username === args[0]) ||
    client.users.cache.get(args[0]) ||
    message.author;

  client.embedCreator(
    message.channel,
    `Avatar for ${user.username}`,
    user.displayAvatarURL()
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["pfp"],
  permLevel: "User",
};

exports.help = {
  name: "avatar",
  category: "Miscelaneous",
  description: "Get's the avatar of the user.",
  usage: "avatar {user}",
};
