"use client";

import { useState } from "react";
import { PlatformHeader } from "@/components/layout/PlatformHeader";
import { Check, X, ChevronDown, ChevronUp, Shield, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

const FREE_FEATURES = [
  { label: "Wörtle täglich", ok: true },
  { label: "Zahlenrätsel täglich", ok: true },
  { label: "Quördle, Verbindungen, Buchstaben & mehr", ok: false },
  { label: "Archiv (30 Tage Rückblick)", ok: false },
  { label: "Detaillierte Statistiken & Serien", ok: false },
  { label: "Streak-Freeze (1× pro Monat)", ok: false },
  { label: "Werbefrei", ok: false },
];

const PREMIUM_FEATURES = [
  { label: "Wörtle täglich", ok: true },
  { label: "Zahlenrätsel täglich", ok: true },
  { label: "Alle 9+ Spiele täglich", ok: true },
  { label: "Archiv (30 Tage Rückblick)", ok: true },
  { label: "Detaillierte Statistiken & Serien", ok: true },
  { label: "Streak-Freeze (1× pro Monat)", ok: true },
  { label: "Werbefrei", ok: true },
];

const TESTIMONIALS = [
  { text: "Super süchtig! Ich spiele jeden Morgen mit dem Kaffee. Wörtle ist mein Liebling, aber die Verbindungen sind krank schwer 😂", name: "Lisa M.", city: "München", stars: 5 },
  { text: "Endlich ein deutsches Alternative zu NYT Games. Für 14,99€ im Jahr ist das absolut lächerlich günstig. Sehr empfehlenswert!", name: "Thomas B.", city: "Berlin", stars: 5 },
  { text: "Meine Kinder spielen es auch! Das Buchstaben-Rätsel machen wir abends als Familie. Bestes Investment des Jahres.", name: "Sabine H.", city: "Hamburg", stars: 5 },
];

const FAQS = [
  { q: "Kann ich jederzeit kündigen?", a: "Ja, du kannst im nächsten Monatsrhythmus kündigen — ganz ohne Haken. Nach der Kündigung hast du bis zum Ablauf des bezahlten Zeitraums vollen Premium-Zugang." },
  { q: "Gilt das Abo für mehrere Familienmitglieder?", a: "Aktuell ist das Abo personengebunden. Jedes Familienmitglied benötigt ein eigenes Konto. Familienabos sind in Planung!" },
  { q: "Wie funktioniert die 14-Tage-Geld-zurück-Garantie?", a: "Wenn dir Dailyz Premium nicht gefällt, schreib uns einfach innerhalb der ersten 14 Tage an support@dailyz.de. Wir erstatten den vollen Betrag, keine Fragen gestellt." },
  { q: "Welche Zahlungsmethoden werden akzeptiert?", a: "Alle gängigen Kredit- und Debitkarten (Visa, Mastercard), PayPal und Apple Pay — sicher verarbeitet über Stripe." },
  { q: "Was passiert mit meinen Statistiken wenn ich kündige?", a: "Deine Spielhistorie und Statistiken bleiben dauerhaft erhalten. Du verlierst nur den Zugang zu Premium-Spielen und dem Archiv." },
  { q: "Gibt es eine App?", a: "Dailyz läuft als Progressive Web App (PWA) — du kannst es auf iOS und Android wie eine normale App installieren. Öffne einfach dailyz.de im Browser und tippe auf 'Zum Homescreen hinzufügen'." },
  { q: "Was ist ein Streak-Freeze?", a: "Ein Streak-Freeze schützt deinen Streak für einen Tag, wenn du mal nicht spielen konntest. Premium-Nutzer bekommen 1 Freeze pro Monat automatisch gutgeschrieben." },
];

export default function PreisePage() {
  const [loading, setLoading] = useState<"monthly" | "yearly" | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  async function handleCheckout(billing: "monthly" | "yearly") {
    setLoading(billing);
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
      setLoading(null);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <PlatformHeader />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-16">

        {/* Hero */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-black mb-3">Alle Rätsel. Jeden Tag.</h1>
          <p className="text-[var(--muted)] text-lg mb-4">Über 1.000 Rätselfans spielen täglich auf Dailyz</p>
          <div className="flex justify-center items-center gap-1">
            {"⭐⭐⭐⭐⭐".split("").map((s, i) => <span key={i} className="text-2xl">{s}</span>)}
            <span className="text-sm text-[var(--muted)] ml-2">4,9 / 5 von Nutzern bewertet</span>
          </div>
        </div>

        {/* 3-card pricing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">

          {/* Free */}
          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-7 flex flex-col">
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-2">Kostenlos</p>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-black">0€</span>
                <span className="text-[var(--muted)] pb-1">/Monat</span>
              </div>
              <p className="text-xs text-[var(--muted)] mt-1">Für immer gratis</p>
            </div>
            <ul className="space-y-2.5 mb-7 flex-1">
              {FREE_FEATURES.map(f => (
                <li key={f.label} className={cn("flex items-start gap-2.5 text-sm", !f.ok && "text-[var(--muted)]")}>
                  {f.ok ? <Check size={15} className="text-[#6aaa64] shrink-0 mt-0.5" /> : <X size={15} className="shrink-0 mt-0.5" />}
                  {f.label}
                </li>
              ))}
            </ul>
            <a href="/" className="block text-center py-3 rounded-xl border border-[var(--card-border)] font-bold text-sm hover:bg-[var(--background)] transition-colors">
              Kostenlos starten
            </a>
          </div>

          {/* Premium Monthly */}
          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-7 flex flex-col">
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-2">Premium Monatlich</p>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-black">1,99€</span>
                <span className="text-[var(--muted)] pb-1">/Monat</span>
              </div>
              <p className="text-xs text-[var(--muted)] mt-1">Jederzeit kündbar</p>
            </div>
            <ul className="space-y-2.5 mb-7 flex-1">
              {PREMIUM_FEATURES.map(f => (
                <li key={f.label} className="flex items-start gap-2.5 text-sm">
                  <Check size={15} className="text-[#6aaa64] shrink-0 mt-0.5" />
                  {f.label}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleCheckout("monthly")}
              disabled={loading !== null}
              className="w-full py-3 rounded-xl bg-[var(--foreground)] text-[var(--background)] font-black text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {loading === "monthly" ? "Weiterleitung…" : "Monatlich starten →"}
            </button>
          </div>

          {/* Premium Yearly — MOST POPULAR */}
          <div className="relative rounded-2xl border-2 border-[#FFCE00] bg-[var(--card)] p-7 flex flex-col shadow-xl shadow-[#FFCE00]/10">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#FFCE00] text-black text-xs font-black uppercase tracking-wide whitespace-nowrap">
              ⭐ Beliebteste Wahl
            </div>
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-2">Premium Jährlich</p>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-black">14,99€</span>
                <span className="text-[var(--muted)] pb-1">/Jahr</span>
              </div>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                <span className="text-sm text-[var(--muted)] line-through">23,88€</span>
                <span className="text-xs font-black text-[#6aaa64]">Du sparst 9€ (37%)</span>
              </div>
              <p className="text-xs text-[#FFCE00] font-bold mt-1">≈ Nur 6 Cent pro Tag</p>
            </div>
            <ul className="space-y-2.5 mb-7 flex-1">
              {PREMIUM_FEATURES.map(f => (
                <li key={f.label} className="flex items-start gap-2.5 text-sm">
                  <Check size={15} className="text-[#6aaa64] shrink-0 mt-0.5" />
                  {f.label}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleCheckout("yearly")}
              disabled={loading !== null}
              className="w-full py-3 rounded-xl bg-[#FFCE00] text-black font-black text-sm hover:bg-[#f0c000] transition-colors disabled:opacity-60 mb-3"
            >
              {loading === "yearly" ? "Weiterleitung…" : "Jahresabo sichern →"}
            </button>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-4 text-xs text-[var(--muted)]">
              <div className="flex items-center gap-1"><Shield size={12} /><span>SSL-sicher</span></div>
              <div className="flex items-center gap-1"><RotateCcw size={12} /><span>14 Tage Geld zurück</span></div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-2xl font-black text-center mb-8">Was unsere Spieler sagen</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6">
                <div className="flex gap-0.5 mb-3">
                  {"⭐".repeat(t.stars).split("").map((s, i) => <span key={i}>{s}</span>)}
                </div>
                <p className="text-sm text-[var(--muted)] italic mb-4">"{t.text}"</p>
                <p className="text-sm font-bold">— {t.name}, {t.city}</p>
              </div>
            ))}
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
                  <div className="px-5 pb-4 text-sm text-[var(--muted)] border-t border-[var(--card-border)] pt-3 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 text-center rounded-2xl border border-[#FFCE00]/30 bg-[#FFCE00]/5 p-8">
            <p className="text-xl font-black mb-2">Bereit für alle Rätsel?</p>
            <p className="text-sm text-[var(--muted)] mb-5">Jahresabo für nur 14,99€ — das sind 6 Cent pro Tag.</p>
            <button
              onClick={() => handleCheckout("yearly")}
              className="px-8 py-3 rounded-xl bg-[#FFCE00] text-black font-black text-sm hover:bg-[#f0c000] transition-colors"
            >
              Jetzt Premium werden →
            </button>
            <p className="text-xs text-[var(--muted)] mt-3">14 Tage Geld-zurück-Garantie · Jederzeit kündbar</p>
          </div>
        </div>
      </main>
    </div>
  );
}
