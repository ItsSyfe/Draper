exports.run = async (client, message, args) => {
  client.points.ensure(`${message.guild.id}-${message.author.id}`, {
    user: message.author.id,
    guild: message.guild.id,
    points: 0,
    level: 1,
  });

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
  category: "Levels",
  description: "Get's your xp and level.",
  usage: "level",
};
