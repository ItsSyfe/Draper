module.exports = async (client, message) => {
  if (message.author.bot) return;

  const settings = (message.settings = client.getSettings(message.guild));

  if (settings.lvlsEnabled == "true" && message.guild) {
    const key = `${message.guild.id}-${message.author.id}`;

    client.points.ensure(`${message.guild.id}-${message.author.id}`, {
      user: message.author.id,
      guild: message.guild.id,
      points: 0,
      level: 1,
    });

    let level = client.points.get(key, "level");
    let xp = client.points.get(key, "points");

    randomPoints = client.randomInt(1, 12);
    client.points.set(key, xp + randomPoints, "points");

    if (xp > level * 40) {
      client.embedCreator(
        message.channel,
        `<@${message.author.id}>, You've leveled up to level **${level + 1}**!`
      );
      client.points.set(key, level + 1, "level");
      client.points.set(key, 0, "points");
    }
  }

  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    return client.embedCreator(
      message.channel,
      `My prefix on this guild is \`${settings.prefix}\``
    );
  }

  if (message.content.indexOf(settings.prefix) !== 0) return;

  const args = message.content
    .slice(settings.prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  if (message.guild && !message.member)
    await message.guild.fetchMember(message.author);

  const level = client.permlevel(message);

  const cmd =
    client.commands.get(command) ||
    client.commands.get(client.aliases.get(command));
  if (!cmd) return;

  if (cmd && !message.guild && cmd.conf.guildOnly)
    return client.embedCreator(
      message.channel,
      "This command is unavailable via private message. Please run this command in a guild."
    );

  if (level < client.levelCache[cmd.conf.permLevel]) {
    if (settings.systemNotice === "true") {
      return client.embedCreator(
        message.channel,
        `You do not have permission to use this command.
  Your permission level is ${level} (${
          client.config.permLevels.find((l) => l.level === level).name
        })
  This command requires level ${client.levelCache[cmd.conf.permLevel]} (${
          cmd.conf.permLevel
        })`
      );
    } else {
      return;
    }
  }

  message.author.permLevel = level;

  message.flags = [];
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1));
  }

  client.logger.cmd(
    `[CMD] ${client.config.permLevels.find((l) => l.level === level).name} ${
      message.author.username
    } (${message.author.id}) ran command ${cmd.help.name}`
  );
  cmd.run(client, message, args, level);
};
