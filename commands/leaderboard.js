exports.run = async (client, message, args) => {
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
  category: "Levelling",
  description: "Shows the server level leaderboard.",
  usage: "leaderboard",
};
