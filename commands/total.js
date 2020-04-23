const fetch = require("node-fetch");

exports.run = async (client, message, args) => {
  const confirmed = client.emojis.cache.find(
    (emoji) => emoji.name === "briefcase"
  );
  const recovered = client.emojis.cache.find((emoji) => emoji.name === "heart");
  const deaths = client.emojis.cache.find((emoji) => emoji.name === "skull");
  fetch(`https://api.covid19api.com/world/total`)
    .then((res) => res.json())
    .then((json) => {
      client.embedCreator(
        message.channel,
        `**COVID-19**\n\n<:briefcase:702877513474637894> Total Cases: \n${json.TotalConfirmed}\n\n<:heart:702877875572965428> Recovered: \n${json.TotalRecovered}\n\n<:skull:702877875572965428> Deaths:\n${json.TotalDeaths}`,
        "https://lh3.googleusercontent.com/proxy/veA3DbXgykDohcQ0vg5x8SCKl-ddPO7Fo4JViLO8u-T6Zos_vWEt86Vt0WrN-FMQKJY6zmpnAnoJxVPwDZ_YFtu-gONastfrHJA9vEmLg-14"
      );
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["corona", "virus", "cases"],
  permLevel: "User",
};

exports.help = {
  name: "total",
  category: "Corona Virus",
  description: "Total stats for Corona Virus.",
  usage: "total",
};
