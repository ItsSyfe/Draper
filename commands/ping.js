exports.run = async (client, message, args) => {
  const msg = await client.embedCreator(
    message.channel,
    `Pong, Took ${client.ws.ping}ms!`
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
};

exports.help = {
  name: "ping",
  category: "Miscelaneous",
  description: "It like... Pings. Then Pongs. And it's not Ping Pong.",
  usage: "ping",
};
