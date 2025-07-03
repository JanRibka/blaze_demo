## Přehled projektu

Tento projekt je webová aplikace pro správu uživatelských událostí s uživatelskou autentizací.  
Implementace využívá moderní fullstack framework Next.js s TypeScriptem a databází PostgreSQL.

---

## Spuštění projektu

### 1. Klonování repozitáře

```bash
git clone https://github.com/JanRibka/blaze_demo
```

```bash

cd blaze_demo
```

### 2. Instalace závislostí

```bash
npm install
```

### 3. Nastavení proměnných prostředí

V `.env` souboru nastav následující proměnné:

- `DATABASE_URL` – připojovací řetězec k databázi PostgreSQL, který používá Prisma. Můžeš ho získat z poskytovatele databáze (např. Neon.tech).
- `AUTH_SECRET` – tajný klíč pro autentizaci používaný Auth.js (NextAuth). Generuj bezpečný řetězec, například příkazem:

```bash
npx auth secret
```

> ℹ️ **Poznámka:**  
> Příkaz `npx auth secret` vygeneruje `AUTH_SECRET` a automaticky ho zapíše do souboru `.env.local`.  
> Pokud aplikace používá pouze `.env`, je potřeba tento řádek ručně zkopírovat do `.env` souboru:

### 4. Migrace databáze

```bash
npm run prisma:migrate_prod
```

### 5. Spuštění aplikace

```bash
npm run dev
```

## Odůvodnění klíčových voleb

- **Next.js**  
  Umožňuje jednoduše kombinovat frontend i backend v jednom projektu, což výrazně usnadňuje vývoj, správu i nasazení aplikace.

- **Neon (PostgreSQL hosting)**  
  Moderní cloudová platforma pro PostgreSQL s podporou škálování, okamžitých preview databází a rozdělené architektury (compute/storage). Umožňuje snadné nastavení databáze, skvělou integraci s moderními vývojářskými nástroji a bezstarostný hosting zdarma pro menší projekty.

- **Prisma ORM**  
  Moderní ORM pro TypeScript/Node.js, který výrazně zjednodušuje práci s databází – podporuje automatickou generaci klienta, migrace a typovou bezpečnost.

- **NextAuth.js (Auth.js)**  
  Standardní a dobře integrovatelné řešení pro autentizaci v Next.js. Podporuje session-based přihlášení, bezpečně uložené v HTTP-only cookies.

- **Yup**  
  Flexibilní validační knihovna použitelná jak na frontend, tak backend, čímž zajišťuje jednotnou validaci vstupních dat.

- **Tailwind CSS**  
  Utility-first CSS framework, který umožňuje rychlé a efektivní vytváření moderního a responzivního UI bez potřeby psát vlastní CSS.

- **Vercel**  
  Hostingová platforma optimalizovaná pro Next.js, která poskytuje jednoduché CI/CD, škálování a snadné nasazení s podporou pro edge funkcionalitu.
