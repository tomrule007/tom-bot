# tom-bot

simple demo chat bot for slack

## Development - Getting Started

1. clone repo

```bash
git clone https://github.com/tomrule007/tom-bot.git
cd tom-bot
```

2. create `.env` file \* Get tokens/secret from https://api.slack.com/apps (selecting your app)

```bash
SLACK_BOT_TOKEN="xoxb-****" ## 'OAuth & Permissions'
SLACK_SIGNING_SECRET= "****" ## 'Basic Information'
PORT=8080
```

3. Create tunnel to dev server (two possible options)

   - Vortex (www.vortexhub.io/)
   - Ngrok (www.ngrok.com)

4. Install dependencies

```bash
yarn install
```

5. start it up :)

```bash
vortex --save ## save allows you to use pin instead of email/password
yarn start
```

---

## ROADMAP

- [x] first working slackbot commit: bot responds to bot mentions from users
- [ ] create a /command with data persist
- [x] Add Instructions to readme: dev api endpoint, environment variables & were to get them
- [x] Move to Docker
