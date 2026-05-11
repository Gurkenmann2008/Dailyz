"use client";

import { useState } from "react";
import { PlatformHeader } from "@/components/layout/PlatformHeader";
import { Check, X, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const FEATURES = [
  { label: "Wörtle täglich",              free: true,  premium: true },
  { label: "Zahlenrätsel täglich",        free: true,  premium: true },
  { label: "Stadt-Land-Fluss täglich",    free: true,  premium: true },
  { label: "Schätzling täglich",          free: true,  premium: true },
  { label: "Flagge täglich",              free: true,  premium: true },
  { label: "Quördle täglich",             free: false, premium: true },
  { label: "Verbindungen täglich",        free: false, premium: true },
  { label: "Mini-Kreuzwort täglich",      free: false, premium: true },
  { label: "Wort-Ketten täglich",         free: false, premium: true },
  { label: "Archiv (30 Tage Rückblick)",  free: false, premium: true },
  { label: "Streak & Statistiken",        free: "Basis", premium: "Vollständig" },
  { label: "Wöchentliches Leaderboard",   free: false, premium: true },
  { label: "Werbefrei",                   free: false, premium: true },
  { label: "Früher Zugang zu neuen Spielen", free: false, premium: true },
];

const FAQS = [
  { q: "Kann ich jederzeit kündigen?", a: "Ja, du kannst jederzeit im Monatsrhythmus kündigen. Nach der Kündigung hast du bis zum Ende des bezahlten Zeitraums Zugang." },
  { q: "Welche Zahlungsmethoden werden akzeptiert?", a: "Wir akzeptieren alle gängigen Kredit- und Debitkarten (Visa, Mastercard, Amex) sowie PayPal und Apple Pay über Stripe." },
  { q: "Was passiert mit meinen Statistiken wenn ich kündige?", a: "Deine Statistiken und Spielhistorie bleiben erhalten. Du verlierst nur den Zugang zu Premium-Spielen und dem Archiv." },
  { q: "Gibt es eine kostenlose Probezeit?", a: "Du kannst alle kostenfreien Spiele dauerhaft kostenlos spielen. Premium gibt es ohne Probezeit — aber für 1,99€/Monat ist es ein kleines Risiko." },
  { q: "Ist Dailyz auch auf dem Smartphone nutzbar?", a: "Ja! Dailyz ist vollständig für Mobile optimiert und funktioniert im Browser auf jedem Gerät. Eine App ist in Planung." },
];

export default function PreisePage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  async function handleCheckout() {
    setLoading(true);
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ billing }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      if (data.error === "Nicht angemeldet") window.location.href = "/anmelden?redirect=/preise";
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <PlatformHeader />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-16">

        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-3">Alle Rätsel. Jeden Tag.</h1>
          <p className="text-[var(--muted)] text-lg mb-2">Bereits von 1.000+ Rätselfans täglich gespielt</p>
          <div className="flex justify-center gap-1.5 text-2xl">{"⭐".repeat(5)}</div>
        </div>

        {/* Billing toggle */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-1 p-1 rounded-full bg-[var(--card)] border border-[var(--card-border)]">
            <button
              onClick={() => setBilling("monthly")}
              className={cn("px-5 py-2 rounded-full text-sm font-bold transition-colors", billing === "monthly" ? "bg-[var(--foreground)] text-[var(--background)]" : "text-[var(--muted)] hover:text-[var(--foreground)]")}
            >
              Monatlich
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={cn("px-5 py-2 rounded-full text-sm font-bold transition-colors flex items-center gap-2", billing === "yearly" ? "bg-[var(--foreground)] text-[var(--background)]" : "text-[var(--muted)] hover:text-[var(--foreground)]")}
            >
              Jährlich
              <span className="px-1.5 py-0.5 rounded-full bg-[#6aaa64] text-white text-[10px] font-black">−37%</span>
            </button>
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-16">
          {/* Free */}
          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-8 flex flex-col">
            <div className="mb-6">
              <h2 className="text-xl font-black mb-1">Kostenlos</h2>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-black">0€</span>
                <span className="text-[var(--muted)] pb-1">/Monat</span>
              </div>
              <p className="text-xs text-[var(--muted)]">Für immer kostenlos</p>
            </div>
            <ul className="space-y-2.5 mb-8 flex-1">
              {FEATURES.filter(f => f.free).map(f => (
                <li key={f.label} className="flex items-center gap-2.5 text-sm">
                  <Check size={15} className="text-[#6aaa64] shrink-0" />
                  <span>{f.label}{typeof f.free === "string" ? ` (${f.free})` : ""}</span>
                </li>
              ))}
              {FEATURES.filter(f => !f.free).map(f => (
                <li key={f.label} className="flex items-center gap-2.5 text-sm text-[var(--muted)]">
                  <X size={15} className="shrink-0" />
                  <span>{f.label}</span>
                </li>
              ))}
            </ul>
            <a href="/" className="block text-center py-3 rounded-xl border border-[var(--card-border)] font-bold text-sm hover:bg-[var(--background)] transition-colors">
              Kostenlos starten
            </a>
          </div>

          {/* Premium */}
          <div className="relative rounded-2xl border-2 border-[#FFCE00] bg-[var(--card)] p-8 flex flex-col">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#FFCE00] text-black text-xs font-black uppercase tracking-wider whitespace-nowrap">
              🏆 Empfohlen
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-black mb-1">Premium</h2>
              {billing === "monthly" ? (
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-4xl font-black">1,99€</span>
                  <span className="text-[var(--muted)] pb-1">/Monat</span>
                </div>
              ) : (
                <div className="mb-1">
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-black">14,99€</span>
                    <span className="text-[var(--muted)] pb-1">/Jahr</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-sm text-[var(--muted)] line-through">23,88€</span>
                    <span className="text-xs font-bold text-[#6aaa64]">Du sparst 8,89€!</span>
                  </div>
                </div>
              )}
              <p className="text-xs text-[var(--muted)]">Jederzeit kündbar</p>
            </div>
            <ul className="space-y-2.5 mb-8 flex-1">
              {FEATURES.map(f => (
                <li key={f.label} className="flex items-center gap-2.5 text-sm">
                  <Check size={15} className="text-[#6aaa64] shrink-0" />
                  <span>{f.label}{typeof f.premium === "string" ? ` (${f.premium})` : ""}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#FFCE00] text-black font-black text-sm hover:bg-[#f0c000] transition-colors disabled:opacity-60"
            >
              {loading ? "Weiterleitung..." : billing === "yearly" ? "Jetzt Jahresabo sichern →" : "Premium werden →"}
            </button>
            <p className="text-center text-xs text-[var(--muted)] mt-2">🔒 Sichere Zahlung via Stripe</p>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-black mb-6 text-center">Häufige Fragen</h2>
          <div className="flex flex-col gap-2">
            {FAQS.map((faq, i) => (
              <div key={i} className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left font-bold text-sm hover:bg-[var(--background)] transition-colors"
                >
                  {faq.q}
                  {openFaq === i ? <ChevronUp size={16} className="shrink-0" /> : <ChevronDown size={16} className="shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-[var(--muted)] border-t border-[var(--card-border)] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
