"use client";

import { useRouter } from "next/navigation";
import { COMPANIES, login } from "@/app/lib/fake-auth";
import type { Company } from "@/app/lib/fake-auth";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (company: Company) => {
    login(company);
    router.push("/");
  };

  return (
    <main className="min-h-dvh bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="text-5xl mb-4">📦</div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Mye Postage
          </h1>
          <p className="text-sm text-muted-foreground">
            Select your company to continue
          </p>
        </div>

        {/* Company cards */}
        <div className="space-y-3">
          {COMPANIES.map((company) => (
            <button
              key={company.id}
              type="button"
              onClick={() => handleLogin(company)}
              className="w-full flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-4 text-left transition-colors hover:bg-accent hover:border-accent-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="text-3xl">{company.avatar}</span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-card-foreground truncate">
                  {company.name}
                </p>
                <p className="text-xs text-muted-foreground font-mono mt-0.5 truncate">
                  {company.id}
                </p>
              </div>
              <span className="text-muted-foreground text-sm shrink-0">→</span>
            </button>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground">
          This is a simulated login — no password required.
        </p>
      </div>
    </main>
  );
}
