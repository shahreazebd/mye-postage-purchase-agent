import { defaultSlackAuth, slackChannel } from "eve/channels/slack";

export default slackChannel({
  async onMessage(ctx, message) {
    if (message.author?.isBot !== false) return null;
    const auth = defaultSlackAuth(message, ctx);
    const isDirectMessage = message.raw.channel_type === "im";

    if (ctx.isBotMentioned() || ctx.slack.codeChannel || isDirectMessage) {
      return { auth };
    }

    // Follow threads that already have a session, including message edits
    if (ctx.edit || (message.threadTs !== message.ts && (await ctx.isSubscribed()))) {
      return {
        auth,
        status: "deferred",
        guidance:
          "You are part of this Slack thread, so you see replies people send each other. This " +
          "reply doesn't mention you. Answer only if it's meant for you; otherwise call `no_reply`.",
      };
    }

    return null;
  },
});
