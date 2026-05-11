"use client";

import { useCallback, useEffect, useState } from "react";
import { evaluateGuess, computeLetterStates, GameStatus, LetterState, TileStatus } from "@/lib/game";
import { getDailyWord, getDayNumber, isValidWord } from "@/lib/words";
import { markGamePlayed } from "@/lib/streak";

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

interface SavedState {
  dayNumber: number;
  guesses: string[];
  gameStatus: GameStatus;
}

export interface WortleState {
  solution: string;
  dayNumber: number;
  guesses: string[];
  currentGuess: string;
  evaluations: TileStatus[][];
  letterStates: Record<string, LetterState>;
  gameStatus: GameStatus;
  shakingRow: number | null;
  revealingRow: number | null;
  bouncingRow: number | null;
  toast: string | null;
  showModal: boolean;
}

export function useWortle() {
  const solution = getDailyWord();
  const dayNumber = getDayNumber();

  const loadSaved = (): Pick<WortleState, "guesses" | "gameStatus"> => {
    try {
      const raw = localStorage.getItem("wortle-state");
      if (!raw) return { guesses: [], gameStatus: "playing" };
      const saved: SavedState = JSON.parse(raw);
      if (saved.dayNumber !== dayNumber) return { guesses: [], gameStatus: "playing" };
      return { guesses: saved.guesses, gameStatus: saved.gameStatus };
    } catch {
      return { guesses: [], gameStatus: "playing" };
    }
  };

  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");
  const [shakingRow, setShakingRow] = useState<number | null>(null);
  const [revealingRow, setRevealingRow] = useState<number | null>(null);
  const [bouncingRow, setBouncingRow] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = loadSaved();
    setGuesses(saved.guesses);
    setGameStatus(saved.gameStatus);
    setHydrated(true);
    if (saved.gameStatus !== "playing") {
      setTimeout(() => setShowModal(true), 800);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const evaluations: TileStatus[][] = guesses.map((g) => evaluateGuess(g, solution));
  const letterStates = computeLetterStates(guesses, evaluations);

  const showToast = useCallback((msg: string, duration = 1800) => {
    setToast(msg);
    setTimeout(() => setToast(null), duration);
  }, []);

  const shakeRow = useCallback((row: number) => {
    setShakingRow(row);
    setTimeout(() => setShakingRow(null), 600);
  }, []);

  const save = useCallback((newGuesses: string[], status: GameStatus) => {
    try {
      localStorage.setItem(
        "wortle-state",
        JSON.stringify({ dayNumber, guesses: newGuesses, gameStatus: status })
      );
    } catch {}
  }, [dayNumber]);

  const handleKey = useCallback(
    (key: string) => {
      if (gameStatus !== "playing") return;

      const upper = key.toUpperCase();

      if (upper === "BACKSPACE" || upper === "⌫") {
        setCurrentGuess((g) => g.slice(0, -1));
        return;
      }

      if (upper === "ENTER") {
        const guess = currentGuess.toUpperCase();
        if (guess.length < WORD_LENGTH) {
          showToast("Zu wenig Buchstaben!");
          shakeRow(guesses.length);
          return;
        }
        if (!isValidWord(guess)) {
          showToast("Nicht im Wörterbuch!");
          shakeRow(guesses.length);
          return;
        }

        const newGuesses = [...guesses, guess];
        const won = guess === solution;
        const lost = !won && newGuesses.length >= MAX_GUESSES;
        const newStatus: GameStatus = won ? "won" : lost ? "lost" : "playing";

        setGuesses(newGuesses);
        setCurrentGuess("");
        save(newGuesses, newStatus);

        const rowIdx = newGuesses.length - 1;
        setRevealingRow(rowIdx);
        const revealDuration = WORD_LENGTH * 150 + 500;
        setTimeout(() => {
          setRevealingRow(null);
          setGameStatus(newStatus);
          if (won) {
            setBouncingRow(rowIdx);
            setTimeout(() => setBouncingRow(null), 1200);
          }
          if (newStatus !== "playing") {
            markGamePlayed("wortle");
            setTimeout(() => setShowModal(true), 1000);
          }
        }, revealDuration);
        return;
      }

      if (/^[A-ZÄÖÜ]$/.test(upper) && currentGuess.length < WORD_LENGTH) {
        setCurrentGuess((g) => g + upper);
      }
    },
    [gameStatus, currentGuess, guesses, solution, showToast, shakeRow, save]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) return;
      handleKey(e.key);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleKey]);

  return {
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
  };
}
