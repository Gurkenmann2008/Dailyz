"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Share2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareCardProps {
  title: string;
  status: "won" | "lost";
  emojiGrid: string;
  attempts: number;
  maxAttempts: number;
  solution?: string;
  nextGame?: string;
  nextGameHref?: string;
  onClose: () => void;
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState("");
  useEffect(() => {
    function update() {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();
      const h = Math.floor(diff / 3600000).toString().padStart(2, "0");
      const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, "0");
      const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, "0");
      setTimeLeft(`${h}:${m}:${s}`);
    }
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);
  return <span className="font-mono font-bold text-[#FFCE00]">{timeLeft}</span>;
}

export function ShareCard({ title, status, emojiGrid, attempts, maxAttempts, solution, nextGame, nextGameHref, onClose }: ShareCardProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `${title} ${status === "won" ? `${attempts}/${maxAttempts}` : "X/" + maxAttempts}\n\n${emojiGrid}\n\nspiels du auch! → dailyz.de`;

  async function share() {
    if (navigator.share) {
      try { await navigator.share({ text: shareText }); return; } catch {}
    }
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-card max-w-sm w-full text-left">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black">{status === "won" ? "🎉 Gewonnen!" : "😔 Verloren"}</h2>
          <button onClick={onClose} className="p-1 hover:bg-[var(--card)] rounded-lg transition-colors"><X size={18} /></button>
        </div>

        {solution && status === "lost" && (
          <p className="text-sm text-[var(--muted)] mb-3">Die Antwort war: <strong className="text-[var(--foreground)]">{solution}</strong></p>
        )}

        {/* Emoji grid preview */}
        <div className="bg-[var(--card)] rounded-xl p-4 mb-4 font-mono text-base leading-snug whitespace-pre">
          {emojiGrid.split("\n").map((line, i) => <div key={i}>{line || " "}</div>)}
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={share}
            className={cn("flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-colors", copied ? "bg-[#6aaa64] text-white" : "bg-[var(--foreground)] text-[var(--background)] hover:opacity-90")}
          >
            {copied ? <Check size={16} /> : <Share2 size={16} />}
            {copied ? "Kopiert!" : "Teilen"}
          </button>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] p-3 mb-4 text-center">
          <p className="text-xs text-[var(--muted)] mb-1">Neues Rätsel in</p>
          <Countdown />
        </div>

        {nextGame && nextGameHref && (
          <Link
            href={nextGameHref}
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[var(--card-border)] text-sm font-medium hover:bg-[var(--card)] transition-colors"
          >
            Jetzt {nextGame} spielen →
          </Link>
        )}
      </div>
    </div>
  );
}
