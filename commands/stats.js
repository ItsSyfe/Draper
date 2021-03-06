const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

exports.run = (client, message, args, level) => {
  // eslint-disable-line no-unused-vars
  const duration = moment
    .duration(client.uptime)
    .format(" D [days], H [hrs], m [mins], s [secs]");
  client.embedCreator(
    message.channel,
    `= STATISTICS =
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${duration}
• Users      :: ${client.users.cache.size}
• Servers    :: ${client.guilds.cache.size}
• Channels   :: ${client.channels.cache.size}
• Discord.js :: v${version}
• Node       :: ${process.version}`,
    { code: "asciidoc" }
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
};

exports.help = {
  name: "stats",
  category: "Miscelaneous",
  description: "Gives some useful bot statistics",
  usage: "stats",
};
