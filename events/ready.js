module.exports = async (client) => {
  client.logger.log(
    `
  -------------------
  Draper
  Advance Discord bot created by Syfe
  Syfe#6969
  -------------------`,
    "ready"
  );

  client.user.setActivity(`${client.settings.get("default").prefix}help`, {
    type: "PLAYING",
  });
};
