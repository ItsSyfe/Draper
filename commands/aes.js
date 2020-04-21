const fetch = require("node-fetch");

exports.run = async (client, message, args) => {
  fetch("https://api.nitestats.com/v1/aes")
    .then((res) => res.json())
    .then((json) =>
      client.embedCreator(
        message.channel,
        `AES: \`\`\`${json.data.aes}\`\`\`\nNetCL: \`\`\`${json.data.netCL}\`\`\``
      )
    );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["netcl"],
  permLevel: "User",
};

exports.help = {
  name: "aes",
  category: "Fortnite",
  description: "Get's the AES key for Fortnite.",
  usage: "aes",
};
