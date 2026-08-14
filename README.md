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

## 📌 Overview

**ROImob** is an open-data-driven real estate intelligence and financial evaluation platform tailored for **small property investors**, **home buyers**, and **property owners** navigating the real estate market in Romania.

By unifying verified government registries (**data.gov.ro**, **ANCPI**, **INSSE**, **AMCCRS**, **Apele Române**, **RNMCA**) with marketplace feeds (**OLX.ro**, **Imobiliare.ro**, **Storia.ro**), ROImob provides institutional-grade risk diagnostics, link analysis, and decision simulations before buying, selling, or leasing properties.

---

## 🌟 Key Features

### 1. 🔍 OLX & Imobiliare.ro Listing Analyzer
- Paste any link from **OLX.ro**, **Imobiliare.ro**, or **Storia.ro**.
- Extracts property parameters (asking price, price/m², year built, address, rooms, photos).
- Automatically cross-references with official government datasets:
  - **AMCCRS Seismic Risk List**: Detects whether the building is in Class RsI, RsII, RsIII, or unexpertized pre-1977.
  - **Apele Române Flood Hazards**: Checks HQ10/HQ100 river basin flood zones.
  - **RNMCA Air Quality**: Pulls live fine particulate (PM2.5 / PM10) readings.
  - **Ministry of Education**: Evaluates local school catchment exam averages (*Evaluarea Națională*).
  - **ANCPI Price Benchmarking**: Compares the asking price against registered local transaction averages.

### 2. ⚖️ Owner Decision Engine: Sell vs. Rent Optimizer
- Designed for property owners who currently own a house or apartment (with or without an active bank mortgage).
- Compares 3 strategic scenarios side-by-side:
  1. **Option 1: SELL NOW**:
     - Calculates net liquid cash in hand after Romanian real estate transfer tax (Art. 111 Cod Fiscal: **1% if owned >3 years**, **3% if owned ≤3 years**), notary fees, and early bank mortgage payoff.
     - Simulates 5-year and 10-year wealth if proceeds are reinvested in safe fixed-income assets (e.g. Romanian State Treasury Bonds *Titluri de Stat Tezaur/Fidelis* at ~6.5-7.0% tax-free) or index funds.
  2. **Option 2: RENT LONG-TERM**:
     - Calculates net monthly cash-flow after bank mortgage installment, 10% rental tax (on 80% net base), CASS health tax, local property tax, and PAD insurance.
     - Projects 5-year and 10-year cumulative wealth combining rental income, tenant-funded mortgage debt pay-down, and property appreciation (~3.5% p.a.).
  3. **Option 3: RENT SHORT-TERM (AIRBNB / BOOKING)**:
     - Calculates net tourist rental returns after OTA commissions, cleaning, and seasonal occupancy.
- **Algorithmic Verdict**: Recommends the optimal strategy with break-even horizon calculations and wealth difference metrics.

### 3. 🌍 5-Language Internationalization (i18n)
- **Primary Language**: 🇬🇧 **English (`en`)**
- **Alternative Languages**:
  - 🇷🇴 **Română (`ro`)**
  - 🇫🇷 **Français (`fr`)**
  - 🇩🇪 **Deutsch (`de`)**
  - 🇺🇦 **Українська (`uk`)**
- Instant language switching with localized legal and fiscal terms (*Carte Funciară*, *IRCC*, *CASS*, *Titluri Tezaur*, *Clasă Risc Seismic*).

### 4. 🗺️ Multi-Layer GIS Intelligence Map
- **Seismic Vulnerability Overlay**: Visual red/amber pins for expertized buildings classified under **RsI** (Red Bullet), **RsII**, **RsIII**, **RsIV**, Urgency Categories **U1–U3**, and unexpertized pre-1977 alerts.
- **Flood Hazard Zones**: EU Directive 2007/60/EC flood hazard designations (HQ10, HQ100, HQ1000 return periods).
- **Educational Excellence**: Public and private schools with 3-year average pass grades for *Evaluarea Națională* and national rankings.
- **Healthcare & Emergency Access**: Hospitals with 24/7 Urgent Care Units (UPU).
- **Live Air Quality Sensors**: PM2.5, PM10, $\text{NO}_2$, and AQI index from RNMCA stations.
- **15-Minute City Radius**: Visual walk-time radius per selected property.

### 5. 💰 Romanian Real Estate Fiscal & ROI Engine (2024–2026 Code)
- **10% Flat Rental Income Tax**: Calculated on the **80% net rental base** after applying the mandatory 20% deductible flat expense (effective 8% rate).
- **CASS Health Insurance Brackets**: Automatic calculation for annual thresholds (6, 12, or 24 gross minimum national wages).
- **Leveraged Mortgage Simulator**: Variable IRCC + bank spread or fixed interest rates, 15% vs 25% down payments, debt service amortization.
- **Metrics**: Gross Yield, Net Yield (Cap Rate), Cash-on-Cash Return (CoC), Monthly Net Cash Flow, and 10-Year Total ROI Forecasting.

---

## 🏛️ Integrated Public & Marketplace Data Sources

| Source Entity | Category / Dataset | Cadence | Standard / Endpoint |
| :--- | :--- | :--- | :--- |
| **OLX.ro** | Active Property Listings & Private Offers | Hourly | HTML / Scraped API |
| **Imobiliare.ro** | Indicele Imobiliare.ro & Agency Portfolios | Daily | JSON / REST |
| **data.gov.ro / Min. Educației** | Rețeaua Unităților de Învățământ | Annually | CKAN REST API (`/api/3/action/`) |
| **ANCPI** | Tranzacții Imobiliare Lunare & Ipoteci | Monthly | CSV / WMS e-Terra |
| **ANCPI Geoportal** | Cadastral Parcels & UAT Boundaries | Monthly | INSPIRE WFS / GeoJSON |
| **AMCCRS & PMB** | Lista Imobilelor Expertizate Tehnic | Monthly | JSON / Official Register |
| **INSSE (TEMPO Online)** | Autorizații de Construire (`LOC101A`) | Quarterly | SDMX / XML Matrix |
| **INSSE (TEMPO Online)** | Dinamica Populației & Salarii (`FOM107D`) | Monthly | SDMX / XML Matrix |
| **Apele Române** | Hărți de Hazard și Risc la Inundații | Static/Gov | WFS / Directiva 2007/60/CE |
| **RNMCA / CalitateaAerului.ro** | Rețeaua Națională Calitatea Aerului | Hourly | Live Sensor JSON Stream |
| **Institutul Național al Patrimoniului** | Lista Monumentelor Istorice (LMI) | Annually | CSV / Legea 422/2001 |

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

ROImob includes a pre-configured `vercel.json` for single-page routing on Vercel.

1. Open [vercel.com/new](https://vercel.com/new).
2. Select your repository: **`ProfBandarra/ROImob`**.
3. Framework Preset: **Vite**.
4. Click **Deploy**.

---

## 📜 License

Distributed under the **MIT License**.
