import { defineState } from "eve/context";

/**
 * Durable per-session slot that holds the company ID used as the
 * `x-company-id` header on every postage MCP call.
 *
 * Seed it from a `session.started` hook (or a tool call) by calling:
 *   companyId.update(() => "<id>");
 *
 * Fallback: the compile-time env var POSTAGE_COMPANY_ID (useful for
 * local dev / single-tenant deployments where the hardcoded ID was fine).
 */
export const companyId = defineState(
  "mye-postage.companyId",
  () => process.env.POSTAGE_COMPANY_ID ?? "",
);
