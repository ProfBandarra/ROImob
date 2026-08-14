# 🏢 ROImob — Real Estate & Urban Intelligence Platform

<p align="center">
  <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80" alt="ROImob Platform" width="100%" style="border-radius: 1rem;" />
</p>

<div align="center">

[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![React](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![Leaflet](https://img.shields.io/badge/Leaflet-GIS-199900?style=for-the-badge&logo=leaflet)](https://leafletjs.com)
[![data.gov.ro](https://img.shields.io/badge/data.gov.ro-CKAN%20API-0052cc?style=for-the-badge)](https://data.gov.ro)

</div>

---

## 📌 The 3 Core Pillars of ROImob

**ROImob** is an open-data-driven real estate intelligence and financial evaluation platform built for **property buyers**, **investors**, and **homeowners** in Romania.

The platform is anchored on 3 primary decision engines:

```
                                  ┌──────────────────────────────────────────────┐
                                  │             ROImob Decision Hub              │
                                  └──────────────────────┬───────────────────────┘
                                                         │
               ┌─────────────────────────────────────────┼────────────────────────────────────────┐
               ▼                                         ▼                                        ▼
    ┌──────────────────────┐                  ┌──────────────────────┐                 ┌──────────────────────┐
    │       PILLAR 1       │                  │       PILLAR 2       │                 │       PILLAR 3       │
    │   Listing Analyzer   │                  │  Sell vs. Rent Calc  │                 │  ROI & Fiscal Engine │
    │    & Legal Audit     │                  │   Owner Optimizer    │                 │   (2024-2026 Code)   │
    └──────────────────────┘                  └──────────────────────┘                 └──────────────────────┘
```

---

### 🔍 PILLAR 1: Real-Time Listing Analyzer & Due Diligence
- **Multi-Portal Support**: Paste live URLs from **OLX.ro**, **Imobiliare.ro**, **Storia.ro**, and **HomeZZ.ro**.
- **Manual Input Bypass**: For offline announcements or unlisted portals, users can directly enter parameters.
- **Partial Extraction Auditing**: Explicitly flags any missing parameters (*Year Built*, *Floor*, *Cadastral #*) and shows conservative defaults while providing an instant 1-click in-place editor.
- **Automated Official Data Cross-Check**:
  - 🔴 **AMCCRS Seismic Risk Register**: Checks technical expertise classes (**RsI**, **RsII**, **RsIII**, **RsIV**, **U1–U3**, or pre-1977 alerts).
  - 💧 **Apele Române Flood Hazards**: Evaluates EU Directive 2007/60 HQ10/HQ100 river catchment zones.
  - 🍃 **RNMCA / Open-Meteo Air Quality**: Real-time fine particulate (PM2.5 / PM10) sensor streams.
  - 🎓 **Ministry of Education**: 3-year *Evaluarea Națională* school catchment pass rates.
  - 📊 **ANCPI & INSSE Wage Growth**: Verifies price/m² vs local transaction velocity.

---

### ⚖️ PILLAR 2: Sell vs. Rent Owner Strategy Optimizer
Designed for owners with or without an active bank mortgage comparing exit vs. holding strategies:

- **🏛️ ANCPI & INSSE Auto-Valuation Estimator**: Auto-estimates market value and expected rent for all major Romanian cities (*Bucharest, Cluj-Napoca, Timișoara, Brașov, Iași, Constanța, Sibiu, Oradea, Ilfov*).
- **Option 1: SELL NOW**:
  - Models Romanian Real Estate Transfer Tax (**Cod Fiscal Art. 111**: **1% if owned >3 years**, **3% if owned ≤3 years**), notary fees, and early bank loan payoff.
  - Compares compound wealth if proceeds are reinvested in **0.0% Cash**, **3.5% Bank Deposits**, **6.8% Romanian State Treasury Bonds (*Titluri Tezaur/Fidelis* - 100% Tax Free)**, **8.5% Global ETFs**, or **10.5% BET Index**.
- **Option 2: RENT LONG-TERM**:
  - Calculates net monthly cash flow under the 2024–2026 Fiscal Code and projects cumulative wealth combining rental income, tenant-funded debt paydown, and property appreciation.
- **Option 3: SHORT-TERM (AIRBNB)**:
  - Toggle tourist rental yields vs standard residential leasing.
- **Advanced Owner Controls**:
  - 📉 **Inflation Adjustment**: View nominal euro values or real purchasing power.
  - ⚡ **Accelerated Prepayment Simulator**: Direct surplus rent to pay down mortgage principal early.
  - 🧾 **Tax Regime Optimizer**: Compares **PF Forfetar (8% effective)** vs **PF Sistem Real** vs **SRL Microîntreprindere (1% + 8% div)**.
  - 🐻 ⚖️ 🐂 **Stress-Test Matrix**: Bear (0% apprec.), Base (3.5% apprec.), Bull (+6.0% apprec.).

---

### 💰 PILLAR 3: Romanian Real Estate ROI & Fiscal Engine (2024–2026 Code)
- **10% Flat Rental Income Tax**: Calculated on the **80% net rental base** after applying the mandatory 20% deductible flat expense (effective 8% rate).
- **CASS Health Insurance Brackets**: 6, 12, and 24 gross minimum national wages ($6 \times 3,700\text{ RON}$, $12 \times 3,700\text{ RON}$, $24 \times 3,700\text{ RON}$).
- **Leveraged Mortgage Simulator**: 15% (first home) vs 25% (investment) down payments, IRCC + bank spread, and amortization schedules.
- **10-Year Total ROI & Cash Flow Forecast**: Detailed year-by-year cash-on-cash and capital growth projections.

---

## ⚡ Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/ProfBandarra/ROImob.git

# Navigate into project directory
cd ROImob

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Deployment to Vercel

ROImob includes a pre-configured `vercel.json` and serverless scraper function (`api/analyze-listing.ts`):

1. Open [vercel.com/new](https://vercel.com/new).
2. Select your repository: **`ProfBandarra/ROImob`**.
3. Framework Preset: **Vite**.
4. Click **Deploy**.

---

## 📜 License

Distributed under the **MIT License**.
