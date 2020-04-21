exports.run = async (client, message, [action, key, ...value], level) => {
  // eslint-disable-line no-unused-vars

  // Retrieve current guild settings (merged) and overrides only.
  const settings = message.settings;
  const defaults = client.settings.get("default");
  const overrides = client.settings.get(message.guild.id);
  if (!client.settings.has(message.guild.id))
    client.settings.set(message.guild.id, {});

  // Edit an existing key value
  if (action === "edit") {
    // User must specify a key.
    if (!key)
      return client.embedCreator(
        message.channel,
        "Please specify a key to edit"
      );
    // User must specify a key that actually exists!
    if (!defaults[key])
      return client.embedCreator(
        message.channel,
        "This key does not exist in the settings"
      );
    const joinedValue = value.join(" ");
    // User must specify a value to change.
    if (joinedValue.length < 1)
      return client.embedCreator(message.channel, "Please specify a new value");
    // User must specify a different value than the current one.
    if (joinedValue === settings[key])
      return client.embedCreator(
        message.channel,
        "This setting already has that value!"
      );

    // If the guild does not have any overrides, initialize it.
    if (!client.settings.has(message.guild.id))
      client.settings.set(message.guild.id, {});

    // Modify the guild overrides directly.
    client.settings.set(message.guild.id, joinedValue, key);

    // Confirm everything is fine!
    client.embedCreator(
      message.channel,
      `${key} successfully edited to ${joinedValue}`
    );
  }

  // Resets a key to the default value
  else if (action === "del" || action === "reset") {
    if (!key)
      return client.embedCreator(
        message.channel,
        "Please specify a key to reset."
      );
    if (!defaults[key])
      return client.embedCreator(
        message.channel,
        "This key does not exist in the settings"
      );
    if (!overrides[key])
      return client.embedCreator(
        message.channel,
        "This key does not have an override and is already using defaults."
      );

    // Good demonstration of the custom awaitReply method in `./modules/functions.js` !
    const response = await client.awaitReply(
      message,
      `Are you sure you want to reset ${key} to the default value?`
    );

    // If they respond with y or yes, continue.
    if (["y", "yes"].includes(response.toLowerCase())) {
      // We delete the `key` here.
      client.settings.delete(message.guild.id, key);
      client.embedCreator(
        message.channel,
        `${key} was successfully reset to default.`
      );
    }
    // If they respond with n or no, we inform them that the action has been cancelled.
    else if (["n", "no", "cancel"].includes(response)) {
      client.embedCreator(
        message.channel,
        `Your setting for \`${key}\` remains at \`${settings[key]}\``
      );
    }
  } else if (action === "get") {
    if (!key)
      return client.embedCreator(
        message.channel,
        "Please specify a key to view"
      );
    if (!defaults[key])
      return client.embedCreator(
        message.channel,
        "This key does not exist in the settings"
      );
    const isDefault = !overrides[key]
      ? "\nThis is the default global default value."
      : "";
    client.embedCreator(
      message.channel,
      `The value of ${key} is currently ${settings[key]}${isDefault}`
    );
  } else {
    // Otherwise, the default action is to return the whole configuration;
    const array = [];
    Object.entries(settings).forEach(([key, value]) => {
      array.push(`${key}${" ".repeat(20 - key.length)}::  ${value}`);
    });
    await message.channel.send(
      `= Current Guild Settings =\n${array.join("\n")}`,
      { code: "asciidoc" }
    );
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["setting", "settings", "conf"],
  permLevel: "Administrator",
};

exports.help = {
  name: "set",
  category: "System",
  description: "View or change settings for your server.",
  usage: "set <view/get/edit> <key> <value>",
};
