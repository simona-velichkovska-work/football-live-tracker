
# ⚽ Football Live Tracker

A Next.js application for viewing today’s football fixtures, live scores, and match details using the API-Football service.

Built with:
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- API-Football

---

## 🚀 Getting Started

Follow these steps to run the project locally.

---

## 📥 1. Clone the Repository

```bash
git clone https://github.com/simona-velichkovska-work/football-live-tracker.git
cd football-live-tracker
```

---

## 📦 2. Install Dependencies

Make sure you have **Node.js (v18 or higher)** installed.

Then run:

```bash
npm install
```

or

```bash
yarn install
```

or

```bash
pnpm install
```

---

## 🔑 3. Get an API Key (API-Football)

This project uses the **API-Football** service.

### Step 1: Create an Account

Visit:

[https://www.api-football.com/](https://www.api-football.com/)

Sign up for a free account.

---

### Step 2: Get Your API Key

After logging in:

1. Go to your Dashboard
2. Open **My Subscriptions / API Keys**
3. Copy your API key

---

## 📝 4. Create `.env.local`

In the root folder of the project, create a file named:

```
.env.local
```

Inside it, add:

```env
FOOTBALL_API_KEY=your_api_key_here
```

Example:

```env
FOOTBALL_API_KEY=123456789abcdef
```

⚠️ Important:
Do NOT commit this file to GitHub. It contains your private API key.

---

## ▶️ 5. Run the Development Server

Start the app with:

```bash
npm run dev
```

Then open in your browser:

[http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure (Overview)

```txt
app/                → Application routes (Home, Live, Match, League, Fixtures)
components/         → Reusable UI components
hooks/              → Custom React hooks
lib/                → API logic and utilities
styles/             → Global styles
public/             → Static assets
```

---

## ✨ Features

* Today’s matches (server-side rendered)
* Live scores with auto-refresh
* Pause / resume live updates
* League, status, and team filtering
* Match details pages
* Error and empty state handling
* Responsive design

---

## 🧪 API Rate Limits

API-Football free plans have strict rate limits. (100 reqs)

If you experience issues:

* Use the pause/resume option on the Live page
* Avoid frequent manual refreshes
* Limit multiple open tabs

For development, consider using mock data if needed.

---

## 🏗️ Production Build (Optional)

To build and run the project in production mode:

```bash
npm run build
npm run start
```

---

## 🌐 Deployment

This project can be deployed easily on Vercel.

Steps:

1. Push the repository to GitHub
2. Import the project into Vercel
3. Add FOOTBALL_API_KEY as an Environment Variable
4. Deploy

Deployment docs:
[https://nextjs.org/docs/app/building-your-application/deploying](https://nextjs.org/docs/app/building-your-application/deploying)

---

## ⚙️ Technical Notes

* Uses Next.js App Router
* Implements ISR (Incremental Static Regeneration)
* Live data is handled with client-side polling
* Environment variables are used for API security

---

## 📚 Learn More

* Next.js Documentation: [https://nextjs.org/docs](https://nextjs.org/docs)
* API-Football: [https://www.api-football.com/](https://www.api-football.com/)

---

## 👤 Author

Developed by Simona Velichkovska
