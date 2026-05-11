import { signIn } from "@/auth";
import { PlatformHeader } from "@/components/layout/PlatformHeader";

export default function AnmeldenPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PlatformHeader />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="flex justify-center gap-1 mb-4">
              <div className="w-6 h-6 rounded bg-black dark:bg-white" />
              <div className="w-6 h-6 rounded bg-[#DD0000]" />
              <div className="w-6 h-6 rounded bg-[#FFCE00]" />
            </div>
            <h1 className="text-2xl font-black mb-1">Anmelden</h1>
            <p className="text-sm text-[var(--muted)]">Dein tägliches Rätsel-Erlebnis</p>
          </div>

          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6 flex flex-col gap-4">
            <form
              action={async () => {
                "use server";
                await signIn("google", { redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-[var(--card-border)] bg-[var(--background)] font-medium text-sm hover:bg-[var(--card)] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Mit Google anmelden
              </button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--card-border)]" />
              </div>
              <div className="relative flex justify-center text-xs text-[var(--muted)]">
                <span className="bg-[var(--card)] px-2">oder per E-Mail</span>
              </div>
            </div>

            <form
              action={async (formData: FormData) => {
                "use server";
                await signIn("resend", { email: formData.get("email") as string, redirectTo: "/" });
              }}
              className="flex flex-col gap-3"
            >
              <input
                name="email"
                type="email"
                placeholder="deine@email.de"
                required
                className="px-4 py-3 rounded-xl border border-[var(--card-border)] bg-[var(--background)] text-sm focus:outline-none focus:border-[var(--foreground)] transition-colors"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[var(--foreground)] text-[var(--background)] font-bold text-sm hover:opacity-90 transition-opacity"
              >
                Magic Link senden
              </button>
            </form>
          </div>

          <p className="text-center text-xs text-[var(--muted)] mt-6">
            Mit der Anmeldung stimmst du unseren Nutzungsbedingungen zu.
          </p>
        </div>
      </main>
    </div>
  );
}
