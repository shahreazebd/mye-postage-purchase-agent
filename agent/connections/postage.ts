import { defineMcpClientConnection } from "eve/connections";

export default defineMcpClientConnection({
  url: "http://localhost:9099/mcp",
  description:
    "Mye postage service: calculate rates, purchase postage, and manage shipping labels.",
  headers: {
    "x-company-id": "95002bb0-d182-4b1e-aa80-94080d4befc6",
  },
});
