# 🔗 Coast — Monetize Your Time on Twitter with Solana

**Coast** is a web app that allows Twitter influencers to monetize their time by offering paid, Solana-powered Zoom meetings. Fans can book time slots using SOL, and influencers manage everything via a simple dashboard.

---

## ✨ Features

- 🌐 **Shareable Links** – Create beautiful, time-based meeting links for Twitter.
- 🔐 **Secure Login** – Sign in with Google using NextAuth.js.
- 📆 **Custom Sessions** – Select 3 available time slots and set your rate in SOL.
- 💰 **Solana-Powered Payments** – Accept Devnet SOL payments for session bookings.
- 🧾 **Dashboard** – View and manage all current and past sessions.

---

## 🧭 How It Works

1. Log in via Google.
2. Access your dashboard to create/view coast sessions.
3. Enter session details: name, email, wallet, image, time slots, and price.
4. Generate a shareable meet link.
5. Fans click the link, view slots, and book by paying in SOL.
6. Booking is confirmed on-chain via Solana Devnet.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) ≥ 18
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)
- [MongoDB Compass](https://www.mongodb.com/products/compass)
- [Solana CLI](https://docs.solana.com/cli/install-solana-cli)
- [Phantom Wallet](https://phantom.app/) (browser extension)
- Google OAuth credentials for NextAuth

---

### Installation

```bash
git clone https://github.com/yourusername/coast.git
cd coast
npm install
