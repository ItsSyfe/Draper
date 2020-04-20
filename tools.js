const Discord = require("discord.js");

module.exports = {
  embedCreator: function (channel, message) {
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setAuthor(
        "Draper",
        "https://i.imgur.com/BZFhQYJ.png",
        "https://github.com/ItsSyfe/Draper"
      )
      .setDescription(message)
      .setThumbnail("https://i.imgur.com/BZFhQYJ.png")
      .setTimestamp()
      .setFooter("Created by Syfe", "https://i.imgur.com/BZFhQYJ.png");

    channel.send(exampleEmbed);
  },
};
