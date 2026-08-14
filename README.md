# 🏢 ROImob — Romanian Real Estate Financial & Tax Intelligence

<div align="center">

[![React](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![Romanian Fiscal Code](https://img.shields.io/badge/Fiscal%20Code-2024--2026-emerald?style=for-the-badge)](https://static.anaf.ro)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Themes](https://img.shields.io/badge/Themes-4%20Modes%20(incl.%20AAA)-purple?style=for-the-badge)](#-multi-theme-system)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)

**An open-source, institutional-grade decision intelligence and tax optimization suite for Romanian real estate owners, buyers, and investors.**

[Overview & Manifesto](#-project-overview) • [Engine 1: Sell vs. Rent](#-engine-1-owner-strategy--sell-vs-rent-optimizer) • [Engine 2: ROI & Taxes](#-engine-2-romanian-real-estate-roi--fiscal-engine) • [Themes](#-multi-theme-system) • [Legal Basis](#-statutory-romanian-legal-basis) • [Localization & Reports](#-6-language-localization--translated-audit-reports) • [Deployment](#-deployment-to-vercel)

</div>

---

## 📌 Project Overview

**ROImob** is an open-source, non-commercial financial modeling platform designed to bring institutional transparency, mathematical precision, and strict fiscal compliance to the Romanian residential real estate market.

Unlike commercial portals or simplified rule-of-thumb estimators, ROImob models real-world transaction friction and taxation under **Romanian Law nr. 227/2015 (Codul Fiscal), Emergency Ordinance OUG nr. 115/2023, Emergency Ordinance OUG nr. 52/2016, and Law nr. 241/2005**.

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

## 🎨 Multi-Theme System

ROImob includes 4 custom-crafted visual themes with responsive tokens and accessibility standards:
- 🌙 **Midnight Dark** (Default): High-end institutional navy slate with indigo accents.
- ☀️ **Corporate Light**: Crisp daylight executive theme with high legibility.
- 🌲 **Emerald Wealth**: Deep forest and golden accents for financial wealth planning.
- 👁️ **High Contrast (AAA)**: WCAG AAA compliant accessibility mode with high-vis yellow focus rings, maximum contrast ratios, and bold typography.

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

---

## 🏛️ Statutory Romanian Legal Basis

The calculations in ROImob directly reflect Romanian statutory legislation and official benchmark indices:

1. **Codul Fiscal al României (Legea nr. 227/2015)**: Art. 111 (transfer tax) & Art. 120 (rental income tax).
2. **Ordonanța de Urgență OUG nr. 115/2023**: 20% deductible flat expense quota and CASS health insurance tier brackets.
3. **Banca Națională a României (BNR) — Indicele IRCC**: Statutory consumer mortgage variable benchmark.
4. **Ministerul Finanțelor — Titluri de Stat Tezaur & Fidelis**: Sovereign bond reinvestment yields (100% tax-free).
5. **Legea nr. 241/2005**: Criminal compliance framework regarding tax evasion and reporting mandates.
6. **Directiva Europeană OUG nr. 52/2016**: Mortgage early prepayment penalty statutory caps (max 1% fixed, 0% variable).

---

## 🌐 6-Language Localization & Translated Audit Reports

The entire web application and the formal printable PDF audit dossiers render 100% in the selected language:
- 🇬🇧 **English** (`en`)
- 🇷🇴 **Română** (`ro`)
- 🇫🇷 **Français** (`fr`)
- 🇩🇪 **Deutsch** (`de`)
- 🇺🇦 **Українська** (`uk`)
- 🇵🇹 **Português (PT)** (`pt`)

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

## 📜 License & Disclaimers

Distributed under the **MIT License**. Free and open-source for educational and individual research use.

> **Note**: The development of this platform was assisted by AI. While calculations have been audited against the Romanian Fiscal Code, users should consult a certified notary or tax advisor for definitive operations.
