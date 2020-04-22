module.exports = async (client) => {
  client.logger.log(
    `
  -------------------
  Draper Canary
  Advance Discord bot created by Syfe
  Syfe#6969
  -------------------`,
    "ready"
  );
  try {
    await client.user.setActivity(
      `${client.settings.get("default").prefix}help`,
      {
        type: "LISTENING",
      }
    );
    await client.user.setStatus("dnd");
  } catch (e) {
    client.user.setActivity(`${client.guilds.cache.size} servers.`, {
      type: "WATCHING",
    });
    await client.user.setStatus("dnd");
  }
};
