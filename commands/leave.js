exports.run = async (client, message, args) => {
  await message.channel.send("Bye!");
  message.guild.leave();
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Bot Owner",
};

exports.help = {
  name: "leave",
  category: "Miscelaneous",
  description: "Leaves server.",
  usage: "leave",
};
