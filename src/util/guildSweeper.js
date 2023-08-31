const CronJob = require("cron").CronJob;
const guildModel = require("./Models/guildModel");

module.exports = () => {
  const check = async () => {
    (await guildModel.find()).forEach((guildDb) => {
      if (guildDb.botLeft !== null) {
        const left = new Date(guildDb.botLeft);
        const today = new Date();

        if (Math.floor(Math.abs(left - today) / (1000 * 60 * 60 * 24)) >= 30) {
          guildModel.deleteOne({ guildID: guildDb.guildID });
        }
      }
    });
  };

  new CronJob(
    "0 0 12 * * *",
    async () => {
      await this.runSchedule();

      await check();
    },
    null,
    true,
    "Europe/Berlin"
  );
};
