exports.run = async (client, message, args) => {
  client.points.ensure(`${message.guild.id}-${message.author.id}`, {
    user: message.author.id,
    guild: message.guild.id,
    points: 0,
    level: 1,
  });

  const filtered = client.points
    .filter((p) => p.guild === message.guild.id)
    .array();

  const sorted = filtered.sort((a, b) => b.points - a.points);

  const top10 = sorted.splice(0, 10);

  let msgToSend = new Array();
  for (const data of top10) {
    msgToSend.push(
      `${client.users.cache.get(data.user).tag} ${data.points} XP (Level ${
        data.level
      })`
    );
  }

  client.embedCreator(
    message.channel,
    `Leaderboard (Top 10)\n\n${msgToSend.join("\n")}`
  );
  return;
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["lb", "top"],
  permLevel: "User",
};

exports.help = {
  name: "leaderboard",
  category: "Levels",
  description: "Shows the server level leaderboard.",
  usage: "leaderboard",
};
