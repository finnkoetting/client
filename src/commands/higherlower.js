const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  requireGuild: true,
  data: new SlashCommandBuilder()
    .setName("higherlower")
    .setDescription("Starts the higher or lower game")
    .setDMPermission(false)
    .setDescriptionLocalizations({
      de: "Starte das Higher or Lower spiel",
      "es-ES": "Iniciar el juego Higher or Lower",
      fr: "Démarrer le jeu Higher or Lower",
    }),

  /**
   * @param {CommandInteraction} interaction
   * @param {WouldYou} client
   * @param {guildModel} guildDb
   */

  async execute(interaction, client, guildDb) {
    const initembed = new EmbedBuilder()
      .setColor("#0598F6")
      .setTitle("Initializing")
      .setDescription("Please wait a moment. I am creating a game...")
      .setFooter({
        text: `Requested by ${interaction.user.username} | Type: NULL | ID: NULL`,
        iconURL: interaction.user.avatarURL(),
      });

    interaction.reply({ embeds: [initembed] }).then((async) => {
      const gameDataRaw = fs.readFileSync(
        path.join(__dirname, "..", "data", "hl-en_EN.json")
      );
      const gamedata = JSON.parse(gamaDateRaw).data;

      const random = Math.floor(Math.random() * gameData.length);
      let comperator = Math.floor(Math.random() * gameData.length);

      const regenerateComperator = () => {
        comperator = Math.floor(Math.random() * gameData.length);
        if (comperator == random) regenerateComperator();
      };
      if (comperator == random) regenerateComperator();

      const game = {
        creator: interaction.user.id,
        created: new Date(),
        id: dbGuild.games.length + 1,
        items: {
          current: gameData[random],
          history: [gameData[comperator]],
        },
        score: 0,
      };

      guildDb.hl.push(game);
    });
  },
};
