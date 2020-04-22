exports.run = async (client, message, args) => {
  if (!args.length)
    return client.embedCreator(
      message.channel,
      "Please enter a amount of messages to delete."
    );

  if (!message.member.guild.me.hasPermission("MANAGE_MESSAGES"))
    return client.embedCreator(
      message.channel,
      "I don't have the required permissions to do this!"
    );

  message.delete();

  let messageAmtToDel = args[0];

  if (messageAmtToDel > 100)
    return client.embedCreator(
      message.channel,
      "You can only delete up to 100!"
    );

  message.channel.messages
    .fetch({
      limit: messageAmtToDel,
    })
    .then((messages) => {
      message.channel.bulkDelete(messages);
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["clean", "clear", "prune"],
  permLevel: "Administrator",
};

exports.help = {
  name: "purge",
  category: "Moderation",
  description: "Purges channel of specified messages.",
  usage: "purge",
};
