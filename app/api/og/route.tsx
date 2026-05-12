import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const GAME_COLORS: Record<string, string> = {
  wortle: "#6aaa64",
  zahlenraetsel: "#60a5fa",
  verbindungen: "#c084fc",
  buchstaben: "#f59e0b",
  quoerdle: "#818cf8",
  flagge: "#a3e635",
  stadtlandfuss: "#34d399",
  schaetzling: "#fb923c",
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const game = searchParams.get("game") ?? "wortle";
  const score = searchParams.get("score") ?? "?";
  const max = searchParams.get("max") ?? "6";
  const day = searchParams.get("day") ?? "1";
  const grid = searchParams.get("grid") ?? "";
  const color = GAME_COLORS[game] ?? "#FFCE00";

  const gameLabels: Record<string, string> = {
    wortle: "WÖRTLE",
    zahlenraetsel: "ZAHLENRÄTSEL",
    verbindungen: "VERBINDUNGEN",
    buchstaben: "BUCHSTABEN",
    quoerdle: "QUÖRDLE",
    flagge: "FLAGGE",
    stadtlandfuss: "STADT-LAND-FLUSS",
    schaetzling: "SCHÄTZLING",
  };

  const rows = grid ? grid.split("|") : [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#0f0f0f",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Top color bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "8px", background: color }} />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
          <div style={{ width: "20px", height: "20px", background: "#000", borderRadius: "4px" }} />
          <div style={{ width: "20px", height: "20px", background: "#DD0000", borderRadius: "4px" }} />
          <div style={{ width: "20px", height: "20px", background: "#FFCE00", borderRadius: "4px" }} />
          <span style={{ color: "#fff", fontSize: "28px", fontWeight: "900", marginLeft: "8px" }}>DAILYZ</span>
        </div>

        {/* Game name */}
        <div style={{ color: color, fontSize: "20px", fontWeight: "700", letterSpacing: "4px", marginBottom: "8px" }}>
          {gameLabels[game] ?? game.toUpperCase()}
        </div>

        {/* Score */}
        <div style={{ color: "#fff", fontSize: "72px", fontWeight: "900", marginBottom: "16px" }}>
          {score}/{max}
        </div>

        {/* Emoji grid */}
        {rows.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "24px" }}>
            {rows.map((row, i) => (
              <div key={i} style={{ display: "flex", gap: "4px", fontSize: "28px" }}>
                {row.split("").map((ch, j) => (
                  <span key={j}>{ch}</span>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Day */}
        <div style={{ color: "#888", fontSize: "16px" }}>Rätsel #{day} · dailyz.de</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
