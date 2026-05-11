"use client";

import { PlatformHeader } from "@/components/layout/PlatformHeader";
import { Board } from "@/components/wortle/Board";
import { Keyboard } from "@/components/wortle/Keyboard";
import { GameModal } from "@/components/wortle/GameModal";
import { useWortle } from "@/hooks/useWortle";

export default function WortlePage() {
  const {
    hydrated,
    solution,
    dayNumber,
    guesses,
    currentGuess,
    evaluations,
    letterStates,
    gameStatus,
    shakingRow,
    revealingRow,
    bouncingRow,
    toast,
    showModal,
    setShowModal,
    handleKey,
  } = useWortle();

  if (!hydrated) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <PlatformHeader />

      {toast && (
        <div
          className="toast"
          style={{
            position: "fixed",
            top: 70,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 100,
          }}
        >
          {toast}
        </div>
      )}

      <main className="flex flex-col flex-1 items-center justify-between py-4 gap-2">
        <div className="text-center mb-2">
          <h2 className="text-2xl font-black">WÖRTLE</h2>
          <p className="text-xs text-[var(--muted)]">#{dayNumber} · Errate das Wort</p>
        </div>
        <Board
          guesses={guesses}
          currentGuess={currentGuess}
          evaluations={evaluations}
          shakingRow={shakingRow}
          revealingRow={revealingRow}
          bouncingRow={bouncingRow}
        />
        <Keyboard letterStates={letterStates} onKey={handleKey} />
      </main>

      {showModal && (
        <GameModal
          gameStatus={gameStatus}
          solution={solution}
          dayNumber={dayNumber}
          guesses={guesses}
          evaluations={evaluations}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
