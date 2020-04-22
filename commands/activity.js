exports.run = async (client, message, args) => {
  if (!args.length)
    return client.embedCreator(
      message.channel,
      "You need to provide arguments!"
    );
  await client.user.setActivity(args.slice(2).join(" "), {
    type: args[1],
  });
  await client.user.setStatus(args[0]);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["status"],
  permLevel: "Bot Admin",
};

exports.help = {
  name: "activity",
  category: "Miscelaneous",
  description: "Changes bot activity.",
  usage:
    "activity (STATUS e.g. dnd, avaliable, offline) (TYPE e.g. LISTENING, WATCHING, PLAYING) (MESSAGE)",
};
