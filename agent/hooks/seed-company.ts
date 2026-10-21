import { defineHook } from "eve/hooks";
import { companyId } from "../lib/session";

/**
 * On session start, seed the `companyId` state from the authenticated
 * principal set by the custom `companyHeader()` AuthFn in eve.ts.
 *
 * ctx.session.auth.current.principalId == the x-company-id header value
 * the frontend forwarded from its fake-auth localStorage session.
 *
 * Falls back to the env var for local `eve dev` sessions without a browser.
 */
export default defineHook({
  events: {
    "session.started": (_event, ctx) => {
      const id =
        ctx.session.auth.current?.principalId ??
        process.env.POSTAGE_COMPANY_ID ??
        "";

      companyId.update(() => id);
    },
  },
});
