const fetch = require("node-fetch");

exports.run = async (client, message, args) => {
  if (!args.length)
    return client.embedCreator(
      message.channel,
      "You need to provide a emote name!"
    );

  fetch(
    `https://benbotfn.tk/api/v1/cosmetics/br/search/all?lang=en&searchLang=en&matchMethod=starts&backendType=AthenaDance&name=${args.join(
      "+"
    )}`
  )
    .then((res) => res.json())
    .then((json) => {
      try {
        client.embedCreator(
          message.channel,
          `Name: \`\`\`${json[0].name}\`\`\`\nDescription: \`\`\`${json[0].description}\`\`\`\nID: \`\`\`${json[0].id}\`\`\`\nPath: \`\`\`${json[0].path}\`\`\` `,
          json[0].icons.icon
        );
      } catch (e) {
        client.embedCreator(
          message.channel,
          `Error: Can't find emote by that name!`
        );
      }
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["dance"],
  permLevel: "User",
};

exports.help = {
  name: "emote",
  category: "Fortnite",
  description: "Get's information on a emote for Fortnite.",
  usage: "emote",
};
