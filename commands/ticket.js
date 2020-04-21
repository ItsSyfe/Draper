exports.run = async (client, message, args) => {
  message.delete();
  let topic = args.join(" ");
  let id =
    message.author.id.toString().substr(0, 4) + message.author.discriminator;
  let chan = `ticket-${id}`;
  if (message.guild.channels.cache.find((channel) => channel.name === chan)) {
    client.embedCreator(message.channel, `You already have an open ticket.`);
    return;
  }

  message.guild.channels
    .create(`ticket-${id}`, {
      type: "text",
      permissionOverwrites: [
        {
          id: message.author.id,
          allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
        },
        {
          id: message.guild.id,
          deny: ["VIEW_CHANNEL", "SEND_MESSAGES"],
        },
      ],
      topic: `${message.author} | ${topic}`,
    })
    .then(async (c) => {
      c.send("@here").then((sentMessage) => {
        sentMessage.delete();
      });

      await client.embedCreator(
        c,
        `__**Here's your ticket channel, ${message.author}**__`
      );

      client.embedCreator(
        message.channel,
        `Your ticket (${c}) has been created.\nPlease read the information sent and follow any instructions given.`
      );
      client.embedCreator(c, `**Ticket topic:** \`${topic}\``);

      client.logger.cmd(
        `${message.author.tag} created a new ticket (#ticket-${id})`
      );
    });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["new"],
  permLevel: "User",
};

exports.help = {
  name: "ticket",
  category: "Ticketing",
  description: "Ticket command, makes ticket duh.",
  usage: "ticket",
};
