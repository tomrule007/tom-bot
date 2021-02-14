require('dotenv').config();
const { App } = require('@slack/bolt');

const { PORT = 3000, SLACK_SIGNING_SECRET, SLACK_BOT_TOKEN } = process.env;

const bot = new App({
  signingSecret: SLACK_SIGNING_SECRET,
  token: SLACK_BOT_TOKEN,
  endpoints: ['/slack/events', '/slack/commands', '/slack/actions'],
});

//TODO: Update to node v14.8 to allow top level await and not need IIFE
(async () => {
  await bot.start(PORT);
  console.log('BOLT APP IS RUNNING, port:', PORT);

  bot.event('app_mention', async ({ context, event }) => {
    try {
      console.log('app_mention, from', event);
      await bot.client.chat.postMessage({
        token: context.botToken,
        channel: event.channel,
        text: `What is up?  <@${event.user}>`,
      });
    } catch (e) {
      console.log(`error responding ${e}`);
    }
  });
})();
