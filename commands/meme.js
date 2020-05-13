const randomPuppy = require("random-puppy");
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let reddit = ["memes", "wholesomememes", "dankmemes"];

  let subreddit = reddit[Math.floor(Math.random() * reddit.length)];

  randomPuppy(subreddit)
    .then(async (meme) => {
      const embedCreated = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setAuthor(
          "Draper",
          client.user.avatarURL(),
          "https://github.com/ItsSyfe/Draper"
        )
        .setDescription(`Random meme from r/${subreddit}`)
        .setImage(meme)
        .setTimestamp()
        .setFooter("Created by Syfe", client.user.avatarURL());

      message.channel.send(embedCreated);
    })
    .catch((err) => console.error(err));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["memes", "haha"],
  permLevel: "User",
};

exports.help = {
  name: "meme",
  category: "Miscelaneous",
  description: "Gives a random meme from a few subreddits.",
  usage: "meme",
};
