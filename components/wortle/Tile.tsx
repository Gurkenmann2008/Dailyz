"use client";

import { useEffect, useRef, useState } from "react";
import { TileStatus } from "@/lib/game";

interface TileProps {
  letter: string;
  status: TileStatus;
  position: number;
  isRevealing: boolean;
  isBouncing: boolean;
}

export function Tile({ letter, status, position, isRevealing, isBouncing }: TileProps) {
  const prevLetter = useRef(letter);
  const [popping, setPopping] = useState(false);

  useEffect(() => {
    if (letter && letter !== prevLetter.current) {
      setPopping(true);
      const t = setTimeout(() => setPopping(false), 150);
      prevLetter.current = letter;
      return () => clearTimeout(t);
    }
    prevLetter.current = letter;
  }, [letter]);

  const isColored = status === "correct" || status === "present" || status === "absent";
  const flipDelay = `${position * 0.15}s`;
  const bounceDelay = `${position * 0.1 + 0.5}s`;

  return (
    <div
      className={[
        "tile-wrapper",
        popping && !isColored ? "pop" : "",
        isRevealing && isColored ? "flip" : "",
        isBouncing && isColored ? "tile-bounce" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        {
          "--flip-delay": flipDelay,
          "--bounce-delay": bounceDelay,
        } as React.CSSProperties
      }
    >
      <div className={`tile-face tile-front${letter ? " has-letter" : ""}`}>
        {letter}
      </div>
      <div className={`tile-face tile-back ${isColored ? status : ""}`}>
        {letter}
      </div>
    </div>
  );
}
