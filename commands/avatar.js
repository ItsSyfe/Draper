const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  const user =
    message.mentions.users.first() ||
    client.users.cache.find((user) => user.username === args[0]) ||
    client.users.cache.get(args[0]) ||
    message.author;

  const embedCreated = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setAuthor(
      "Draper",
      client.user.avatarURL(),
      "https://github.com/ItsSyfe/Draper"
    )
    .setDescription(`Avatar for <@${user.id}>`)
    .setImage(user.displayAvatarURL({ format: "png", dynamic: true }))
    .setTimestamp()
    .setFooter("Created by Syfe", client.user.avatarURL());

  message.channel.send(embedCreated);
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
