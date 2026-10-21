import { defineMcpClientConnection } from "eve/connections";
import { companyId } from "../lib/session";

export default defineMcpClientConnection({
  url: "http://localhost:9099/mcp",
  description:
    "Mye postage service: calculate rates, purchase postage, and manage shipping labels.",

  // Resolved at runtime inside the active turn — reads the durable per-session
  // state slot instead of the old hardcoded UUID.
  headers: {
    "x-company-id": () => companyId.get(),
  },
});
