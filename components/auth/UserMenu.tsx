"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { User, LogOut, BarChart2, Archive } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function UserMenu() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  if (status === "loading") return <div className="w-8 h-8 rounded-full bg-[var(--card)] animate-pulse" />;

  if (!session) {
    return (
      <Link
        href="/anmelden"
        className="px-4 py-1.5 rounded-full bg-[var(--foreground)] text-[var(--background)] text-xs font-bold hover:opacity-90 transition-opacity"
      >
        Anmelden
      </Link>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full p-0.5 hover:bg-[var(--card)] transition-colors"
      >
        {session.user?.image ? (
          <Image src={session.user.image} alt="Avatar" width={32} height={32} className="rounded-full" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-[var(--card)] border border-[var(--card-border)] flex items-center justify-center">
            <User size={16} />
          </div>
        )}
        {(session.user as { isPremium?: boolean })?.isPremium && (
          <span className="text-[10px] font-black text-[#FFCE00]">PRO</span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-[var(--card-border)] bg-[var(--background)] shadow-lg z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-[var(--card-border)]">
            <p className="text-sm font-bold truncate">{session.user?.name ?? "Spieler"}</p>
            <p className="text-xs text-[var(--muted)] truncate">{session.user?.email}</p>
          </div>
          <div className="py-1">
            <Link
              href="/profil"
              onClick={() => setOpen(false)}
              className={cn("flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-[var(--card)] transition-colors")}
            >
              <BarChart2 size={15} className="text-[var(--muted)]" /> Profil & Statistiken
            </Link>
            <Link
              href="/archiv"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-[var(--card)] transition-colors"
            >
              <Archive size={15} className="text-[var(--muted)]" /> Archiv
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-[var(--card)] transition-colors text-left"
            >
              <LogOut size={15} className="text-[var(--muted)]" /> Abmelden
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
