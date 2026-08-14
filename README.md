# 🏢 ROImob — Romanian Real Estate Financial & Tax Intelligence

<div align="center">

[![React](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![Romanian Fiscal Code](https://img.shields.io/badge/Fiscal%20Code-2024--2026-emerald?style=for-the-badge)](https://static.anaf.ro)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)

**An institutional-grade decision and tax optimization suite for Romanian real estate owners, buyers, and investors.**

[Explore Engine 1: Sell vs. Rent](#-engine-1-owner-strategy--sell-vs-rent-optimizer) • [Explore Engine 2: ROI & Taxes](#-engine-2-romanian-real-estate-roi--fiscal-engine) • [Deployment](#-deployment-to-vercel)

</div>

---

## 📌 Executive Overview

**ROImob** delivers mathematical modeling and compliance-backed financial projections tailored specifically to the Romanian real estate market, fully up-to-date with **Romanian Fiscal Code Law 227/2015, Emergency Ordinance OUG 115/2023, and Emergency Ordinance OUG 52/2016**.

The application features two interconnected, zero-dependency calculation engines:

```
                           ┌─────────────────────────────────────────────────────────┐
                           │            ROImob Decision Intelligence Hub             │
                           └────────────────────────────┬────────────────────────────┘
                                                        │
                         ┌──────────────────────────────┴──────────────────────────────┐
                         ▼                                                             ▼
              ┌─────────────────────────────────────┐                       ┌─────────────────────────────────────┐
              │              ENGINE 1               │                       │              ENGINE 2               │
              │         Owner Strategy:             │                       │      Romanian Real Estate ROI       │
              │     Sell vs. Rent Optimizer         │                       │           & Fiscal Engine           │
              └─────────────────────────────────────┘                       └─────────────────────────────────────┘
```

---

## ⚖️ ENGINE 1: Owner Strategy — Sell vs. Rent Optimizer

Designed for residential property owners with or without an active bank mortgage evaluating strategic exit vs. retention options:

### 1. Market Valuation & Auto-Benchmarking
- **Integrated City Estimator**: Auto-estimates market property valuation and expected monthly rent across Romanian urban centers (*Bucharest, Cluj-Napoca, Timișoara, Brașov, Iași, Constanța, Sibiu, Oradea, Ilfov*).
- Adjusts automatically for neighborhood zone location (*Ultra-Central +30%, Central +10%, Standard Urban Base, Suburban -15%*) and property condition (*Luxury/Renovated +15%, Standard, Needs Renovation -15%*).

### 2. Strategy 1: SELL NOW
- **Transfer Tax Calculation (Cod Fiscal Art. 111)**:
  - **1% Flat Tax Rate** for properties owned > 3 years.
  - **3% Flat Tax Rate** for properties owned ≤ 3 years.
- **Transaction Friction**: Notary fees, agency commissions, selling preparation costs, and early bank mortgage prepayment payoff (with statutory caps under *OUG 52/2016*).
- **Alternative Reinvestment Benchmarks**:
  - **0% Cash / Personal Use**: Nominal liquidity preservation in bank accounts.
  - **3.5% Bank Term Deposits**: Guaranteed commercial bank savings.
  - **6.8% Romanian State Treasury Bonds (*Titluri Tezaur / Fidelis*)**: 100% Tax-Free sovereign bonds issued by the Ministry of Finance.
  - **8.5% Global Equities ETF**: Diversified global equities index fund (*S&P 500 / MSCI World*).
  - **10.5% BET Index (*Bursa de Valori București*)**: Romania's blue-chip index with reinvested dividends.

### 3. Strategy 2: RENT LONG-TERM
- **Romanian Rental Tax Regime Optimization**:
  - 👤 **Persoană Fizică (Normă Forfetară)**: 10% tax applied to the 80% net rental base (mandatory 20% flat expense deduction = effective 8% tax rate) plus CASS health insurance tier brackets.
  - 📑 **Persoană Fizică (Sistem Real)**: 10% tax on gross rent minus actual itemized deductible expenses and repair invoices.
  - 🏢 **Microîntreprindere SRL**: 1% turnover tax + 8% dividend tax on company profits.
  - ⚠️ **Informal / Unreported Simulation**: Models friction with explicit Romanian Criminal Law (*Legea nr. 241/2005 privind prevenirea și combaterea evaziunii fiscale*) warnings and ANAF penalty surcharge estimations.
- **Tenant Debt Paydown**: Models tenant rent servicing mortgage principal over time.
- **Accelerated Mortgage Prepayment Simulator**: Reinvests positive rental cash flow directly into principal reduction, computing the exact year the property becomes **100% debt-free** and total bank interest saved.

### 4. Strategy 3: SHORT-TERM (AIRBNB)
- Evaluates tourist nightly rates, seasonality, and occupancy rates vs long-term residential leases.

### 5. Sensitivity, Inflation & Multi-Year Amortization
- 📉 **Inflation Adjustment**: Toggle between nominal euro values and real purchasing power across 1, 3, 5, 10, and 15-year horizons.
- 🐻 ⚖️ 🐂 **Sensitivity Matrix**: Compares outcomes under **Bear** (*0% appreciation, 2 months vacancy*), **Base** (*3.5% appreciation*), and **Bull** (*+6.0% appreciation*) market scenarios.
- 📅 **15-Year Cumulative Wealth Schedule**: Complete year-by-year comparison table.

---

## 💰 ENGINE 2: Romanian Real Estate ROI & Fiscal Engine

An institutional underwriting calculator for buy-to-let acquisitions:

### 1. Capital Structuring & Financing
- **Flexible Down Payment Presets**: 15% (*Primary Home Statutory Minimum*), 20%, or 25% (*Investment Second Property Standard*).
- **Mortgage Amortization**: Fixed or variable interest rate (*IRCC benchmark + bank margin*) with customizable loan term (*5 to 30 years*).
- **Initial Outlay**: Purchase price, notary/legal acquisition fees (~1.8%), and furnishing/renovation budget.

### 2. Operational Economics & Key Metrics
- **Gross Yield**: Total annual rent relative to purchase price.
- **Net Yield**: Net Operating Income (NOI) after operational expenses, insurance, and taxes relative to total acquisition cost.
- **Cash-on-Cash Return (CoC)**: Annual net cash flow after debt service relative to actual out-of-pocket cash invested.
- **Monthly Net Cash Flow**: Net cash in pocket after mortgage payments and statutory taxes.

### 3. Exact Romanian 2024–2026 Fiscal Framework
- **10% Flat Income Tax**: Applied to the 80% net rental base after the mandatory 20% deductible flat expense.
- **CASS Health Insurance Tiers**:
  - Net rental base $< 6$ gross minimum national wages: **0 RON**
  - Net rental base $6 - 12$ gross minimum wages: **2,220 RON / year** ($6 \times 3,700\text{ RON} \times 10\%$)
  - Net rental base $12 - 24$ gross minimum wages: **4,440 RON / year** ($12 \times 3,700\text{ RON} \times 10\%$)
  - Net rental base $> 24$ gross minimum wages: **8,880 RON / year** (capped at 24)
- **Local Municipal Building Tax**: 0.1% residential quota.
- **Mandatory PAD Insurance & Facultative Property Insurance**.

### 4. 10-Year Cumulative Cash Flow & Equity Schedule
- Year-by-year schedule tracking property appreciation (3.5% p.a.), rent growth (2.5% p.a.), annual cash flow, cumulative cash, and total net equity.
- **PDF & Printable Audit Export**: One-click generation of formatted financial reports for banking applications or personal records.

---

## 🌐 5-Language Localization

Native multi-language interface:
- 🇬🇧 **English** (`en`)
- 🇷🇴 **Română** (`ro`)
- 🇫🇷 **Français** (`fr`)
- 🇩🇪 **Deutsch** (`de`)
- 🇺🇦 **Українська** (`uk`)

---

## ⚡ Quick Start

```bash
# Clone the repository
git clone https://github.com/ProfBandarra/ROImob.git

# Navigate into project directory
cd ROImob

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be accessible locally at `http://localhost:3000`.

---

## 🚀 Deployment to Vercel

ROImob is pre-configured for instant zero-configuration deployment on **Vercel**:

1. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
2. Select your repository: **`ProfBandarra/ROImob`**.
3. Framework Preset: **Vite**.
4. Click **Deploy**.

---

## 📜 License

Distributed under the **MIT License**.
