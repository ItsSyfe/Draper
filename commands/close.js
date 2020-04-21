exports.run = async (client, message, args) => {
  if (message.channel.name.includes("ticket-")) {
    client.embedCreator(
      message.author,
      `Closed (#${message.channel.name}) in ${message.guild.name}.`
    );
    message.channel.delete();
  } else {
    client.embedCreator(
      message.channel,
      "This isn't a ticket! You can't close it."
    );
  }
  message.delete();
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Administrator",
};

exports.help = {
  name: "close",
  category: "Ticketing",
  description: "Closes the current ticket",
  usage: "close",
};
