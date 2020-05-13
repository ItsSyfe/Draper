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
      "You can't ban yourself silly!"
    );
  if (!message.guild.member(user).bannable)
    return client.embedCreator(
      message.channel,
      "I don't have permission to ban this user!"
    );
  const banReason = args.slice(1).join(" ");
  client.embedCreator(
    message.channel,
    `🚫 Banned user ${user.name} for reason: ${banReason}`
  );
  message.guild.member(user).ban({ reason: banReason });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Administrator",
};

exports.help = {
  name: "ban",
  category: "Moderation",
  description: "Bans a specified user.",
  usage: "ban",
};
