"use client";

import { useState } from "react";
import { PlatformHeader } from "@/components/layout/PlatformHeader";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const FREE_FEATURES = [
  { label: "Wörtle täglich", included: true },
  { label: "1 weiteres Spiel täglich", included: true },
  { label: "Alle 5 Spiele täglich", included: false },
  { label: "Archiv (vergangene Rätsel)", included: false },
  { label: "Statistiken & Serien", included: false },
  { label: "Werbefrei", included: false },
  { label: "Früher Zugang zu neuen Spielen", included: false },
];

const PREMIUM_FEATURES = [
  { label: "Wörtle täglich", included: true },
  { label: "1 weiteres Spiel täglich", included: true },
  { label: "Alle 5 Spiele täglich", included: true },
  { label: "Archiv (vergangene Rätsel)", included: true },
  { label: "Statistiken & Serien", included: true },
  { label: "Werbefrei", included: true },
  { label: "Früher Zugang zu neuen Spielen", included: true },
];

export default function PreisePage() {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    const res = await fetch("/api/stripe/checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else {
      if (data.error === "Nicht angemeldet") window.location.href = "/anmelden";
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <PlatformHeader />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black mb-3">Wähle deinen Plan</h1>
          <p className="text-[var(--muted)]">Täglich neue Rätsel — kostenlos oder premium</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Free */}
          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-8">
            <div className="mb-6">
              <h2 className="text-xl font-black mb-1">Kostenlos</h2>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-black">0€</span>
                <span className="text-[var(--muted)] pb-1">/Monat</span>
              </div>
            </div>
            <ul className="space-y-3 mb-8">
              {FREE_FEATURES.map((f) => (
                <li key={f.label} className="flex items-center gap-3 text-sm">
                  {f.included
                    ? <Check size={16} className="text-[#6aaa64] shrink-0" />
                    : <X size={16} className="text-[var(--muted)] shrink-0" />
                  }
                  <span className={cn(!f.included && "text-[var(--muted)]")}>{f.label}</span>
                </li>
              ))}
            </ul>
            <a
              href="/"
              className="block text-center py-3 rounded-xl border border-[var(--card-border)] font-bold text-sm hover:bg-[var(--background)] transition-colors"
            >
              Kostenlos starten
            </a>
          </div>

          {/* Premium */}
          <div className="relative rounded-2xl border-2 border-[#FFCE00] bg-[var(--card)] p-8">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#FFCE00] text-black text-xs font-black uppercase tracking-wider">
              Empfohlen
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-black mb-1">Premium</h2>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-black">1,99€</span>
                <span className="text-[var(--muted)] pb-1">/Monat</span>
              </div>
              <p className="text-xs text-[var(--muted)] mt-1">Jederzeit kündbar</p>
            </div>
            <ul className="space-y-3 mb-8">
              {PREMIUM_FEATURES.map((f) => (
                <li key={f.label} className="flex items-center gap-3 text-sm">
                  <Check size={16} className="text-[#6aaa64] shrink-0" />
                  <span>{f.label}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#FFCE00] text-black font-black text-sm hover:bg-[#f0c000] transition-colors disabled:opacity-60"
            >
              {loading ? "Weiterleitung..." : "Premium werden →"}
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-[var(--muted)] mt-10">
          Sichere Zahlung über Stripe · SSL-verschlüsselt · Keine versteckten Kosten
        </p>
      </main>
    </div>
  );
}
