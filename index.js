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
        text: `What is up?  <@${event.user}>`, // This line does not work with the included blocks property
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `<@${event.user}> What is the newest way of handling asynchronous code in javascript?`,
            },
            accessory: {
              type: 'radio_buttons',
              options: [
                {
                  text: {
                    type: 'plain_text',
                    text: 'Promise',
                    emoji: true,
                  },
                  value: 'value-0',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: 'Async/Await',
                    emoji: true,
                  },
                  value: 'value-1',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: 'callback',
                    emoji: true,
                  },
                  value: 'value-2',
                },
              ],
              action_id: 'radio_buttons-action',
            },
          },
        ],
      });

      
      bot.action('radio_buttons-action', async (params) => {
        const { action, ack, say, respond, body } = params;
        console.log('ACTION TRIGGERED', action);
        await ack();
        if (action.selected_option.value === 'value-1') {
          await respond(
            `${action.selected_option.text.text} is Correct! \n<@${body.user.username}> Wins this Round!`
          );
        } else {
          await say(`<@${body.user.username}> That was Wrong Try Again!`);
        }
      });
    } catch (e) {
      console.log(`error responding ${e}`);
    }
  });
})();
