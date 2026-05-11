"use client";

import { useEffect, useState } from "react";
import { GameStatus, TileStatus, WIN_MESSAGES } from "@/lib/game";
import { Share2, Check, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const STATUS_EMOJI: Record<TileStatus, string> = {
  correct: "🟩", present: "🟨", absent: "⬛", empty: "⬜", tbd: "⬜",
};

interface GameModalProps {
  gameStatus: GameStatus;
  solution: string;
  dayNumber: number;
  guesses: string[];
  evaluations: TileStatus[][];
  onClose: () => void;
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState("");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`);
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  return <span className="font-mono font-bold text-[#FFCE00]">{timeLeft}</span>;
}

export function GameModal({ gameStatus, solution, dayNumber, guesses, evaluations, onClose }: GameModalProps) {
  const [copied, setCopied] = useState(false);

  const emojiGrid = evaluations.map((row) => row.map((s) => STATUS_EMOJI[s]).join("")).join("\n");
  const shareText = `Wörtle #${dayNumber} ${gameStatus === "won" ? guesses.length : "X"}/6\n\n${emojiGrid}\n\nspiels du auch! → dailyz.de`;

  async function handleShare() {
    if (navigator.share) {
      try { await navigator.share({ text: shareText }); return; } catch {}
    }
    await navigator.clipboard.writeText(shareText).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div>
            {gameStatus === "won"
              ? <><div className="text-4xl mb-1">🎉</div><h2 className="text-xl font-black">{WIN_MESSAGES[Math.min(guesses.length - 1, 5)]}</h2></>
              : <><div className="text-4xl mb-1">😔</div><h2 className="text-xl font-black">Nicht geschafft</h2></>
            }
          </div>
          <button onClick={onClose} className="p-1 hover:bg-[var(--card)] rounded-lg transition-colors"><X size={18} /></button>
        </div>

        <div className="rounded-xl bg-[var(--card)] border border-[var(--card-border)] px-4 py-3 mb-4 text-center">
          <p className="text-xs text-[var(--muted)] uppercase tracking-widest mb-0.5">Das Wort</p>
          <p className="text-3xl font-black tracking-widest">{solution}</p>
          {gameStatus === "won" && <p className="text-xs text-[var(--muted)] mt-1">In {guesses.length}/6 Versuchen</p>}
        </div>

        <div className="font-mono text-base leading-snug whitespace-pre bg-[var(--card)] rounded-xl p-3 mb-4 text-center">
          {emojiGrid.split("\n").map((line, i) => <div key={i}>{line}</div>)}
        </div>

        <div className="rounded-xl border border-[var(--card-border)] p-3 mb-4 text-center text-sm">
          <p className="text-xs text-[var(--muted)] mb-1">Neues Rätsel in</p>
          <Countdown />
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={handleShare}
            className={cn("flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-colors", copied ? "bg-[#6aaa64] text-white" : "bg-[var(--foreground)] text-[var(--background)] hover:opacity-90")}
          >
            {copied ? <Check size={16} /> : <Share2 size={16} />}
            {copied ? "Kopiert!" : "Ergebnis teilen"}
          </button>
          <Link href="/zahlenraetsel" onClick={onClose}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[var(--card-border)] text-sm font-medium hover:bg-[var(--card)] transition-colors">
            🔢 Jetzt Zahlenrätsel spielen →
          </Link>
        </div>
      </div>
    </div>
  );
}
