const fetch = require("node-fetch");

exports.run = async (client, message, args) => {
  if (!args.length)
    return client.embedCreator(
      message.channel,
      "You need to provide a backpack name!"
    );

  fetch(
    `https://benbotfn.tk/api/v1/cosmetics/br/search/all?lang=en&searchLang=en&matchMethod=starts&backendType=AthenaBackpack&name=${args.join(
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
          `Error: Can't find backpack by that name!`
        );
      }
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["backbling"],
  permLevel: "User",
};

exports.help = {
  name: "backpack",
  category: "Fortnite",
  description: "Get's information on a backpack for Fortnite.",
  usage: "backpack",
};
