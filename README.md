# 🏢 ROImob — Standalone Real Estate Calculators Suite

<div align="center">

[![React](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![Romanian Fiscal Code](https://img.shields.io/badge/Fiscal%20Code-2024--2026-emerald?style=for-the-badge)](https://static.anaf.ro)

</div>

---

## 📌 Standalone Calculator Architecture

This branch (`standalone-calculators`) provides a zero-dependency, lightning-fast financial decision platform for Romanian real estate investors and homeowners.

```
                           ┌─────────────────────────────────────────────────────────┐
                           │          ROImob Standalone Calculators Suite            │
                           └────────────────────────────┬────────────────────────────┘
                                                        │
                         ┌──────────────────────────────┴──────────────────────────────┐
                         ▼                                                             ▼
              ┌─────────────────────────────────────┐                       ┌─────────────────────────────────────┐
              │             ENGINE 1                │                       │              ENGINE 2               │
              │         Owner Strategy:             │                       │      Romanian Real Estate ROI       │
              │     Sell vs. Rent Optimizer         │                       │           & Fiscal Engine           │
              └─────────────────────────────────────┘                       └─────────────────────────────────────┘
```

---

### ⚖️ ENGINE 1: Owner Strategy — Sell vs. Rent Optimizer
- **City Market Valuation Benchmarker**: Auto-estimates property market value and expected rent across Romanian cities (*Bucharest, Cluj-Napoca, Timișoara, Brașov, Iași, Constanța, Sibiu, Oradea, Ilfov*).
- **Romanian Real Estate Transfer Tax (Cod Fiscal Art. 111)**:
  - **1% Tax Rate** if owned > 3 years.
  - **3% Tax Rate** if owned ≤ 3 years.
- **Alternative Reinvestment Benchmarks**:
  - **0% Cash / Personal Use**
  - **3.5% Bank Term Deposits**
  - **6.8% Romanian Treasury Bonds (*Titluri Tezaur / Fidelis* - 100% Tax-Free)**
  - **8.5% Global Equities ETF (S&P 500 / MSCI World)**
  - **10.5% BET Index (Bucharest Stock Exchange)**
- **Romanian Rental Tax Regimes**:
  - 👤 **Persoană Fizică (Normă Forfetară)**: 10% tax on 80% net rental base (effective 8% rate) + CASS health tiers.
  - 📑 **Persoană Fizică (Sistem Real)**: 10% on gross rent minus actual itemized expenses and invoices.
  - 🏢 **Microîntreprindere SRL**: 1% turnover tax + 8% dividend tax.
  - ⚠️ **Informal / Unreported Simulation**: Models friction with explicit ANAF criminal law warnings (Legea 241/2005).
- **Short-Term (Airbnb) Arbitrage Option**.
- **Accelerated Mortgage Prepayment Simulator**: Calculates debt-free years and saved bank interest.
- **Inflation Adjustment**: Real purchasing power vs nominal euros across 1, 3, 5, 10, and 15-year horizons.
- **Sensitivity & Stress-Test Matrix**: Bear (0% apprec.), Base (3.5% apprec.), Bull (+6.0% apprec.).

---

### 💰 ENGINE 2: Romanian Real Estate ROI & Fiscal Engine
- **Leveraged Mortgage Structuring**: 15% (first home) vs 20% vs 25% (investment) down payments, IRCC + margin amortizations.
- **Exact 2024–2026 Fiscal Breakdown**:
  - 10% tax applied to the 80% net rental base (20% deductible flat expense).
  - CASS Health Insurance threshold tiers ($6 \times 3,700\text{ RON}$, $12 \times 3,700\text{ RON}$, $24 \times 3,700\text{ RON}$).
  - Local building property taxes & mandatory PAD insurance.
- **10-Year Cumulative Cash Flow & Equity Amortization Schedule**.
- **PDF / Printable Report Export**.

---

## 🌐 Multi-Language Support
Full native support for:
- 🇬🇧 English (`en`)
- 🇷🇴 Română (`ro`)
- 🇫🇷 Français (`fr`)
- 🇩🇪 Deutsch (`de`)
- 🇺🇦 Українська (`uk`)

---

## ⚡ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🌿 Branches Overview

- **`full-version`**: Full real estate intelligence suite including GIS risk map layers, live OLX/Imobiliare/Storia/HomeZZ scraping, Open-Meteo AQI feeds, and data.gov.ro CKAN registries.
- **`standalone-calculators`**: Pure standalone calculator suite with 0 external dependencies, lightning load time, and pure mathematical models.
