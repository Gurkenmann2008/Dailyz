"use client";

import { useEffect, useState } from "react";
import { GameStatus, TileStatus, WIN_MESSAGES } from "@/lib/game";

const STATUS_EMOJI: Record<TileStatus, string> = {
  correct: "🟩",
  present: "🟨",
  absent: "⬛",
  empty: "⬜",
  tbd: "⬜",
};

interface GameModalProps {
  gameStatus: GameStatus;
  solution: string;
  dayNumber: number;
  guesses: string[];
  evaluations: TileStatus[][];
  onClose: () => void;
}

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState("");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(now.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      const diff = tomorrow.getTime() - now.getTime();
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return timeLeft;
}

export function GameModal({ gameStatus, solution, dayNumber, guesses, evaluations, onClose }: GameModalProps) {
  const timeLeft = useCountdown();
  const [copied, setCopied] = useState(false);

  const emojiGrid = evaluations
    .map((row) => row.map((s) => STATUS_EMOJI[s]).join(""))
    .join("\n");

  const shareText = `Wörtle #${dayNumber} ${gameStatus === "won" ? guesses.length : "X"}/6\n\n${emojiGrid}`;

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {gameStatus === "won" ? (
          <>
            <div className="text-5xl mb-2">🎉</div>
            <h2 className="text-2xl font-black mb-1">
              {WIN_MESSAGES[Math.min(guesses.length - 1, 5)]}
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              In {guesses.length} von 6 Versuchen
            </p>
          </>
        ) : (
          <>
            <div className="text-5xl mb-2">😔</div>
            <h2 className="text-2xl font-black mb-1">Nicht geschafft</h2>
          </>
        )}

        <div className="bg-gray-50 rounded-xl py-3 px-4 mb-5">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Das Wort war</p>
          <p className="text-3xl font-black tracking-widest">{solution}</p>
        </div>

        <div className="mb-5">
          <p className="text-xs text-gray-400 mb-2">Nächstes Wort in</p>
          <p className="text-2xl font-mono font-bold">{timeLeft}</p>
        </div>

        <button
          onClick={handleShare}
          className="w-full py-3 rounded-xl font-black text-white text-base"
          style={{ background: "#6aaa64" }}
        >
          {copied ? "Kopiert! ✓" : "Teilen 🔗"}
        </button>
      </div>
    </div>
  );
}
