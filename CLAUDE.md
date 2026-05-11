# Dailyz – Technische Dokumentation

Deutsche Gaming-Plattform mit täglichen Rätseln (ähnlich NYT Games).

## Stack

- **Framework**: Next.js 16 (App Router)
- **Sprache**: TypeScript
- **Styling**: Tailwind CSS v4 + CSS-Variablen (kein tailwind.config.js)
- **Datenbank**: SQLite via Prisma v5 (Produktion: Supabase PostgreSQL)
- **Auth**: NextAuth.js v5 beta (Google OAuth + Resend Magic Link)
- **Payments**: Stripe (1,99€/Monat Abo)
- **Icons**: lucide-react
- **Dark Mode**: next-themes

## Routen

| Route | Beschreibung |
|-------|-------------|
| `/` | Homepage mit Spielkarten-Grid |
| `/wortle` | Wörtle (Wordle-Klon) |
| `/verbindungen` | Connections-Klon (Premium) |
| `/zahlenraetsel` | Nerdle-Klon (Premium) |
| `/kreuzwort` | Mini-Kreuzwort 5×5 (Premium) |
| `/wortketten` | Word-Ladder-Spiel (Premium) |
| `/flagge` | Tägliches Flaggen-Quiz |
| `/anmelden` | Login (Google + Email) |
| `/profil` | Nutzerprofil + Statistiken (Auth required) |
| `/preise` | Pricing-Seite |
| `/archiv` | Vergangene Rätsel (Premium) |
| `/api/auth/[...nextauth]` | NextAuth Handlers |
| `/api/stripe/checkout` | Stripe Checkout Session erstellen |
| `/api/stripe/webhook` | Stripe Webhook (Abo-Status) |
| `/api/game-stats` | Spielstatistiken GET/POST |

## Lokale Entwicklung

```bash
cp .env.example .env.local   # Env-Vars eintragen
npx prisma migrate dev       # DB-Migration ausführen
npx prisma generate          # Prisma Client generieren
npm run dev                  # Dev-Server starten
```

## Benötigte Umgebungsvariablen

```
DATABASE_URL="file:./prisma/dev.db"
AUTH_SECRET="..."                    # openssl rand -base64 32
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
RESEND_API_KEY="..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PRICE_ID="price_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

## Design-System

- **Akzentfarben**: Schwarz (`#000`), Rot (`#DD0000`), Gold (`#FFCE00`)
- **CSS-Variablen**: `--background`, `--foreground`, `--card`, `--card-border`, `--muted`
- **Dark Mode**: `.dark` Klasse auf `<html>`, via next-themes
- **Font**: Geist (`--font-geist-sans`)
- **Responsive**: Mobile-first, `sm` (640px), `lg` (1024px)

## Datenbank-Schema

- `User` – mit `isPremium`, `stripeCustomerId`, `stripeSubscriptionId`
- `Account` / `Session` / `VerificationToken` – NextAuth Standard
- `GameStat` – Ergebnis pro Nutzer/Spiel/Datum (`@@unique([userId, game, date])`)

## Premium-Gating

- **Gratis**: Wörtle + Flagge
- **Premium**: alle anderen Spiele + Archiv (1,99€/Monat)
- Stripe Webhook aktualisiert `user.isPremium` automatisch bei Abo-Änderungen

## Tägliche Rätsel (Epoch: 2025-01-01)

```ts
const day = Math.floor((Date.now() - new Date("2025-01-01").getTime()) / 86400000)
const puzzle = PUZZLES[day % PUZZLES.length]
```

## Stripe-Setup (Produktion)

1. Produkt anlegen: "Dailyz Premium" — 1,99€/Monat
2. `STRIPE_PRICE_ID` = Price-ID
3. Webhook → `https://domain.de/api/stripe/webhook`
4. Events: `checkout.session.completed`, `customer.subscription.deleted`, `customer.subscription.updated`
