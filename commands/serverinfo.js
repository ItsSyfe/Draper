const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let region = {
    brazil: ":flag_br: Brazil",
    europe: ":flag_eu: Central Europe",
    singapore: ":flag_sg: Singapore",
    "us-central": ":flag_us: U.S. Central",
    sydney: ":flag_au: Sydney",
    "us-east": ":flag_us: U.S. East",
    "us-south": ":flag_us: U.S. South",
    "us-west": ":flag_us: U.S. West",
    "eu-west": ":flag_eu: Western Europe",
    "vip-us-east": ":flag_us: VIP U.S. East",
    london: ":flag_gb: London",
    amsterdam: ":flag_nl: Amsterdam",
    hongkong: ":flag_hk: Hong Kong",
    russia: ":flag_ru: Russia",
    southafrica: ":flag_za:  South Africa",
  };

  const embedCreated = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .addField("Name", message.guild.name, true)
    .addField("ID", message.guild.id, true)
    .addField(
      "Owner User",
      `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`,
      true
    )
    .addField("Owner Nickname", `${message.guild.owner.nickname}`, true)
    .addField("Region", region[message.guild.region], true)
    .addField(
      "Total | Humans | Bots",
      `${message.guild.members.cache.size} | ${
        message.guild.members.cache.filter((member) => !member.user.bot).size
      } | ${
        message.guild.members.cache.filter((member) => member.user.bot).size
      }`,
      true
    )
    .addField("Verification Level", message.guild.verificationLevel, true)
    .addField("Channels", message.guild.channels.cache.size, true)
    .addField("Roles", message.guild.roles.cache.size, true)
    .addField("Large server?", message.guild.large, true)
    .addField("Vanity URL", `discord.gg/${message.guild.vanityURLCode}`, true)
    .addField(
      "Creation Date",
      `${message.channel.guild.createdAt
        .toUTCString()
        .substr(0, 16)} (${client.checkDays(message.channel.guild.createdAt)})`,
      true
    )
    .setThumbnail(message.guild.iconURL({ format: "png", dynamic: true }))
    .setTimestamp()
    .setFooter("Created by Syfe", client.user.avatarURL());

  message.channel.send(embedCreated);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["server", "whoserver"],
  permLevel: "User",
};

exports.help = {
  name: "serverinfo",
  category: "Miscelaneous",
  description: "Display's info about the server.",
  usage: "serverinfo",
};
