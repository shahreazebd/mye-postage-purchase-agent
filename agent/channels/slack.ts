import { defaultSlackAuth, slackChannel } from "eve/channels/slack";

export default slackChannel({
  credentials: {
    botToken: process.env.SLACK_BOT_TOKEN!,
    signingSecret: process.env.SLACK_SIGNING_SECRET!,
  },
  async onAppMention(ctx, message) {
    console.log("[eve:slack] onAppMention received:", message.text);
    return { auth: defaultSlackAuth(message, ctx) };
  },
  async onDirectMessage(ctx, message) {
    console.log("[eve:slack] onDirectMessage received:", message.text);
    return { auth: defaultSlackAuth(message, ctx) };
  },
  async onMessage(ctx, message) {
    console.log("[eve:slack] onMessage received:", message.text);
    if (message.author?.isBot) return null;
    return { auth: defaultSlackAuth(message, ctx) };
  },
  async onEvent(ctx, event) {
    console.log("[eve:slack] onEvent received:", (event as { type?: string }).type);
  },
});
