exports.run = async (client, message, args) => {
  const key = `${message.guild.id}-${message.author.id}`;
  return client.embedCreator(
    message.channel,
    `You currently have ${client.points.get(
      key,
      "points"
    )} XP, and are Level ${client.points.get(key, "level")}!`
  );
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["rank", "lvl"],
  permLevel: "User",
};

exports.help = {
  name: "level",
  category: "Levelling",
  description: "Get's your xp and level.",
  usage: "level",
};
