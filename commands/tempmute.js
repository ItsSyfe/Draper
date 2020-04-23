exports.run = async (client, message, [userToFind, muteTime, ...reason]) => {
  const user =
    message.mentions.users.first() ||
    client.users.cache.find((user) => user.username === userToFind) ||
    client.users.cache.get(userToFind);
  if (!user)
    return client.embedCreator(message.channel, "Please mention a user!");

  let userNameWTag = user.tag;

  let muteRole = message.guild.roles.cache.find(
    (r) => r.name.toLowerCase() === "muted"
  );

  if (!muteRole)
    return client.embedCreator(message.channel, "Please create a muted role!");

  await message.guild.member(user).roles.add(muteRole.id);
  client.embedCreator(
    message.channel,
    `<:mute:702889951770968115>Muted user ${userNameWTag} for ${muteTime}\nReason: ${reason.join(
      " "
    )}`
  );

  let muteTimeSplit = muteTime.match(/[a-zA-Z]+|[0-9]+(?:\.[0-9]+)?|\.[0-9]+/g);
  if (
    muteTimeSplit[1].toLowerCase() == "sec" ||
    muteTimeSplit[1].toLowerCase() == "s"
  ) {
    muteTime = muteTimeSplit[0] * 1000;
  } else if (
    muteTimeSplit[1].toLowerCase() == "min" ||
    muteTimeSplit[1].toLowerCase() == "m"
  ) {
    muteTime = muteTimeSplit[0] * 60000;
  } else if (
    muteTimeSplit[1].toLowerCase() == "hr" ||
    muteTimeSplit[1].toLowerCase() == "h"
  ) {
    muteTime = muteTimeSplit[0] * 3600000;
  } else if (
    muteTimeSplit[1].toLowerCase() == "day" ||
    muteTimeSplit[1].toLowerCase() == "d"
  ) {
    muteTime = muteTimeSplit[0] * 86400000;
  }

  setTimeout(function () {
    message.guild.member(user).roles.remove(muteRole.id);
    client.embedCreator(message.channel, `Unmuted user ${userNameWTag}`);
  }, muteTime);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Moderator",
};

exports.help = {
  name: "tempmute",
  category: "Moderation",
  description: "Temporarily mute a user.",
  usage: "tempmute",
};
