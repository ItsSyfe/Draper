exports.run = async (client, message, args) => {
  const user =
    message.mentions.users.first() ||
    client.users.cache.find((user) => user.username === args[0]) ||
    client.users.cache.get(args[0]);
  if (!user)
    return client.embedCreator(message.channel, "Please mention a user!");
  if (user === message.author)
    return client.embedCreator(
      message.channel,
      "You can't kick yourself silly!"
    );
  if (!message.guild.member(user).kickable)
    return client.embedCreator(
      message.channel,
      "I don't have permission to kick this user!"
    );
  const kickReason = args.slice(1).join(" ");
  client.embedCreator(
    message.channel,
    `Kicked user ${user.name} for reason: ${kickReason}`
  );
  message.guild.member(user).kick({ reason: kickReason });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator",
};

exports.help = {
  name: "kick",
  category: "Moderation",
  description: "Kicks a specified user.",
  usage: "kick",
};
