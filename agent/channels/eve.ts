import type { AuthFn } from "eve/channels/auth";
import { localDev, placeholderAuth, vercelOidc } from "eve/channels/auth";
import { eveChannel } from "eve/channels/eve";

/**
 * Fake-auth verifier — reads the `x-company-id` header forwarded by the
 * frontend (set from localStorage session) and maps it to a session principal.
 *
 * Replace this with a real JWT / OIDC verifier when you have a proper auth system.
 */
function companyHeader(): AuthFn<Request> {
  return (request) => {
    const companyId = request.headers.get("x-company-id");
    if (!companyId) return null; // skip; fall through to next entry

    return {
      authenticator: "company-header",
      principalId: companyId,
      principalType: "user",
      attributes: { companyId },
    };
  };
}

export default eveChannel({
  auth: [
    // 1. Company ID forwarded by the frontend (fake session simulation).
    companyHeader(),
    // 2. Lets the eve TUI and Vercel deployments reach the agent.
    vercelOidc(),
    // 3. Open on localhost for `eve dev`; ignored in production.
    localDev(),
    // 4. Fallback placeholder (remove when you have real auth).
    placeholderAuth(),
  ],
});

