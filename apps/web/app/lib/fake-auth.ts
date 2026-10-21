/**
 * Fake auth helpers — simulates a normal auth flow with hardcoded company accounts.
 * Replace this with your real auth provider (Clerk, Auth.js, etc.) when ready.
 */

export interface Company {
  id: string;
  name: string;
  slug: string;
  avatar: string; // emoji placeholder
}

/** Hardcoded company accounts that simulate a real user directory. */
export const COMPANIES: Company[] = [
  {
    id: "95002bb0-d182-4b1e-aa80-94080d4befc6",
    name: "Acme Logistics",
    slug: "acme",
    avatar: "🏭",
  },
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    name: "Swift Shipping Co.",
    slug: "swift",
    avatar: "🚚",
  },
  {
    id: "deadbeef-cafe-babe-f00d-0123456789ab",
    name: "Global Parcels Ltd.",
    slug: "global",
    avatar: "🌍",
  },
];

const STORAGE_KEY = "mye-postage:session";

export interface FakeSession {
  company: Company;
  loggedInAt: string;
}

export function getSession(): FakeSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as FakeSession) : null;
  } catch {
    return null;
  }
}

export function login(company: Company): void {
  const session: FakeSession = { company, loggedInAt: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function logout(): void {
  localStorage.removeItem(STORAGE_KEY);
}
