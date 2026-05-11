import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ ok: false });

  const { game, date, won, attempts } = await req.json();
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ ok: false });

  await prisma.gameStat.upsert({
    where: { userId_game_date: { userId: user.id, game, date } },
    create: { userId: user.id, game, date, won, attempts },
    update: { won, attempts },
  });
  return NextResponse.json({ ok: true });
}

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ stats: [] });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { gameStats: { orderBy: { createdAt: "desc" }, take: 100 } },
  });
  return NextResponse.json({ stats: user?.gameStats ?? [] });
}
